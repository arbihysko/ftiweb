from django.urls import path
from .views import CalendarView
from .api.views import ArticleAPIView

urlpatterns = [
	path('calendar/', CalendarView.as_view(), name='calendar'),
	path('calendar/api/', ArticleAPIView.as_view(), name='calendar_API')
]