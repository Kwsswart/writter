import os
from bcrypt import hashpw, gensalt, checkpw 
from base64 import b64encode 
from hashlib import sha256 
from cryptography.fernet import Fernet

e = Fernet(os.getenv("KEY"))


def encpwd(pwd):
    """
    Hash pwd provided
    """
    return hashpw(b64encode(sha256(pwd.encode()).digest()), gensalt()).decode()


def checkpwd(x, y):
    """ 
    Check whether password hashed matches:
        * arg x** password to check
        * arg y** original hashed password
    """
    return checkpw(b64encode(sha256(x.encode()).digest()), y.encode())


def gen_fernet_key():
    """
    Generate encryption key with Fernet
    """
    return Fernet.generate_key().decode()


def enc(txt: str) -> str:
    """
    Encrypt str
    """
    return e.encrypt(txt.encode()).decode()


def dec(txt: str) -> str:
    """
    Decrypt str
    """
    return e.decrypt(txt.encode()).decode()