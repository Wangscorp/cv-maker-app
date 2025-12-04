# Contributing to CV Maker

Thank you for your interest in contributing to CV Maker! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/CVMaker.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit your changes: `git commit -m "Add your descriptive commit message"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

Please refer to the [README.md](README.md) for detailed installation instructions.

## Code Style

### Backend (Rust)

- Follow Rust standard formatting: `cargo fmt`
- Run linter before committing: `cargo clippy`
- Write tests for new features

### Frontend (React)

- Follow ESLint rules
- Use functional components with hooks
- Keep components small and focused
- Write meaningful prop types

## Commit Messages

- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Keep the first line under 72 characters
- Add detailed description if necessary

Example:

```
Add user profile editing feature

- Add ProfileEdit component
- Update user API endpoints
- Add form validation
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update the README.md if you've added features
5. Request review from maintainers

## Testing

### Backend

```bash
cd backend
cargo test
```

### Frontend

```bash
cd frontend
npm test
```

## Reporting Bugs

- Use GitHub Issues
- Include clear description of the bug
- Provide steps to reproduce
- Include system information (OS, browser, versions)
- Add screenshots if applicable

## Feature Requests

- Open a GitHub Issue
- Clearly describe the feature
- Explain why it would be useful
- Provide examples if possible

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the project

## Questions?

Feel free to open an issue for any questions about contributing!
