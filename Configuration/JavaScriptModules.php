<?php

declare(strict_types=1);

return [
    'dependencies' => ['backend'],
    'tags' => [
        'backend.form',
    ],
    'imports' => [
        '@matero/consent-manager/tac-plugin.js' => 'EXT:matero_consent_manager/Resources/Public/JavaScript/Ckeditor/tac-plugin.js',
    ],
];
