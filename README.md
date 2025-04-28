# fullstack
prueba tecnica fullstack

Requisitos
Python 3.8+

Django 5.2

Django REST Framework

djangorestframework-simplejwt

django-cors-headers


#Instalacion
cd backend
python -m venv env
.\env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


ENDPOINT Obtener Token de Acceso
**Método**: `POST`  
**Ruta**: `/api/token/`  
**Descripción**: Genera token de acceso.
**ejemplo**: curl -X POST http://127.0.0.1:8000/api/token/ \
-H "Content-Type: application/json" \
-d '{"username": "usuario", "password": "contraseña"}'

#resultado
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTc2OTYwNiwiaWF0IjoxNzQ1NjgzMjA2LCJqdGkiOiJmMGQ3MGZhZTMwZjA0ZTVkYjU3N2MwNTg0MzQ0OGIxMiIsInVzZXJfaWQiOjJ9.yzr2WhNNQ-dh6sQD9TIHgQKT4Zs-FskJfmseTWOJrOE",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Njg2ODA2LCJpYXQiOjE3NDU2ODMyMDYsImp0aSI6IjQ3ZGNhN2U1MWI3YjRlOWI4YmRhYmI2ZGNjZmFmM2VhIiwidXNlcl9pZCI6Mn0.mT2DqaaZv2WLAf5RgCO9KoUzCwoc9c85oNzeKzsNBms"
}


ENDPOINT Listar Usuarios
**Método**: `GET`  
**Ruta**: `/api/users/`  
**Descripción**: Recupera una lista de todos los usuarios.
**Autenticación**: Requiere token de acceso JWT.
**ejemplo**: curl -X GET http://127.0.0.1:8000/api/users/ -H "Authorization: Bearer <token_jwt>"

#resultado

[

    {
        "id": 4,
        "username": "usuario4",
        "email": "usuario4gmail.com",
        "age": 26
    },
    {
        "id": 6,
        "username": "usuario6",
        "email": "usuario6@gmail.com",
        "age": 12
    }


]



ENDPOINT Crear Nuevo Usuario
**Método**: `POST`  
**Ruta**: `/api/users/`  
**Descripción**: Inserta un usuarios.
**Autenticación**: Requiere token de acceso JWT.
**ejemplo**: curl -X POST http://127.0.0.1:8000/api/users/ \
-H "Authorization: Bearer <token_jwt>" \
-H "Content-Type: application/json" \
-d '{"username": "nuevo_usuario", "email": "nuevo@gmail.com", "age": 22}'





ENDPOINT Eliminar usuario especifico
**Método**: `DELETE`  
**Ruta**: `/api/users/:id/`  
**Descripción**: Eliminar usuario.
**Autenticación**: Requiere token de acceso JWT.
**ejemplo**: curl -X DELETE http://127.0.0.1:8000/api/users/1/ -H "Authorization: Bearer <token_jwt>"

#resultado
{
    "message": "Usuario UsuarioX eliminado exitosamente."
}

ENDPOINT Actualizar Usuario especifico
**Método**: `PUT`  
**Ruta**: `/api/users/:id/`  
**Descripción**: Edita usuario.
**Autenticación**: Requiere token de acceso JWT.
**ejemplo**: curl -X PUT http://127.0.0.1:8000/api/users/1/ \
-H "Authorization: Bearer <token_jwt>" \
-H "Content-Type: application/json" \
-d '{"username": "usuario_editado", "email": "nuevo_email@gmail.com", "age": 30}'

#resultado
{
  "message": "Usuario X actualizado exitosamente."
}


ENDPOINT Obtener Usuario por ID
**Método**: `GET`  
**Ruta**: `/api/users/:id/`  
**Descripción**: Obtiene por id de usuario.
**Autenticación**: Requiere token de acceso JWT.

#resultado

[

    {
        "id": 4,
        "username": "usuario4",
        "email": "usuario4gmail.com",
        "age": 26
    }
    

]




