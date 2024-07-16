from exts import db

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), unique=True, nullable=False)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)
    f_name = db.Column(db.String(25), nullable=False)
    l_name = db.Column(db.String(25), nullable=False)


    def __repr__(self):
        return f"<User {self.username}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, username, email, password, f_name, l_name):
        self.username = username
        self.email = email 
        self.password = password
        self.f_name = f_name
        self.l_name = l_name

        db.session.commit()
