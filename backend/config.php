<?php
return [
    'jwt_secret' => 'lBWN2rHFbeZc5qDsoXv9KnQTk0mYwI67pE3za1Mi8hdfAOuJ',

    // Admins — svi mogu da se loguju u admin panel
    'admins' => [
        [
            'email'         => 'zikmasolutions@gmail.com',
            'password_hash' => '$2y$10$J/FgWfYhKijLyF1jWaRNnOc/X0nN7NXcYqndhR5Xm4.8bSdgn10r2',
        ],
        [
            'email'         => 'duxdomus@yahoo.com',
            'password_hash' => '$2y$10$AjsNgrmwgej7kQjszgyN9uiDNZM9KnC1PX1ZXWWRpntbu9tK/O6V2',
        ],
    ],

    // Kontakt emaili — sve poruke sa formi stižu na ove adrese
    'contact_emails' => [
        'duxdomus@yahoo.com',
        'zikmasolutions@gmail.com',
    ],

    'db_host' => 'localhost',
    'db_port' => '3306',
    'db_user' => 'duxdomus_db26',
    'db_pass' => 'pIsBSqZgx2',
    'db_name' => 'duxdomus_db26',
];
