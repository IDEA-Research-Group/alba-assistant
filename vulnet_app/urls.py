from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from vulnet_app import views

router = routers.DefaultRouter()
router.register(r"devices", views.DeviceView, "devices")
router.register(r"vulnerabilities", views.VulnerabilityView, "vulnerabilities")


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



]