from app import create_app, db
from app.models import Users, Weet
from flask import Flask

app = create_app()

@app.shell_context_processor
def make_shell_context():

    return {
        'db': db,
        'Users': Users,
        'Weet': Weet
    }

if __name__ == '__main__':
    app.run(debug=True)