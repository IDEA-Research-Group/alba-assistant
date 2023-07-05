from django.apps import AppConfig

class VulnetAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'vulnet_app'

    def ready(self):
        import vulnet_app.signals