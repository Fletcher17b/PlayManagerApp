from rest_framework import serializers
from .models import Playlist, Song

class SongSerializer(serializers.ModelSerializer):
    """
        Serializer for the Song model,
         Handles serialization/deserialization to/from JSON

         Example:
         {
             "title": "Bohemian Rhapsody",
             "artist": "Queen",
             "album": "can't recall which album it belonged",
             "playlist": 1,  # FKto Playlist
             "duration": "5:00",
             "genre": "rock"
         }
        Fields: same from song
            - playlist (FK) -> Playlist model,  many-to-one
            - title
            - artist
            - album
            - duration 
            - genre  
    """

    
    class Meta:
        model = Song
        fields = '__all__'

class PlaylistSerializer(serializers.ModelSerializer):
    """
        Playlist serializer with nested song data
         - Returns all playlist metadata (name, description, thumbnail, etc)
         - Includes a nested list of songs in the playlist
         - Song data is read-only (modified only through SongSerializer)

    """
    
    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist
        fields = ['id', 'name', 'description', 'thumbnail', 'created_at', 'songs']
