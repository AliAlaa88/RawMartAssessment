#!/bin/bash
# Shell script to start backend and frontend

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "\033[36mStarting RawMart Development Environment...\033[0m"

# Start backend in background
(
    cd "$SCRIPT_DIR/backend"
    echo -e "\033[33mInstalling PHP dependencies...\033[0m"
    composer install
    echo -e "\033[32mStarting Laravel server...\033[0m"
    php artisan serve
) &

# Start frontend in background
(
    cd "$SCRIPT_DIR/frontend"
    echo -e "\033[33mInstalling npm dependencies...\033[0m"
    npm install
    echo -e "\033[32mStarting Vite dev server...\033[0m"
    npm run dev
) &

echo -e "\033[32mBoth servers starting! Press Ctrl+C to stop both.\033[0m"

# Wait for both background processes
wait
