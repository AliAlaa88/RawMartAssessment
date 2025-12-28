<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'TaskFlow API']);
});

use Illuminate\Support\Facades\DB;

Route::get('/db-test', function () {
    try {
        // This force-triggers a connection and checks the name
        $dbName = DB::connection()->getDatabaseName();
        return response()->json([
            'status' => 'success',
            'database' => $dbName,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Could not connect: ' . $e->getMessage(),
        ], 500);
    }
});