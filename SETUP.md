# Playlist Manager - Setup Guide

This guide will help you set up and run the Playlist Manager project on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 14+** - [Download Node.js](https://nodejs.org/)
- **Git** - [Download Git](https://git-scm.com/)
- **pip** (usually comes with Python)
- **npm** (comes with Node.js)

### Verify Installation

```bash
# Check Python version
python --version

# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## 🚀 Quick Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd PlaylistManagerProject
```

### 2. Backend Setup (Django API)

```bash
# Navigate to Django directory
cd djangoAPI

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Create a superuser (optional)
python manage.py createsuperuser

# Start the development server
python manage.py runserver
```

The Django API will be running at `http://localhost:8000/api/`

### 3. Frontend Setup (Vue.js)

Open a new terminal window and navigate to the project root:

```bash
# Navigate to Vue.js directory
cd playlist-manager

# Install dependencies
npm install

# Start the development server
npm run serve
```

The Vue.js application will be running at `http://localhost:8080/`

## 🔧 Detailed Setup Instructions

### Backend Configuration

#### Environment Setup

1. **Create Virtual Environment**
   ```bash
   cd djangoAPI
   python -m venv venv
   ```

2. **Activate Virtual Environment**
   ```bash
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

#### Database Setup

1. **Run Migrations**
   ```bash
   python manage.py migrate
   ```

2. **Create Superuser (Optional)**
   ```bash
   python manage.py createsuperuser
   # Follow the prompts to create admin user
   ```

#### Development Server

```bash
python manage.py runserver
```

**Available Django Commands:**
- `python manage.py runserver` - Start development server
- `python manage.py makemigrations` - Create new migrations
- `python manage.py migrate` - Apply migrations
- `python manage.py createsuperuser` - Create admin user
- `python manage.py shell` - Open Django shell
- `python manage.py test` - Run tests

### Frontend Configuration

#### Node.js Setup

1. **Install Dependencies**
   ```bash
   cd playlist-manager
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the `playlist-manager` directory:
   ```env
   VUE_APP_API_URL=http://localhost:8000/api
   VUE_APP_TITLE=Playlist Manager
   NODE_ENV=development
   ```

#### Development Server

```bash
npm run serve
```

**Available npm Scripts:**
- `npm run serve` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Lint and fix files
- `npm run test:unit` - Run unit tests

## 🌐 Accessing the Application

### API Endpoints

Once the Django server is running, you can access:

- **API Root**: http://localhost:8000/api/
- **Admin Interface**: http://localhost:8000/admin/
- **Playlists API**: http://localhost:8000/api/playlists/
- **Songs API**: http://localhost:8000/api/songs/

### Frontend Application

Once the Vue.js server is running, you can access:

- **Home Page**: http://localhost:8080/
- **Dashboard**: http://localhost:8080/dashboard
- **Playlist Details**: http://localhost:8080/playlist/{id}

## 🧪 Testing the Setup

### Test API Endpoints

1. **Test Playlists API**
   ```bash
   curl http://localhost:8000/api/playlists/
   ```

2. **Create a Test Playlist**
   ```bash
   curl -X POST http://localhost:8000/api/playlists/ \
     -H "Content-Type: application/json" \
     -d '{"name": "Test Playlist", "description": "A test playlist"}'
   ```

3. **Test Songs API**
   ```bash
   curl http://localhost:8000/api/songs/
   ```

### Test Frontend

1. Open http://localhost:8080/ in your browser
2. Navigate to the Dashboard
3. Try creating a new playlist
4. Add some songs to the playlist
5. Test the drag-and-drop functionality

## 🔍 Troubleshooting

### Common Issues

#### Backend Issues

1. **Port Already in Use**
   ```bash
   # Change port
   python manage.py runserver 8001
   ```

2. **Migration Errors**
   ```bash
   # Reset database (WARNING: This will delete all data)
   rm db.sqlite3
   python manage.py migrate
   ```

3. **Import Errors**
   ```bash
   # Reinstall dependencies
   pip install -r requirements.txt
   ```

4. **CORS Errors**
   - Ensure `django-cors-headers` is installed
   - Check CORS settings in `settings.py`

#### Frontend Issues

1. **Node Modules Issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Port Already in Use**
   ```bash
   # Change port
   npm run serve -- --port 8081
   ```

3. **API Connection Issues**
   - Verify Django server is running on port 8000
   - Check CORS configuration
   - Verify API URL in `.env` file

4. **Build Errors**
   ```bash
   # Clear cache and rebuild
   npm run build -- --clean
   ```

### Debug Mode

#### Django Debug
```python
# In settings.py
DEBUG = True
```

#### Vue.js Debug
- Install Vue DevTools browser extension
- Check browser console for errors
- Use Vue DevTools for component inspection

## 📁 Project Structure

```
PlaylistManagerProject/
├── djangoAPI/                 # Django REST API
│   ├── music/                # Main Django app
│   │   ├── models.py         # Database models
│   │   ├── views.py          # API views
│   │   ├── serializers.py    # Data serializers
│   │   └── urls.py           # URL routing
│   ├── djangoAPI/            # Django project settings
│   ├── manage.py             # Django management script
│   └── requirements.txt      # Python dependencies
├── playlist-manager/         # Vue.js frontend
│   ├── src/
│   │   ├── components/       # Vue components
│   │   ├── views/           # Page components
│   │   ├── store/           # Vuex state management
│   │   ├── services/        # API services
│   │   └── router/          # Vue Router
│   ├── package.json         # Node.js dependencies
│   └── vue.config.js        # Vue CLI configuration
├── README.md                # Main project documentation
├── SETUP.md                # This setup guide
└── .gitignore              # Git ignore rules
```

## 🔄 Development Workflow

### Typical Development Session

1. **Start Backend**
   ```bash
   cd djangoAPI
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   python manage.py runserver
   ```

2. **Start Frontend** (in new terminal)
   ```bash
   cd playlist-manager
   npm run serve
   ```

3. **Make Changes**
   - Edit Vue components in `playlist-manager/src/`
   - Edit Django models/views in `djangoAPI/music/`
   - Test changes in browser

4. **Database Changes**
   ```bash
   cd djangoAPI
   python manage.py makemigrations
   python manage.py migrate
   ```

## 🚀 Production Deployment

### Backend Deployment

1. **Set up production database** (PostgreSQL recommended)
2. **Install production dependencies**
   ```bash
   pip install gunicorn psycopg2-binary
   ```
3. **Configure environment variables**
4. **Run migrations**
5. **Start with Gunicorn**
   ```bash
   gunicorn djangoAPI.wsgi:application
   ```

### Frontend Deployment

1. **Build for production**
   ```bash
   npm run build
   ```
2. **Deploy `dist/` folder** to your web server

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the main README.md for detailed documentation
3. Check the Django and Vue.js documentation
4. Ensure all prerequisites are properly installed

## 🎉 Next Steps

Once you have the application running:

1. Explore the API endpoints using the Django admin interface
2. Test the frontend functionality
3. Review the code structure and documentation
4. Start developing new features
5. Consider adding tests for your changes 