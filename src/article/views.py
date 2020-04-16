from django.shortcuts import render
from django.views.generic.base import View
from .models import Article

class CalendarView(View):
	def get(self, request, *args, **kwargs):
		context = {}
		context['articles'] = Article.objects.all()
		return render(request, 'article/calendar.html', context)