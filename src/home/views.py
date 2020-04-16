from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic.base import View
from article.models import Article

class HomeView(View):
	def get(self, request, *args, **kwargs):
		context = {}
		context['title'] = 'FTI | Fakulteti i Teknologjise se Informacionit'
		context['articles'] = Article.objects.all()[:5];
		return render(request, 'home/index.html', context)