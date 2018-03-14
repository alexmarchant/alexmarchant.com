<?php

namespace modules\alexmarchant\twigextensions;

use modules\alexmarchant\helpers\ImgixURLBuilder;

use Craft;
use craft\helpers\UrlHelper;
use craft\helpers\Json;

class AlexMarchantTwigExtensions extends \Twig_Extension
{
    // Public Methods
    // =========================================================================

    public function getName(): string
    {
        return 'AlexMarchant';
    }

    public function getFunctions(): array
    {
        return [
            new \Twig_SimpleFunction('assetPath', [$this, 'resolveAssetPath']),
            new \Twig_SimpleFunction('imgixURL', [$this, 'imgixURL']),
        ];
    }

    public function resolveAssetPath($pathname): string
    {
        if (Craft::$app->getConfig()->getGeneral()->devMode) {
            $baseUrl = 'http://localhost:8080/web/assets/';
            $resolvedPath = $pathname;
        } else {
            $baseUrl = UrlHelper::siteUrl().'assets/';
            $manifest = $this->_getManifest();

            // If not found in manifest fall back to original pathname
            if (array_key_exists($pathname, $manifest)) {
                $resolvedPath = $manifest[$pathname];
            } else {
                $resolvedPath = $pathname;
            }
        }

        return $baseUrl.$resolvedPath;
    }

    public function imgixURL($assetURL, $params): string
    {
        return ImgixURLBuilder::createURL($assetURL, $params);
    }

    public function getAllCookies($request)
    {
        $cookie = $request->headers->get('COOKIE');
        $cookieArray = $this->_parseCookie($cookie);
        return $cookieArray;
    }

    // Private Methods
    // =========================================================================

    private function _getManifest(): array
    {
        $manifest_path = CRAFT_BASE_PATH.'/web/assets/manifest.json';
        $manifest_content = file_get_contents($manifest_path);
        return Json::decode($manifest_content, true);
    }
}

