FROM php:8.3-fpm

# System deps
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy files
COPY . .

# --- FIX START ---
# 1. Create missing directories that might be gitignored
RUN mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache bootstrap/cache

# 2. Set permissions BEFORE running composer install
# This ensures the 'root' user (who runs the build) can write the discovery files
RUN chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache
# --- FIX END ---

# Install PHP deps
# The --no-scripts flag is an alternative if permissions still act up, 
# but setting permissions first is the standard fix.
RUN composer install --no-dev --optimize-autoloader

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0 --port=8000