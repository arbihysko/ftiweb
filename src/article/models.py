from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Article(models.Model):
	title = models.CharField(max_length=128)
	content = models.TextField(blank=True)
	pub_date = models.DateTimeField(default=timezone.now)
	author = models.ForeignKey(User, on_delete=models.CASCADE)
	choices = [
		('DII', 'Departamenti i Inxhinierise Informatike'),
		('DET', 'Departamenti i Inxhinierise Elektrionike dhe Telekomunikacionit'),
		('DBI', 'Departamenti i Bazave te Informatikes')
	]
	department = models.CharField(max_length=3, choices=choices)
	file = models.FileField(upload_to='files/',null=True, blank=True)

	class Meta:
		ordering = ['-pub_date']

	def __str__(self):
		return self.title