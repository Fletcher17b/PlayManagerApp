# Playlist Manager Project

A full-stack web application for managing music playlists with a modern Vue.js frontend and Django REST API backend.

## 🎵 Features

- **Playlist Management**: Create, edit, and delete playlists
- **Song Management**: Add, remove, and reorder songs within playlists
- **Drag & Drop**: Intuitive drag-and-drop interface for song reordering
- **Search & Filter**: Search songs by title, artist, album, or genre
- **Responsive Design**: Modern UI that works on desktop and mobile
- **Dark/Light Theme**: Toggle between light and dark themes

## 🏗️ Architecture

This project consists of two main components:

- **Frontend**: Vue.js 3 application with Vuex state management
- **Backend**: Django REST API with SQLite database

## 📁 Project Structure

```
PlaylistManagerProject/
├── djangoAPI/                 # Django REST API backend
│   ├── music/                # Main app with models, views, serializers
│   ├── djangoAPI/            # Django project settings
│   └── requirements.txt      # Python dependencies
└── playlist-manager/         # Vue.js frontend
    ├── src/
    │   ├── components/       # Reusable Vue components
    │   ├── views/           # Page components
    │   ├── store/           # Vuex state management
    │   ├── services/        # API service layer
    │   └── router/          # Vue Router configuration
    └── package.json         # Node.js dependencies
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

### Backend Setup

1. Navigate to the Django API directory:
   ```bash
   cd djangoAPI
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run database migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. Navigate to the Vue.js application directory:
   ```bash
   cd playlist-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run serve
   ```

The application will be available at `http://localhost:8080/`

## 📚 API Documentation

### Endpoints

#### Playlists
- `GET /api/playlists/` - Get all playlists
- `POST /api/playlists/` - Create a new playlist
- `GET /api/playlists/{id}/` - Get a specific playlist with songs
- `PUT /api/playlists/{id}/` - Update a playlist
- `DELETE /api/playlists/{id}/` - Delete a playlist

#### Songs
- `GET /api/songs/` - Get all songs
- `POST /api/songs/` - Create a new song
- `GET /api/songs/?playlist={id}` - Get songs by playlist
- `PUT /api/songs/{id}/` - Update a song
- `DELETE /api/songs/{id}/` - Delete a song

### Data Models

#### Playlist
```json
{
  "id": 1,
  "name": "My Playlist",
  "description": "A collection of my favorite songs",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "created_at": "2024-01-01T00:00:00Z",
  "songs": [...]
}
```

#### Song
```json
{
  "id": 1,
  "playlist": 1,
  "title": "Bohemian Rhapsody",
  "artist": "Queen",
  "album": "A Night at the Opera",
  "duration": "5:55",
  "genre": "Rock"
}
```

## 🛠️ Development

### Available Scripts

#### Frontend (playlist-manager/)
- `npm run serve` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Lint and fix files

#### Backend (djangoAPI/)
- `python manage.py runserver` - Start development server
- `python manage.py makemigrations` - Create database migrations
- `python manage.py migrate` - Apply database migrations
- `python manage.py createsuperuser` - Create admin user

### Code Style

- **Frontend**: ESLint + Prettier configuration
- **Backend**: PEP 8 Python style guide
- **Vue Components**: Use PascalCase for component names
- **API**: RESTful conventions

## 🧪 Testing

### Frontend Testing
```bash
cd playlist-manager
npm run test:unit
```

### Backend Testing
```bash
cd djangoAPI
python manage.py test
```

## 📦 Deployment

### Frontend Deployment
1. Build the production version:
   ```bash
   cd playlist-manager
   npm run build
   ```

2. Deploy the `dist/` folder to your web server

### Backend Deployment
1. Set up a production database (PostgreSQL recommended)
2. Configure environment variables
3. Run migrations
4. Deploy using WSGI server (Gunicorn recommended)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Known Issues

- Authentication is not implemented (marked as TODO in router)
- 404 page needs to be implemented
- Song editing functionality is hidden in UI

## 🔮 Future Enhancements

- User authentication and authorization
- Music file upload and playback
- Collaborative playlists
- Social features (sharing, following)
- Mobile app development
- Advanced search and filtering
- Playlist analytics 