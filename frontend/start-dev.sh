#!/bin/bash

echo "🚀 Starting Blog Application Development Environment"
echo "================================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check dependencies
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Start backend
echo "🔧 Starting NestJS Backend..."
cd backend
npm install 2>/dev/null
npm run start:dev &
BACKEND_PID=$!
echo "📡 Backend started on http://localhost:3000 (PID: $BACKEND_PID)"

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Angular Frontend..."
cd ../frontend
npm install 2>/dev/null
npm start &
FRONTEND_PID=$!
echo "🌐 Frontend started on http://localhost:4200 (PID: $FRONTEND_PID)"

echo ""
echo "🎉 Blog Application is starting up!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📡 Backend:  http://localhost:3000"
echo "🌐 Frontend: http://localhost:4200"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup processes
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Trap Ctrl+C
trap cleanup INT

# Wait for both processes
wait 