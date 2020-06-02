from .serializers import ArticleSerializer
from rest_framework.generics import ListAPIView
from article.models import Article
from datetime import date

class ArticleAPIView(ListAPIView):
	def get_queryset(self):
		articles = Article.objects.all()
		if 'date' in self.request.query_params:
			dt = self.request.query_params['date']
			dt = dt.split('-')
			dt = list(map(int, dt))
			day = date(dt[0], dt[1], dt[2])
			articles = articles.filter(pub_date__date = day)
		elif 'month' in self.request.query_params and 'year' in self.request.query_params:
			month = self.request.query_params['month']
			year = self.request.query_params['year']
			month = int(month)
			year = int(year)
			articles = articles.filter(pub_date__month=month, pub_date__year=year)
		else:
			articles = articles[:5]

		return articles

	serializer_class = ArticleSerializer