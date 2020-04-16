from rest_framework import serializers
from article.models import Article

class ArticleSerializer(serializers.ModelSerializer):
	class Meta:
		model = Article
		fields = "__all__"
		read_only_fields = ['pk']