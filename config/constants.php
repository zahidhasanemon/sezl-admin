<?php

return [
    'ACTIVE_STATUSES' => [1 => 'Active', 0 => 'Inactive'],
    'REMEMBER_TOKEN_EXPIRED' => env('REMEMBER_TOKEN_EXPIRED', 525600),
    'pagination_per_page' => env('PAGINATION_PER_PAGE', 20),
    'enable_https' => env('ENABLE_HTTPS', false),
    'otp_expire_after' => env('OTP_EXPIRE_AFTER', '10'),
    'app_url' => env('APP_URL', 'vuexy-admin.com'),
    'admin_url' => env('ADMIN_URL', 'vuexy-admin.com'),
    'contact_email' => env('CONTACT_EMAIL', 'contact@vuexy-admin.com'),
    'mail_from_email' => env('MAIL_FROM_ADDRESS', 'info@vuexy-admin.com'),
    'settings' => [
        'site_name' => 'site_name',
        'site_email' => 'site_email',
        'site_contact_numbers' => 'site_contact_numbers',
        'site_address' => 'site_address',
        'site_facebook_url' => 'site_facebook_url',
        'site_instagram_url' => 'site_instagram_url',
        'site_x_url' => 'site_x_url',
        'site_youtube_url' => 'site_youtube_url',
        'site_linkedin_url' => 'site_linkedin_url',
        'site_tiktok_url' => 'site_tiktok_url',
        'site_whatsapp_number' => 'site_whatsapp_number',
        'site_footer_content' => 'site_footer_content',
    ],
];
