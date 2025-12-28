<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => array_filter([
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'https://front-production-d34e.up.railway.app',
        env('FRONTEND_URL'),  // Railway can set this
    ]),

    'allowed_origins_patterns' => [
        '#^https://.*\.up\.railway\.app$#',  // Allow any Railway subdomain
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
