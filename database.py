from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

db = SQLAlchemy()

class User(UserMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    role = db.Column(db.String(10))  # 'admin' or 'student'

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    # Helper methods to check user role
    @property
    def is_admin(self):
        return self.role == 'admin'

    @property
    def is_student(self):
        return self.role == 'student'


class Course(db.Model):
    course_code = db.Column(db.String(10), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    credit_hours = db.Column(db.Integer)
    description = db.Column(db.Text)

class Requisite(db.Model):
    req_code = db.Column(db.Integer, primary_key=True, autoincrement=True)
    course_code = db.Column(db.String(10), db.ForeignKey('course.course_code'), nullable=False)
    is_corequisite = db.Column(db.Boolean, nullable=False)

class Student(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    major_name = db.Column(db.String(50), db.ForeignKey('major.major_name'))

class Admin(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(255), nullable=False)

class Major(db.Model):
    major_name = db.Column(db.String(50), primary_key=True)

class Section(db.Model):
    crn = db.Column(db.String(10), primary_key=True)
    sec_num = db.Column(db.Integer, nullable=False)
    instructor = db.Column(db.String(100))
    days = db.Column(db.String(10))
    start_time = db.Column(db.Time)
    finish_time = db.Column(db.Time)
    course_code = db.Column(db.String(10), db.ForeignKey('course.course_code'), nullable=False)

class Takes(db.Model):
    student_id = db.Column(db.Integer, db.ForeignKey('student.user_id'), primary_key=True)
    course_code = db.Column(db.String(10), db.ForeignKey('course.course_code'), primary_key=True)
    crn = db.Column(db.String(10), primary_key=True)

class Requires(db.Model):
    course_code = db.Column(db.String(10), db.ForeignKey('course.course_code'), primary_key=True)
    major_name = db.Column(db.String(50), db.ForeignKey('major.major_name'), primary_key=True)

class Completed(db.Model):
    student_id = db.Column(db.Integer, db.ForeignKey('student.user_id'), primary_key=True)
    course_code = db.Column(db.String(10), db.ForeignKey('course.course_code'), primary_key=True)

# create a logs table
class Logs(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    action = db.Column(db.String(100), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

# create database file
def create_db(app):
    with app.app_context():
        db.create_all()
        db.session.commit()
        print("Database created")