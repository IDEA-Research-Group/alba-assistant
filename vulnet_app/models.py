
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


class Connection(models.Model):
    type = models.TextField(blank=False)
    first_device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name="firstdevice")
    second_device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name="seconddevice")

    def __str__(self):
            return self.type


class ConnectionVulnerability(models.Model):
    name = models.TextField()
    description = models.TextField()
    baseSeverity = models.TextField()
    version = models.FloatField()
    cvss=models.FloatField()
    explotability=models.FloatField()
    impact=models.FloatField()
    cwe = models.TextField()
    vector= models.TextField()
    connection = models.ForeignKey(Connection, on_delete=models.CASCADE, related_name="connectionvulnerabilities")

    def __str__(self):
       return str(self.name)