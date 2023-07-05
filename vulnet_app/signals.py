from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Device,Vulnerability
import time 
import json 
import requests

#-------------------------API-----------------------
def vulns_search(model):
    model_url=model.replace(" ","%20")
    response = requests.get('https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch='+model_url).text

    vulns=[]
    json_object=json.loads(response)
    json_vulns=json_object["vulnerabilities"]

    for vul in range(0,len(json_vulns)):
        version=str(json_vulns[vul]['cve']['metrics'])
        id=str(json_vulns[vul]["cve"]["id"])
        description=str(json_vulns[vul]["cve"]["descriptions"][0]["value"])

        if ("cvssMetricV31" in version):
            version31=str(json_vulns[vul]['cve']['metrics']['cvssMetricV31'][0]['cvssData']['version'])
            cvss31=str(json_vulns[vul]['cve']['metrics']['cvssMetricV31'][0]['cvssData']['baseScore'])
            severity31=str(json_vulns[vul]['cve']['metrics']['cvssMetricV31'][0]['cvssData']['baseSeverity'])
            explotability31=str(json_vulns[vul]['cve']['metrics']['cvssMetricV31'][0]['exploitabilityScore'])
            impact31=str(json_vulns[vul]['cve']['metrics']['cvssMetricV31'][0]['impactScore'])
            cwe31=str(json_vulns[vul]['cve']['weaknesses'][0]['description'][0]['value'])
            vector31=str(json_vulns[vul]['cve']['metrics']['cvssMetricV31'][0]['cvssData']['vectorString'])

            vulns.append(id+"___"+description+"___"+severity31+"___"+version31+"___"+cvss31+"___"+explotability31+"___"+impact31+"___"+cwe31+"___"+vector31)

        elif ("cvssMetricV30" in version):
            version30=str(json_vulns[vul]['cve']['metrics']['cvssMetricV30'][0]['cvssData']['version'])
            cvss30=str(json_vulns[vul]['cve']['metrics']['cvssMetricV30'][0]['cvssData']['baseScore'])
            severity30=str(json_vulns[vul]['cve']['metrics']['cvssMetricV30'][0]['cvssData']['baseSeverity'])
            explotability30=str(json_vulns[vul]['cve']['metrics']['cvssMetricV30'][0]['exploitabilityScore'])
            impact30=str(json_vulns[vul]['cve']['metrics']['cvssMetricV30'][0]['impactScore'])
            cwe30=str(json_vulns[vul]['cve']['weaknesses'][0]['description'][0]['value'])
            vector30=str(json_vulns[vul]['cve']['metrics']['cvssMetricV30'][0]['cvssData']['vectorString'])


            vulns.append(id+"___"+description+"___"+severity30+"___"+version30+"___"+cvss30+"___"+explotability30+"___"+impact30+"___"+cwe30+"___"+vector30)
        elif ("cvssMetricV2" in version):
            version2=str(json_vulns[vul]['cve']['metrics']['cvssMetricV2'][0]['cvssData']['version'])
            cvss2=str(json_vulns[vul]['cve']['metrics']['cvssMetricV2'][0]['cvssData']['baseScore'])
            severity2=str(json_vulns[vul]['cve']['metrics']['cvssMetricV2'][0]['baseSeverity'])
            explotability2=str(json_vulns[vul]['cve']['metrics']['cvssMetricV2'][0]['exploitabilityScore'])
            impact2=str(json_vulns[vul]['cve']['metrics']['cvssMetricV2'][0]['impactScore'])
            cwe2=str(json_vulns[vul]['cve']['weaknesses'][0]['description'][0]['value'])
            vector2=str(json_vulns[vul]['cve']['metrics']['cvssMetricV2'][0]['cvssData']['vectorString'])

                
            vulns.append(id+"___"+description+"___"+severity2+"___"+version2+"___"+cvss2+"___"+explotability2+"___"+impact2+"___"+cwe2+"___"+vector2)

    #OUT ["CVE-2019-15415___A vuln ...___HIGH___3.1___5.6___4.5___2.1"]        
    return vulns

#---------------------------------------------------


@receiver(post_save, sender=Device)
def scan(sender, instance, created, **kwargs):
    if created:
        vulns=vulns_search(instance.model)
        for vul in vulns:
            vul=str(vul).split("___")
            Vulnerability.objects.create(name=vul[0],description=vul[1],baseSeverity=vul[2],version=vul[3],cvss=vul[4],explotability=vul[5],impact=vul[6],cwe=vul[7],vector=vul[8],device=instance)
