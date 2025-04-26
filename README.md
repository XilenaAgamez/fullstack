# fullstack
prueba tecnica fullstack

Requisitos
Python 3.8+

Django 4.x

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



ENDPOINT Listar Usuarios
**Método**: `GET`  
**Ruta**: `/api/users/`  
**Descripción**: Recupera una lista de todos los usuarios.
**Autenticación**: Requiere token de acceso JWT.
**ejemplo**: curl -X GET http://127.0.0.1:8000/api/users/ -H "Authorization: Bearer <token_jwt>"


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



ENDPOINT Actualizar Usuario especifico
**Método**: `PUT`  
**Ruta**: `/api/users/:id/`  
**Descripción**: Edita usuario.
**Autenticación**: Requiere token de acceso JWT.
**ejemplo**: curl -X PUT http://127.0.0.1:8000/api/users/1/ \
-H "Authorization: Bearer <token_jwt>" \
-H "Content-Type: application/json" \
-d '{"username": "usuario_editado", "email": "nuevo_email@gmail.com", "age": 30}'


ENDPOINT Obtener Usuario por ID
**Método**: `GET`  
**Ruta**: `/api/users/:id/`  
**Descripción**: Obtiene por id de usuario.
**Autenticación**: Requiere token de acceso JWT.


