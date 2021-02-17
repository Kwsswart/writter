from app import create_app, db
from app.models import Users, Weet, InvalidToken
from flask import Flask

app = create_app()

@app.shell_context_processor
def make_shell_context():

    return {
        'db': db,
        'Users': Users,
        'Weet': Weet,
        'InvalidToken': InvalidToken
    }


if __name__ == '__main__':
    app.run(debug=True)