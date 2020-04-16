from .serializers import ArticleSerializer
from rest_framework.generics import ListAPIView
from article.models import Article
from datetime import date

class ArticleAPIView(ListAPIView):
	def get_queryset(self):
		if 'date' in self.request.query_params:
			dt = self.request.query_params['date']
			day = date(dt)
			print(date)
			try:
				queryset = Article.objects.filter(pub_date__date = day)
				pass
			except Exception as e:
				raise e
			return queryset
		else:
			return Article.objects.all()[:5]

	serializer_class = ArticleSerializer