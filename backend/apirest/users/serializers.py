from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    
    def validate_age(self, value):
        if value <= 0:
            raise serializers.ValidationError("La edad debe ser un número positivo.")
        return value

    def validate_email(self, value):
        if not value.endswith("@gmail.com"):
            raise serializers.ValidationError("El correo debe ser de dominio @gmail.com.")
        return value

    class Meta:
        model = User
        fields = '__all__'
