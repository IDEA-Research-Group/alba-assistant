
from django.db import models

# Create your models here.
class Device(models.Model):
    model = models.TextField(blank=False)
    type = models.TextField(blank=False)
    category = models.TextField(blank=False)

    def __str__(self):
        return self.model
    

class Vulnerability(models.Model):
    name = models.TextField()
    description = models.TextField()
    baseSeverity = models.TextField()
    version = models.FloatField()
    cvss=models.FloatField()
    explotability=models.FloatField()
    impact=models.FloatField()
    cwe = models.TextField()
    vector= models.TextField()
    device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name="vulnerabilities")

    def __str__(self):
       return str(self.name)
