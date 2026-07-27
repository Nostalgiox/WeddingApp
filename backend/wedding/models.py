from django.db import models


class Mission(models.Model):
    title = models.CharField(max_length=150)
    icon = models.CharField(max_length=20, blank=True)
    required_photos = models.PositiveIntegerField(default=5)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title

    @property
    def current_photos(self):
        return self.photos.count()

    @property
    def completed(self):
        return self.current_photos >= self.required_photos


class Photo(models.Model):
    image = models.ImageField(upload_to="photos/%Y/%m/%d/")

    mission = models.ForeignKey(
        Mission,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="photos",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.mission:
            return f"Zdjęcie #{self.id} - {self.mission.title}"

        return f"Zdjęcie #{self.id}"