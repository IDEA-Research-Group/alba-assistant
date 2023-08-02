from django.contrib import admin
from .models import Device,Vulnerability,Connection,ConnectionVulnerability
# Register your models here.
admin.site.register(Device)
admin.site.register(Vulnerability)
admin.site.register(Connection)
admin.site.register(ConnectionVulnerability)