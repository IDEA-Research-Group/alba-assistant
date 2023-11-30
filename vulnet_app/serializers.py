from rest_framework import serializers
from .models import Device,Vulnerability,Connection,ConnectionVulnerability



class VulnerabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vulnerability
        fields = '__all__'

class DeviceSerializer(serializers.ModelSerializer):
    vulnerabilities = VulnerabilitySerializer(many=True, required=False)
    class Meta:
        model = Device
        fields = '__all__'

class ConnectionVulnerabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ConnectionVulnerability
        fields = '__all__'

class ConnectionSerializer(serializers.ModelSerializer):
    connectionvulnerabilities = ConnectionVulnerabilitySerializer(many=True, required=False)
    first_device = DeviceSerializer()
    second_device = DeviceSerializer()
    class Meta:
        model = Connection
        fields = '__all__'