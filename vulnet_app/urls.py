from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from vulnet_app import views

router = routers.DefaultRouter()
router.register(r"devices", views.DeviceView, "devices")
router.register(r"vulnerabilities", views.VulnerabilityView, "vulnerabilities")
router.register(r"connections", views.ConnectionView, "connections")
router.register(r"connectionvulnerabilities", views.ConnectionVulnerabilityView, "connectionvulnerabilities")


urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('docs/', include_docs_urls(title='Devices API')),
    path('api/v1/ndevnvuln/', views.NdevNvuln.as_view(), name="ndevnvuln"),
    path('api/v1/nseverity/', views.NSeverity.as_view(), name="nseverity"),
    path('api/v1/nseveritysummary/', views.NSeveritySummary.as_view(), name="nseveritysummary"),
    path('api/v1/nseveritysummarylist/', views.NSeveritySummaryList.as_view(), name="nseveritysummarylist"),
    path('api/v1/weightedaverage/', views.WeightedAverage.as_view(), name="weightedaverage"),
    path('api/v1/devicevulnerabilities/<str:model>/', views.DeviceVulnerabilities.as_view(), name="devicevulnerabilities"),
    path('api/v1/deviceweightedaverage/<str:model>/', views.DeviceWeightedAverage.as_view(), name="deviceweightedaverage"),
    path('api/v1/vulnerability/<str:name>/', views.VulnerabilityValues.as_view(), name="vulnerability"),
    path('api/v1/risk/<str:value>/', views.Risk.as_view(), name="risk"),
    path('api/v1/sustainability/<str:value>/', views.Sustainability.as_view(), name="sustainability"),
    path('api/v1/createconnection/', views.CreateConnection.as_view(), name="createconnection"),
    path('api/v1/updateconnection/<int:id>/', views.UpdateConnection.as_view(), name="updateconnection"),


    path('api/v1/devicemodels/', views.getDeviceModels.as_view(), name="devicemodels"),
    path('api/v1/devicetypes/', views.getDeviceTypes.as_view(), name="devicetypes"),
    path('api/v1/devicapabilities/', views.getDeviceCapabilities.as_view(), name="devicapabilities"),
    path('api/v1/connectionprotocols/', views.getConnectionProtocols.as_view(), name="connectionprotocols"),
    path('api/v1/connectiongraph/', views.getConnectionGraph.as_view(), name="connectiongraph"),





]