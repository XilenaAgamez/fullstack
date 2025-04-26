from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
from rest_framework.exceptions import NotFound, ValidationError

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

  #crear un nuevo usuario
    def create(self, request, *args, **kwargs):
        try:
          
            return super().create(request, *args, **kwargs)
        except ValidationError as e:
            return Response({'detalle': 'Datos inválidos: ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)
            

    #buscar un usuario especifico
    def retrieve(self, request, *args, **kwargs):
        try:            
            return super().retrieve(request, *args, **kwargs)
        except NotFound:            
            return Response({'detalle': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)



    #actualizacion de un usuario
    def update(self, request, *args, **kwargs):
        try:
            #obtener el objeto a actualizar
            instance = self.get_object()
            
            #El serializer maneja la validación y actualización
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            #Respuesta de éxito
            return Response(
                {"message": f"Usuario {instance.username} actualizado exitosamente."},
                status=status.HTTP_200_OK
            )
        except ValidationError as e:
            return Response({'detalle': 'Datos inválidos: ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)



    #elimi9nacion de un usuario
    def destroy(self, request, *args, **kwargs):
        try:
            #Obtener el objeto a eliminar
            instance = self.get_object()
            self.perform_destroy(instance)

            # Respuesta de éxito para eliminación
            return Response(
                {"message": f"Usuario {instance.username} eliminado exitosamente."},
                status=status.HTTP_204_NO_CONTENT
            )
        except NotFound:
            return Response({'detalle': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detalle': 'Error al eliminar el usuario', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
