<?php

return [
  'media' => [
    'hasUrls' => true,
    'url' => 'https://s3.amazonaws.com/'.getenv('S3_BUCKET').'/',
    'keyId' => getenv('S3_API_KEY'),
    'secret' => getenv('S3_SECRET'),
    'bucket' => getenv('S3_BUCKET'),
    'region' => getenv('S3_REGION'),
  ],
];
