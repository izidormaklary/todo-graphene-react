from django.db import models


class Todo(models.Model):
    task = models.CharField(max_length=600)
    completed = models.BooleanField(default=False)
    date_created = models.DateField(auto_now=True)

    class Meta:
        ordering = ['-date_created']
