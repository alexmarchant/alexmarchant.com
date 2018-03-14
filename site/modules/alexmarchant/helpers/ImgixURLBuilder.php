<?php

namespace modules\alexmarchant\helpers;

use Craft;

class ImgixURLBuilder
{
    // Static Methods
    // =========================================================================

    /**
     * Generates the imgix url for the asset
     *
     * @param Asset      $asset  The asset to make a url for
     * @param array|null $params Params to apply to the url
     *
     * @return string
     */
    public static function createURL($assetURL, $params): string
    {
        $imgixDomain = Craft::$app->getConfig()->getGeneral()->imgixDomain;
        $s3Bucket = Craft::$app->getConfig()->getGeneral()->s3Bucket;
        $builder = new \Imgix\UrlBuilder($imgixDomain);
        if (!Craft::$app->getConfig()->getGeneral()->devMode) {
            $builder->setUseHttps(true);
        }
        $assetUrl = parse_url($assetURL);
        $assetPath = $assetUrl['path'];
        $assetPath = str_replace($s3Bucket.'/', '', $assetPath);
        return $builder->createURL($assetPath, $params);
    }
}
