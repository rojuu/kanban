# kanban app

## Pre-requirements:

You need to install these:
- Docker
- Python 3
- Npm

## Usage

- Starting the database:
    - Navigate to the root of the repo and run `docker-compose up`
- Starting the backend:
    - Navigate to the backend folder
    - Run `python -m venv env`
    - Run one of the following depending on your platform to enter the virtual env:
        - shell/bash `source env/bin/activate`
        - fish `source env/bin/activate.fish`
	    - csh/tcsh `source env/bin/activate.csh`
        - PowerShell Core `env/bin/Activate.ps1`
        - PowerShell Windows `env\Scripts\Activate.ps1`
        - cmd.exe `env\Scripts\activate.bat`
    - Run `python -m pip install -r requirements.txt`
    - Run `uvicorn main:app --reload`
- Starting the frontend:
    - Navigate to the frontend folder
    - Run `npm install`
    - Run `npm start`

### Notes about ports etc

FastAPI has a nice docs site that you can use to test the backend. It can be found in `http://localhost:8000/docs`

React will start normally in `http://localhost:3000/`

The database can be fiddled with from `http://localhost:8080`. Make sure to set the database from the dropdown to PostgresSQL. The default user is `postgres` and for the purposes of testing the default password is hardcoded to be `Password1`.
