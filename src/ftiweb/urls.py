from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from home.views import HomeTemplateView
from django.urls import path, include

urlpatterns = [
	path('', HomeTemplateView.as_view(), name="home"),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
	import debug_toolbar
	urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)