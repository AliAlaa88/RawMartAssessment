<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'register'], // Ensure login/register are covered

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:5173', 
        'https://front-production-d34e.up.railway.app'
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['Content-Type', 'X-Requested-With', 'Authorization', 'Accept'], // Be explicit

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
