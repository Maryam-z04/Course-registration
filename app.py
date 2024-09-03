from flask import *
from database import *
import re
from flask_login import login_user, login_required, logout_user, current_user, LoginManager
import flask_admin
from flask_admin.contrib.sqla import ModelView
import sqlite3
from datetime import datetime
from admin_views import *
app = Flask(__name__)
DB_NAME = 'aus-planner.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + DB_NAME
app.config['SECRET_KEY'] = 'your-secret-key'


db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Custom Admin ModelView to restrict access
class AdminModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.is_admin

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('login'))



# Initialize Flask-Admin
admin = flask_admin.Admin(app, name='AUS-Planner', template_mode='bootstrap3')

# Add administrative views here
admin.add_view(UserView(User, db.session))
admin.add_view(TakesView(Takes, db.session))
admin.add_view(CompletedView(Completed, db.session))
admin.add_view(LogsView(Logs, db.session))

def get_student_or_admin():
    if current_user.is_student:
        # get based on name
        return Student.query.filter_by(user_id=current_user.id).first()
    elif current_user.is_admin:
        return Admin.query.get(current_user.id)
    else:
        return None

@app.route('/static/<string:filename>')
def static_file(filename):
    return send_from_directory('static', filename)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        # Check for aus.edu domain in email
        if not re.match(r".+@aus\.edu$", email):
            flash('Please use your AUS email address.')
            return redirect(url_for('signup'))

        # Determine if the user is a student based on the email format
        is_student = bool(re.match(r"(b|g)\d{8}@aus\.edu", email))

        # Check if user already exists
        if User.query.filter_by(email=email).first():
            flash('Email already registered.')
            return redirect(url_for('signup'))

        # check password >8 with at least 1 digit and one special
        if len(password) < 8 or not re.search(r"\d", password) or not re.search(r"[^a-zA-Z0-9]", password):
            flash('Password must be at least 8 characters long and contain at least one digit and one special character.')
            return redirect(url_for('signup'))

        # Create a new user
        new_user = User(email=email)
        new_user.password = password  # Set password hash
        new_user.role = 'student' if is_student else 'admin'  # Set the role based on the email pattern

        # create corresponding student or admin object
        if is_student:
            new_student = Student(name=email.split('@')[0], user_id=new_user.id)
            new_student.password = password
            new_student.major_name = 'CS'
            # new_user.student = new_student
            db.session.add(new_student)
        else:
            new_admin = Admin(name=email.split('@')[0], user_id=new_user.id)
            new_admin.password = password
            # new_user.admin = new_admin
            db.session.add(new_admin)

        db.session.add(new_user)
        db.session.commit()

        flash('Registration successful!')
        return redirect(url_for('login'))
    
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        if user is not None and user.verify_password(password):
            login_user(user)
            next = request.args.get('next')
            if next is None or not next.startswith('/'):
                next = url_for('index')
            return redirect(next)
        flash('Invalid username or password.')
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/student/dashboard', methods=['GET', 'POST'])
@login_required
def student_dashboard():
    if not current_user.is_student:
        return 'Access Denied', 403
    # courses = current_user.courses  # This assumes a relationship between User and Course models
    return render_template('user.html')

@app.route('/student/sections', methods=['POST'])
def get_sections():
    """
    CREATE TABLE Section (
        crn TEXT PRIMARY KEY,
        sec_num INTEGER NOT NULL,
        instructor TEXT,
        days TEXT,
        start_time TIME,
        finish_time TIME,
        course_code TEXT NOT NULL,
        course_name TEXT NOT NULL
    )
    """
    if not current_user.is_student:
        return 'Access Denied', 403
    # get the selected course code
    course_code = request.json['course_code']
    # get the sections from the sections.db using sqlite3
    
    conn = sqlite3.connect('sections.db')
    cursor = conn.cursor()
    query = '''
    SELECT crn, sec_num, instructor, days, start_time, finish_time, course_code, course_name
    FROM Section
    WHERE course_code = ?
    '''
    cursor.execute(query, (course_code,))
    sections = cursor.fetchall()
    conn.close()
    
    print(sections)
    sections = list(map(lambda x: { 'crn': x[0], 'sec_num': x[1], 'instructor': x[2], 'days': x[3], 'start_time': x[4], 'finish_time': x[5], 'course_code': x[6], 'course_name': x[7] }, sections))
    # return the sections
    return jsonify(sections)
 

@app.route('/student/register_course', methods=['POST'])
def register_course():
    if not current_user.is_student:
        return 'Access Denied', 403
    # get student from User
    student = get_student_or_admin()
    # add entry to Completed table
    course_code = request.json['course_code']
    # section_number = request.form['section_number']
    # check for duplicate
    if Completed.query.filter_by(student_id=student.user_id, course_code=course_code).first():
        return Response(status=409)
    new_entry = Completed(student_id=student.user_id, course_code=course_code)
    # log
    db.session.add(Logs(user_id=student.user_id, action=f'Registered {course_code}', timestamp=datetime.now()))
    db.session.add(new_entry)
    db.session.commit()
    # return success
    return Response(status=200)
 
@app.route('/student/drop_course', methods=['POST'])
def drop_course():
    if not current_user.is_student:
        return 'Access Denied', 403
    # get student from User
    student = get_student_or_admin()
    # add entry to Completed table
    course_code = request.json['course_code']
    # section_number = request.form['section_number']
    # check for duplicate
    entry = Completed.query.filter_by(student_id=student.user_id, course_code=course_code).first()
    if not entry:
        return Response(status=409)
    # log
    db.session.add(Logs(user_id=student.user_id, action=f'Dropped {course_code}', timestamp=datetime.now()))

    db.session.delete(entry)
    db.session.commit()
    # return success
    return Response(status=200)

@app.route('/student/registered_courses', methods=['GET'])
def student_courses():
    if not current_user.is_student:
        return 'Access Denied', 403
    # get student from User
    student = get_student_or_admin()
    # get courses from Completed
    courses = Completed.query.filter_by(student_id=student.user_id).all()
    # return courses
    return jsonify(list(map(lambda x: x.course_code, courses)))

@app.route('/student/add_to_planner', methods=['POST'])
def add_to_planner():
    if not current_user.is_student:
        return 'Access Denied', 403
    # get student from User
    student = get_student_or_admin()
    # add entry to Takes table
    course_code = request.json['course_code']
    crn = request.json['crn']
    # check for duplicate
    if Takes.query.filter_by(student_id=student.user_id, course_code=course_code, crn=crn).first():
        return Response(status=409)
    new_entry = Takes(student_id=student.user_id, course_code=course_code, crn=crn)
    # log
    db.session.add(Logs(user_id=student.user_id, action=f'Added {course_code} to planner', timestamp=datetime.now()))
    db.session.add(new_entry)
    db.session.commit()
    # return success
    return Response(status=200)

@app.route('/student/remove_from_planner', methods=['POST'])
def remove_from_planner():
    if not current_user.is_student:
        return 'Access Denied', 403
    # get student from User
    student = get_student_or_admin()
    # add entry to Takes table
    course_code = request.json['course_code']
    crn = request.json['crn']
    # check for duplicate
    entry = Takes.query.filter_by(student_id=student.user_id, course_code=course_code, crn=crn).first()
    if not entry:
        return Response(status=409)
    # log
    db.session.add(Logs(user_id=student.user_id, action=f'Removed {course_code} from planner', timestamp=datetime.now()))
    db.session.delete(entry)
    db.session.commit()
    # return success
    return Response(status=200)

@app.route('/student/planner_courses', methods=['GET'])
def planner_courses():
    if not current_user.is_student:
        return 'Access Denied', 403
    # get student from User
    student = get_student_or_admin()
    # get courses from Takes
    courses = Takes.query.filter_by(student_id=student.user_id).all()
    # return courses (code and crn)
    print(courses)
    return jsonify(list(map(lambda x: { 'course_code': x.course_code, 'crn': x.crn }, courses)))

@app.route('/student/section_info', methods=['POST'])
def section_info():
    if not current_user.is_student:
        return 'Access Denied', 403
    # get the selected course code
    crn = request.json['crn']
    # get the sections from the sections.db using sqlite3
    print(crn)
    conn = sqlite3.connect('sections.db')
    cursor = conn.cursor()
    query = '''
    SELECT crn, sec_num, instructor, days, start_time, finish_time, course_code, course_name
    FROM Section
    WHERE crn = ?
    '''
    cursor.execute(query, (crn,))
    section = cursor.fetchone()
    conn.close()
    
    print(section)
    section = { 'crn': section[0], 'sec_num': section[1], 'instructor': section[2], 'days': section[3], 'start_time': section[4], 'finish_time': section[5], 'course_code': section[6], 'course_name': section[7] }
    # return the sections
    return jsonify(section)

@app.route('/student/registered_credits', methods=['GET'])
def registered_credits():
    if not current_user.is_student:
        return 'Access Denied', 403
    # get student from User
    student = get_student_or_admin()
    # get courses from Completed
    courses = Completed.query.filter_by(student_id=student.user_id).all()
    # return courses
    return jsonify(sum(map(lambda x: Course.query.get(x.course_code).credit_hours, courses)))

@app.route('/student/completed_credits', methods=['GET'])
def completed_credits():
    if not current_user.is_student:
        return 'Access Denied', 403
    # get student from User
    student = get_student_or_admin()
    # get courses from Completed
    courses = Completed.query.filter_by(student_id=student.user_id).all()
    # do one query to sum the credits of all courses by just getting on section of the course

    conn = sqlite3.connect('sections.db')
    cursor = conn.cursor()
    placeholders = ','.join('?' * len(courses))

    # SQL query
    query = f'''
    SELECT SUM(credits)
    FROM (
        SELECT DISTINCT course_code, credits
        FROM section
        WHERE course_code IN ({placeholders})
    ) AS distinct_courses;
    '''

    # Extract course codes from courses and pass them as separate arguments
    course_codes = tuple(x.course_code for x in courses)
    cursor.execute(query, course_codes)

    # Fetch and print the result
    total_credits = cursor.fetchone()[0]
    conn.close()
    # return credits
    return jsonify(total_credits)


@app.route("/")
def index():
    # if not logged in, redirect to login page
    if not current_user.is_authenticated:
        return redirect(url_for('login'))
    # if student, redirect to student dashboard
    if current_user.is_student:
        return redirect(url_for('student_dashboard'))
    # if admin, redirect to admin dashboard
    if current_user.is_admin:
        return redirect('/admin')
    return render_template(url_for('student_courses'))

if __name__ == '__main__':
    # delete the database if it exists
    import os
    if os.path.exists(DB_NAME):
        os.remove(DB_NAME)
    create_db(app)
    with app.app_context():
        # creating sample user (bypassing password restriction here only for testing purposes)
        new_user = User(email='b00093225@aus.edu')
        new_user.password = '123'  # Set password hash
        new_user.role = 'student'
        new_student = Student(name='b00093225@aus.edu'.split('@')[0], user_id=new_user.id)
        new_student.password = '123'
        new_student.major_name = 'CS'
        # new_user.student = new_student
        db.session.add(new_student)
        db.session.add(new_user)
        db.session.commit()
    app.run(debug=True, port=5001)