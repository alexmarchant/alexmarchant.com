<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 */

return [
  // Global settings
  '*' => [
    // Default Week Start Day (0 = Sunday, 1 = Monday...)
    'defaultWeekStartDay' => 0,

    // Enable CSRF Protection (recommended, will be enabled by default in Craft 3)
    'enableCsrfProtection' => true,

    // Whether "index.php" should be visible in URLs
    'omitScriptNameInUrls' => true,

    // Control Panel trigger word
    'cpTrigger' => 'admin',

    // License key
    'securityKey' => getenv('CRAFT_SECURITY_KEY'),

    // Disallow control panel system modifications
    'allowUpdates' => false,
  ],

  // Dev environment settings
  'dev' => [
    // Base site URL
    'siteUrl' => 'http://alexmarchant.test',

    // Domain for imgix urls
    'imgixDomain' => 'photoism-dev.imgix.net',

    // S3 Bucket
    's3Bucket' => 'photoism-dev',

    // Dev Mode (see https://craftcms.com/support/dev-mode)
    'devMode' => true,
  ],

  // Production environment settings
  'production' => [
    // Base site URL
    'siteUrl' => 'https://www.alexmarchant.com',

    // Domain for imgix urls
    'imgixDomain' => 'photoism-production.imgix.net',

    // S3 Bucket
    's3Bucket' => 'photoism-production',
  ],
];
