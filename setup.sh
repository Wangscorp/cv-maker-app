#!/bin/bash

# CV Maker Setup Script
# This script helps set up the development environment

set -e

echo "========================================"
echo "CV Maker Development Setup"
echo "========================================"
echo ""

# Check prerequisites
echo "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi
echo "✓ Node.js found: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "✓ npm found: $(npm --version)"

# Check Rust
if ! command -v cargo &> /dev/null; then
    echo "❌ Rust/Cargo is not installed. Please install from https://rustup.rs"
    exit 1
fi
echo "✓ Rust found: $(rustc --version)"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL client is not installed."
    echo "   Install with: sudo apt-get install postgresql-client"
    exit 1
fi
echo "✓ PostgreSQL client found"

echo ""
echo "All prerequisites satisfied!"
echo ""

# Setup backend
echo "========================================"
echo "Setting up Backend..."
echo "========================================"

cd backend

# Check for .env file
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your database credentials"
fi

# Install libpq-dev if on Ubuntu/Debian
if command -v apt-get &> /dev/null; then
    echo "Installing PostgreSQL development libraries..."
    sudo apt-get update
    sudo apt-get install -y libpq-dev
fi

echo "Building backend..."
cargo build

cd ..

# Setup frontend
echo ""
echo "========================================"
echo "Setting up Frontend..."
echo "========================================"

cd frontend

echo "Installing frontend dependencies..."
npm install

cd ..

# Database setup reminder
echo ""
echo "========================================"
echo "Database Setup"
echo "========================================"
echo "To set up the database, run:"
echo "  createdb cvmaker"
echo "  psql cvmaker < database/schema.sql"
echo ""

echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "To start the application:"
echo ""
echo "1. Start the backend:"
echo "   cd backend && cargo run"
echo ""
echo "2. Start the frontend (in another terminal):"
echo "   cd frontend && npm run dev"
echo ""
echo "3. Open http://localhost:5173 in your browser"
echo ""
echo "Happy coding! 🚀"
