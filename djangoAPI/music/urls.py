from rest_framework.routers import DefaultRouter
from .views import PlaylistViewSet, SongViewSet

router = DefaultRouter()
router.register(r'playlists', PlaylistViewSet)
router.register(r'songs', SongViewSet)

urlpatterns = router.urls