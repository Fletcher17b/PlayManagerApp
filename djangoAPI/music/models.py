from django.db import models

class Playlist(models.Model):
    """ 
        Playlist Model 
        - 4 params:
            - name
            - description
            - thumnail
            - creation timestamp
    """
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    thumbnail = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Song(models.Model):
    """ 
        Individual Song Model
        - 5 params:
            - playlist (FK) -> Playlist model,  many-to-one
            - title
            - artist
            - album
            - duration 
            - genre 
    """
    
    playlist = models.ForeignKey(Playlist, related_name='songs', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    album = models.CharField(max_length=100, blank=True)
    duration = models.CharField(max_length=10)  # lenght format: mm:ss
    genre = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.title} - {self.artist}"