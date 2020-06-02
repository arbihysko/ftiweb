import datetime
from django.shortcuts import render
from django.views.generic.base import View
from .models import Article

class CalendarView(View):
	def get(self, request, *args, **kwargs):
		context = {}
		articles = Article.objects.all()
		if 'date' in request.GET:
			dt = request.GET['date']
			dt = dt.split('-')
			dt = list(map(int, dt))
			articles = articles.filter(pub_date__date = datetime.date(dt[0], dt[1], dt[2]))

		context['articles'] = articles
		return render(request, 'article/calendar.html', context)