# Contributing to Playlist Manager

Thank you for your interest in contributing to the Playlist Manager project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug Reports**: Report bugs and issues
- **Feature Requests**: Suggest new features
- **Code Contributions**: Submit pull requests
- **Documentation**: Improve or add documentation
- **Testing**: Write or improve tests
- **UI/UX Improvements**: Enhance the user interface

### Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/PlaylistManagerProject.git
   cd PlaylistManagerProject
   ```
3. **Set up the development environment** (see [SETUP.md](SETUP.md))
4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🏗️ Development Workflow

### Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/improvements

Examples:
- `feature/user-authentication`
- `bugfix/playlist-deletion-error`
- `docs/api-documentation-update`

### Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat: add user authentication system
fix(api): resolve playlist deletion error
docs: update API documentation
style: format code with prettier
```

### Pull Request Process

1. **Ensure your code follows the style guidelines**
2. **Write or update tests** for your changes
3. **Update documentation** if needed
4. **Test your changes** thoroughly
5. **Submit a pull request** with a clear description

### Pull Request Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Test addition/improvement

## Testing
- [ ] Backend tests pass
- [ ] Frontend tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or breaking changes documented)

## Screenshots (if applicable)
Add screenshots for UI changes.
```

## 📝 Coding Standards

### Python (Django Backend)

#### Code Style
- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide
- Use meaningful variable and function names
- Keep functions small and focused
- Add type hints where appropriate

#### Documentation
- Add docstrings to all classes and functions
- Use Google-style docstrings
- Document complex logic with inline comments

Example:
```python
def create_playlist(name: str, description: str = None) -> Playlist:
    """
    Create a new playlist with the given name and description.
    
    Args:
        name: The name of the playlist
        description: Optional description for the playlist
        
    Returns:
        The created Playlist instance
        
    Raises:
        ValidationError: If the playlist data is invalid
    """
    # Implementation here
```

#### Django Best Practices
- Use Django ORM efficiently
- Implement proper model validation
- Use Django REST Framework serializers
- Follow Django security best practices

### JavaScript/Vue.js (Frontend)

#### Code Style
- Follow [Vue.js Style Guide](https://vuejs.org/style-guide/)
- Use ESLint and Prettier configuration
- Use meaningful component and variable names
- Keep components small and focused

#### Component Documentation
- Add JSDoc comments to components
- Document props, events, and slots
- Include usage examples

Example:
```javascript
/**
 * SongItem Component
 * 
 * Displays individual song information with action buttons.
 * 
 * @component
 * @example
 * <SongItem 
 *   :song="songData"
 *   @edit="handleEdit"
 *   @delete="handleDelete"
 * />
 */
export default {
  name: 'SongItem',
  props: {
    /**
     * Song data object
     * @type {Object}
     * @required
     */
    song: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete']
}
```

#### Vue.js Best Practices
- Use Vue 3 Composition API when appropriate
- Implement proper prop validation
- Use Vuex for state management
- Follow Vue Router conventions

## 🧪 Testing Guidelines

### Backend Testing (Django)

#### Test Structure
- Unit tests for models, serializers, and views
- Integration tests for API endpoints
- Test coverage should be >80%

#### Writing Tests
```python
from django.test import TestCase
from rest_framework.test import APITestCase
from .models import Playlist, Song

class PlaylistModelTest(TestCase):
    def setUp(self):
        self.playlist = Playlist.objects.create(
            name="Test Playlist",
            description="Test Description"
        )
    
    def test_playlist_creation(self):
        self.assertEqual(self.playlist.name, "Test Playlist")
        self.assertIsNotNone(self.playlist.created_at)

class PlaylistAPITest(APITestCase):
    def test_create_playlist(self):
        data = {
            'name': 'New Playlist',
            'description': 'New Description'
        }
        response = self.client.post('/api/playlists/', data)
        self.assertEqual(response.status_code, 201)
```

### Frontend Testing (Vue.js)

#### Test Structure
- Unit tests for components
- Integration tests for Vuex store
- E2E tests for critical user flows

#### Writing Tests
```javascript
import { mount } from '@vue/test-utils'
import SongItem from '@/components/SongItem.vue'

describe('SongItem', () => {
  const mockSong = {
    id: 1,
    title: 'Test Song',
    artist: 'Test Artist',
    album: 'Test Album',
    duration: '3:30',
    genre: 'Rock'
  }

  it('renders song information correctly', () => {
    const wrapper = mount(SongItem, {
      props: { song: mockSong }
    })
    
    expect(wrapper.text()).toContain('Test Song')
    expect(wrapper.text()).toContain('Test Artist')
  })

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(SongItem, {
      props: { song: mockSong }
    })
    
    await wrapper.find('.delete-btn').trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')[0]).toEqual([1])
  })
})
```

## 🔧 Development Environment

### Required Tools
- Python 3.8+
- Node.js 14+
- Git
- Code editor (VS Code recommended)

### VS Code Extensions (Recommended)
- Python
- Vue Language Features (Volar)
- ESLint
- Prettier
- GitLens
- Django

### Environment Setup
1. Follow the [SETUP.md](SETUP.md) guide
2. Install development dependencies
3. Configure your editor with the project's linting rules

## 🐛 Bug Reports

### Before Submitting a Bug Report

1. **Check existing issues** to avoid duplicates
2. **Test with the latest version** of the code
3. **Reproduce the issue** consistently

### Bug Report Template

```markdown
## Bug Description
Clear and concise description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Environment
- OS: [e.g. Windows 10, macOS 12]
- Browser: [e.g. Chrome 96, Firefox 95]
- Python Version: [e.g. 3.9.7]
- Node.js Version: [e.g. 16.13.0]

## Additional Context
Add any other context, screenshots, or logs.
```

## 💡 Feature Requests

### Before Submitting a Feature Request

1. **Check existing issues** for similar requests
2. **Consider the scope** and impact
3. **Think about implementation** details

### Feature Request Template

```markdown
## Feature Description
Clear and concise description of the feature.

## Problem Statement
What problem does this feature solve?

## Proposed Solution
How would you like to see this implemented?

## Alternative Solutions
Any alternative solutions you've considered.

## Additional Context
Add any other context, mockups, or examples.
```

## 📚 Documentation

### Documentation Standards

- Use clear and concise language
- Include code examples
- Keep documentation up to date
- Use proper markdown formatting

### Documentation Areas

- **API Documentation**: Endpoint descriptions, request/response examples
- **Component Documentation**: Props, events, usage examples
- **Setup Guides**: Installation and configuration instructions
- **User Guides**: How to use the application

## 🔒 Security

### Security Guidelines

- Never commit sensitive information (API keys, passwords)
- Follow Django security best practices
- Validate all user inputs
- Use HTTPS in production
- Keep dependencies updated

### Reporting Security Issues

If you discover a security vulnerability, please:

1. **Do not create a public issue**
2. **Email the maintainers** directly
3. **Provide detailed information** about the vulnerability
4. **Allow time for response** before public disclosure

## 🎯 Project Goals

### Current Priorities

1. **Stability**: Ensure the application is stable and reliable
2. **Performance**: Optimize for speed and efficiency
3. **User Experience**: Improve usability and accessibility
4. **Documentation**: Maintain comprehensive documentation

### Future Roadmap

- User authentication and authorization
- Real-time collaboration features
- Mobile app development
- Advanced search and filtering
- Music file upload and playback

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Pull Requests**: For code contributions

### Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the project's coding standards

## 🙏 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub contributors** page

Thank you for contributing to the Playlist Manager project! 