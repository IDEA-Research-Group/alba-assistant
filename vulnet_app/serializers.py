from rest_framework import serializers
from .models import Device,Vulnerability



class VulnerabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vulnerability
        fields = '__all__'

class DeviceSerializer(serializers.ModelSerializer):
    vulnerabilities = VulnerabilitySerializer(many=True, required=False)
    class Meta:
        model = Device
        fields = '__all__'