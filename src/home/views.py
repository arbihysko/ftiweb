from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic.base import View

class HomeView(View):
	def get(self, request, *args, **kwargs):
		context = {}
		context['title'] = 'FTI | Fakulteti i Teknologjise se Informacionit'
		return render(request, 'home/index.html', context)