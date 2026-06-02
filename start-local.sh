#!/bin/bash

# Lokaler Development Server für Zahnarztpraxis-Website
# Usage: ./start-local.sh [port]

PORT=${1:-3000}
PROJECT_DIR="/Users/jouls/Desktop/arztpraxis dr jahn"

echo "=================================="
echo "🦷 Zahnarztpraxis Local Server"
echo "=================================="
echo ""
echo "📁 Project Directory: $PROJECT_DIR"
echo "🌐 Server Port: $PORT"
echo ""

# Check if directory exists
if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Error: Project directory not found!"
    exit 1
fi

# Navigate to project directory
cd "$PROJECT_DIR"

echo "🚀 Starting local server..."
echo ""
echo "✅ Server running at:"
echo "   http://localhost:$PORT/"
echo ""
echo "📄 Available pages:"
echo "   • Homepage:        http://localhost:$PORT/"
echo "   • Leistungen:      http://localhost:$PORT/leistungen.html"
echo "   • Team:            http://localhost:$PORT/team.html"
echo "   • Neupatienten:    http://localhost:$PORT/neupatienten.html"
echo "   • Praxistour:      http://localhost:$PORT/praxistour.html"
echo "   • Service Detail:  http://localhost:$PORT/leistung.html#zahnerhaltung-prophylaxe"
echo ""
echo "🛑 Press Ctrl+C to stop the server"
echo "=================================="
echo ""

# Start Python HTTP Server
python3 -m http.server $PORT
