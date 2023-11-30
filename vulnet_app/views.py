from rest_framework import viewsets
from .serializers import DeviceSerializer,VulnerabilitySerializer,ConnectionSerializer,ConnectionVulnerabilitySerializer
from .models import Device,Vulnerability,Connection,ConnectionVulnerability
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, JsonResponse
from django.core import serializers

import json

# Create your views here.
class DeviceView(viewsets.ModelViewSet):
    serializer_class = DeviceSerializer
    queryset = Device.objects.all()

class VulnerabilityView(viewsets.ModelViewSet):
    serializer_class = VulnerabilitySerializer
    queryset = Vulnerability.objects.all()

class ConnectionView(viewsets.ModelViewSet):
    serializer_class = ConnectionSerializer
    queryset = Connection.objects.all()

class ConnectionVulnerabilityView(viewsets.ModelViewSet):
    serializer_class = ConnectionVulnerabilitySerializer
    queryset = ConnectionVulnerability.objects.all()


class NdevNvuln(APIView):
    def get(self, request, format=None):
        devices = Device.objects.all()
        dev_values=devices.values()
        ndev=len(devices)
        nvuln=0
        for dev in dev_values:
            if len(Vulnerability.objects.filter(device_id=dev["id"])) != 0:
                nvuln+=1
                
        return JsonResponse({"ndev":ndev,"nvuln":nvuln})
    
class NSeverity(APIView):
    def get(self, request, format=None):
        devices = Device.objects.all()
        dev_values=devices.values()
        json_dict = {}
        for dev in dev_values:
            dev_dict={}
            none,low,medium,high,critical=0,0,0,0,0
            vulns_list=Vulnerability.objects.filter(device_id=dev["id"]).values()
            if len(vulns_list) != 0:
                for vuln in vulns_list:
                    sev=vuln["baseSeverity"]
                    if sev == "NONE":
                        none+=1
                    elif(sev == "LOW"):
                        low+=1
                    elif(sev == "MEDIUM"):
                        medium+=1
                    elif(sev == "HIGH"):
                        high+=1 
                    else:
                        critical+=1
            dev_dict["none"]=none
            dev_dict["low"]=low
            dev_dict["medium"]=medium
            dev_dict["high"]=high
            dev_dict["critical"]=critical
            json_dict[dev["model"]]=dev_dict

        return JsonResponse(json_dict)
    
class NSeveritySummary(APIView):
    def get(self, request, format=None):
        devices = Device.objects.all()
        dev_values=devices.values()
        json_dict = {}
        none,low,medium,high,critical=0,0,0,0,0
        for dev in dev_values:
            vulns_list=Vulnerability.objects.filter(device_id=dev["id"]).values()
            if len(vulns_list) != 0:
                for vuln in vulns_list:
                    sev=vuln["baseSeverity"]
                    if sev == "NONE":
                        none+=1
                    elif(sev == "LOW"):
                        low+=1
                    elif(sev == "MEDIUM"):
                        medium+=1
                    elif(sev == "HIGH"):
                        high+=1 
                    else:
                        critical+=1
            json_dict["none"]=none
            json_dict["low"]=low
            json_dict["medium"]=medium
            json_dict["high"]=high
            json_dict["critical"]=critical
            json_dict["total"]=none+low+medium+high+critical
        return JsonResponse(json_dict)
    
class NSeveritySummaryList(APIView):
    def get(self, request, format=None):
        devices = Device.objects.all()
        dev_values=devices.values()
        json_dict = {}
        none,low,medium,high,critical=[],[],[],[],[]
        for dev in dev_values:
            vulns_list=Vulnerability.objects.filter(device_id=dev["id"]).values()
            if len(vulns_list) != 0:
                n,l,m,h,c=0,0,0,0,0
                for vuln in vulns_list:
                    sev=vuln["baseSeverity"]
                    if sev == "NONE":
                        n+=1
                    elif(sev == "LOW"):
                        l+=1
                    elif(sev == "MEDIUM"):
                        m+=1
                    elif(sev == "HIGH"):
                        h+=1 
                    else:
                        c+=1
                none.append(n)
                low.append(l)
                medium.append(m)
                high.append(h)
                critical.append(c)
            else:
                    none.append(0)
                    low.append(0)
                    medium.append(0)
                    high.append(0)
                    critical.append(0)

            json_dict["none"]=none
            json_dict["low"]=low
            json_dict["medium"]=medium
            json_dict["high"]=high
            json_dict["critical"]=critical

        return JsonResponse(json_dict)
    

class DeviceVulnerabilities(APIView):
    def get(self, request, *args, **kwargs):
        model = self.kwargs["model"]
        devices = Device.objects.all()
        dev_values=devices.values()
        for dev in dev_values:
            if dev["model"]==model:
                vulns_list=Vulnerability.objects.filter(device_id=dev["id"]).values()
                vul_dict={}
                for vuln in vulns_list:
                    vul_dict[vuln["name"]]=vuln

        return JsonResponse(dict(reversed(list(vul_dict.items()))))
    
class VulnerabilityValues(APIView):
    def get(self, request, *args, **kwargs):
        values={}
        vuln=Vulnerability.objects.filter(name=self.kwargs["name"]).values()
        vector_numbers=[]
        verctor_version=3    
        for vul in vuln:
            values["id"]=vul["name"]
            values["description"]=vul["description"]
            values["baseSeverity"]=vul["baseSeverity"]
            values["version"]=vul["version"]
            values["cvss"]=vul["cvss"]
            values["explotability"]=vul["explotability"]
            values["impact"]=vul["impact"]
            values["cwe"]=vul["cwe"]
            values["vector"]=vul["vector"]
            vector_numbers=[]
            verctor_version=3
            vector_lst=str(values["vector"]).split(":")
            if str(values["vector"][0:6])=="CVSS:3":
                    #"CVSS:3.1/AV:L/AC:L/PR:H/UI:N/S:U/C:N/I:H/A:N"
                    #high = [0.85, 0.77, 0.85, 0.85, 0.56, 0.56, 0.56]

                    av=vector_lst[2][0]
                    if av == "N":
                        vector_numbers.append(0.85)
                    elif av=="A":
                        vector_numbers.append(0.62)
                    elif av=="L":
                        vector_numbers.append(0.55)
                    else: #P
                        vector_numbers.append(0.2)

                    ac=vector_lst[3][0]
                    if ac == "L":
                        vector_numbers.append(0.77)
                    else: #H
                        vector_numbers.append(0.44)
                    
                    pr=vector_lst[4][0]
                    s=vector_lst[6][0]
                    if pr == "N":
                        vector_numbers.append(0.85)
                    elif pr=="L":
                        if s=="C":
                            vector_numbers.append(0.68)
                        else: # U
                            vector_numbers.append(0.62)
                    else: #H
                        if s=="C":
                            vector_numbers.append(0.50)
                        else: #U
                            vector_numbers.append(0.27)

                    ui=vector_lst[5][0]
                    if ui == "N":
                        vector_numbers.append(0.85)
                    else: #R
                        vector_numbers.append(0.62)
                    
                    c=vector_lst[7][0]
                    if c == "N":
                        vector_numbers.append(0)
                    elif c=="L":
                        vector_numbers.append(0.22)
                    else: #H
                        vector_numbers.append(0.56)

                    i=vector_lst[8][0]
                    if i == "N":
                        vector_numbers.append(0)
                    elif i=="L":
                        vector_numbers.append(0.22)
                    else: #H
                        vector_numbers.append(0.56)
                    
                    a=vector_lst[9][0]
                    if a == "N":
                        vector_numbers.append(0)
                    elif a=="L":
                        vector_numbers.append(0.22)
                    else: #H
                        vector_numbers.append(0.56)

            else:
                    verctor_version=2
                    #"AV:L/AC:L/Au:N/C:N/I:P/A:N"
                    #high = [1, 0.71, 0.704, 0.660, 0.660, 0.660]

                    av=vector_lst[1][0]
                    if av == "L":
                        vector_numbers.append(0.395)
                    elif av=="A":
                        vector_numbers.append(0.646)
                    else: #N
                        vector_numbers.append(1)

                    ac=vector_lst[2][0]
                    if ac == "H":
                        vector_numbers.append(0.35)
                    elif ac=="M":
                        vector_numbers.append(0.61)
                    else: #L
                        vector_numbers.append(0.71)
                    
                    au=vector_lst[3][0]
                    if au == "M":
                        vector_numbers.append(0.45)
                    elif au=="S":
                        vector_numbers.append(0.56)
                    else: #N
                        vector_numbers.append(0.704)

                    c=vector_lst[4][0]
                    if c == "N":
                        vector_numbers.append(0)
                    elif c=="P":
                        vector_numbers.append(0.275)
                    else: #C
                        vector_numbers.append(0.660)

                    i=vector_lst[5][0]
                    if i == "N":
                        vector_numbers.append(0)
                    elif i=="P":
                        vector_numbers.append(0.275)
                    else: #C
                        vector_numbers.append(0.660)
                    
                    a=vector_lst[6][0]
                    if a == "N":
                        vector_numbers.append(0)
                    elif a=="P":
                        vector_numbers.append(0.275)
                    else: #C
                        vector_numbers.append(0.660)
        

        values ["numeric_vector"]=vector_numbers
        values ["vector_version"]=verctor_version

        return JsonResponse(values)
    
class DeviceWeightedAverage(APIView):
    def get(self, request, *args, **kwargs):
        model = self.kwargs["model"]
        devices = Device.objects.all()
        dev_values=devices.values()
        for dev in dev_values:
            if dev["model"]==model:
                vulns_list=Vulnerability.objects.filter(device_id=dev["id"]).values()
                vul_wa_dict={}
                cvsss=[]
                weighted_average=0.0
                dividend=0.0
                divider=0.0
                for vuln in vulns_list:
                    cvsss.append(vuln["cvss"])
                for cvss in cvsss:
                    dividend+=cvss*cvss
                    divider+=cvss
                weighted_average=dividend/divider
                vul_wa_dict["DeviceWeightedAverage"]=weighted_average

        return JsonResponse(vul_wa_dict)
    
class WeightedAverage(APIView):
    def get(self, request, *args, **kwargs):
        devices = Device.objects.all()
        dev_values = devices.values()
        wa_dict = {}
        device_weighted_average = []
        total_dividend = 0.0
        total_divider = 0.0

        for dev in dev_values:
            vulns_list = Vulnerability.objects.filter(device_id=dev["id"]).values()
            cvsss = []
            weighted_average = 0.0
            dividend = 0.0
            divider = 0.0

            for vuln in vulns_list:
                cvss = vuln["cvss"]
                if cvss is not None:
                    cvsss.append(cvss)
            if cvsss:  
                for cvss in cvsss:
                    dividend += cvss * cvss
                    divider += cvss
                if divider != 0:
                    weighted_average = dividend / divider

                device_weighted_average.append(weighted_average)
            else:
                device_weighted_average.append(0.0)

        for weighted_average in device_weighted_average:
            total_dividend += weighted_average * weighted_average
            total_divider += weighted_average

        if total_divider != 0:  
            device_weighted_average = total_dividend / total_divider
            wa_dict["WeightedAverage"] = device_weighted_average
        else:
            wa_dict["WeightedAverage"] = None 

        return JsonResponse(wa_dict)

class Risk(APIView):
    def get(self, request, *args, **kwargs):
        value = self.kwargs["value"]
        dic ={}
        dic["risk"]=value
        return JsonResponse(dic) 
    
class AverageSustainability(APIView):
    def get(self, request, *args, **kwargs):
        devices = Device.objects.all()
        dev_values = devices.values()
        sus_values = []

        for dev in dev_values:
            sus = dev["category"]
            if sus == "Unconstrained":
                sus_values.append(4)
            elif sus == "Class 2 (Constrained)":
                sus_values.append(3)
            elif sus == "Class 1 (Constrained)":
                sus_values.append(2)
            elif sus == "Class 0 (Constrained)":              
                sus_values.append(1)

        if sus_values:
            average = sum(sus_values) / len(sus_values)
            result = {"AverageSustainability": average}
            return JsonResponse(result)
        else:
            result = {"AverageSustainability": 0}
            return JsonResponse(result)
    
class DeviceSustainability(APIView):
    def get(self, request, *args, **kwargs):
        query = request.data
        devices = Device.objects.all()
        dev_values = devices.values()
        model = self.kwargs["model"]
        val = "No data"
        for dev in dev_values:
            if model == dev["model"]:
                sus = dev["category"]
                if sus == "Unconstrained":
                    val = "4"
                elif sus == "Class 2 (Constrained)":
                    val = "3"
                elif sus == "Class 1 (Constrained)":
                    val = "2"
                elif sus == "Class 0 (Constrained)":              
                    val = "1"

        result = {"DeviceSustainability": val}
        return JsonResponse(result)    
    
class CreateConnection(APIView):
    def post(self, request, *args, **kwargs):
        query = request.data

        type= query.get("type")

        first_device= query.get("first_device")
        second_device= query.get("second_device")

        first_device_object=Device.objects.filter(model=first_device)[0]
        second_device_object=Device.objects.filter(model=second_device)[0]

        Connection.objects.create(type=type, first_device=first_device_object, second_device=second_device_object)


        return Response(status=status.HTTP_200_OK)

class UpdateConnection(APIView):
    def put(self, request, *args, **kwargs):
        query = request.data

        id_value = self.kwargs["id"]
        type= query.get("type")

        first_device= query.get("first_device")
        second_device= query.get("second_device")

        first_device_object=Device.objects.filter(model=first_device)[0]
        second_device_object=Device.objects.filter(model=second_device)[0]

        Connection.objects.filter(id=id_value).update(type=type, first_device=first_device_object, second_device=second_device_object)

        return Response(status=status.HTTP_200_OK)


class getDeviceModels(APIView):
    def get(self, request, *args, **kwargs):
        devices = Device.objects.all()
        models=[]
        for device in devices:
            models.append(device.model)
        dic ={}
        dic["models"]=models
        return JsonResponse(dic) 
    
class getConnectionGraph(APIView):
    def get(self, request, *args, **kwargs):
        connections = Connection.objects.all()
        first_devices=[]
        second_devices=[]
        protocols=[]
        for con in connections:
            first_devices.append(con.first_device.model)
            second_devices.append(con.second_device.model)
            protocols.append(con.type)

        dic ={}
        dic["first_devices"]=first_devices
        dic["second_devices"]=second_devices
        dic["protocols"]=protocols
        return JsonResponse(dic) 

    
class getConnectionProtocols(APIView):
    def get(self, request, *args, **kwargs):
        protocols=["WI-FI","Dedicated Wiring","Bluetooth","LoRaWAN","6LoWPAN","Z-Wave","ZigBee","3G","4G","5G","Other"]
        dic ={}
        dic["protocols"]=protocols
        return JsonResponse(dic) 
    
class getDeviceTypes(APIView):
    def get(self, request, *args, **kwargs):
        types=["Switch","Router","Bridge","Repeater","Modern","Gateway","Firewall","Low-End Sensor","Smart Bulb","Smart Energy Management Device",
                   "Smart Lock","Smart Security Alarm","High-End Sensor","Smart Security IP Camera","Smart Appliance","Smart TV","Smartphone","Tablet",
                   "Personal Computer","Smartwatch","Smart Security Hub","Home Assistant Hub","Network Attached Storage (NAS)", "Other"]
        dic ={}
        dic["types"]=types
        return JsonResponse(dic) 
    
class getDeviceCapabilities(APIView):
    def get(self, request, *args, **kwargs):
        capabilities=["Class 0 (Constrained)","Class 1 (Constrained)","Class 2 (Constrained)","Unconstrained","Other"]
        dic ={}
        dic["capabilities"]=capabilities
        return JsonResponse(dic) 