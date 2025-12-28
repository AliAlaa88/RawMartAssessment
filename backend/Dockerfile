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

# Create the directory and set permissions
RUN mkdir -p bootstrap/cache storage/framework/cache storage/framework/sessions storage/framework/views
RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

# THEN run composer
RUN composer install --no-dev --optimize-autoloader

# Railway sets PORT env var - must use it
EXPOSE ${PORT:-8000}

CMD php artisan serve --host=0.0.0.0 --port=${PORT:-8000}