# Writter

This is essentially a clone of the twitter interface, that I am doing in order to practice and improve my ability with React and Flask. 

You may see a hosted version of this application [here](https://writter.herokuapp.com/ "Heroku application")


## Project Set Up

1. Download the source code.
2. Within ./backend/.env set environment variables:
    1. JWT_SECRET_KEY
    2. SECRET_KEY
    3. MAIL_SERVER=smtp.googlemail.com
    4. MAIL_PORT=587
    5. MAIL_USE_TLS=1
    6. MAIL_USERNAME=<emailusername>
    7. MAIL_PASSWORD=<emailPassword>
    8. ADMINS=[<AdminEmailAddresses>]
3. Create an account on [TinyMCE](https://www.tiny.cloud/ "Rich Text editor")
4. Within ./frontend/.env set environment variable:
    1. REACT_APP_TINY_API_KEY
5. Within Python shell run:
    1. from app.security import gen_fernet_key
    2. gen_fernet_key()
    3. copy this key and place it into ./backend/.env
        KEY=<<copiedkey>>


# License

This is [MIT licensed](https://github.com/facebook/react/blob/master/LICENSE)

