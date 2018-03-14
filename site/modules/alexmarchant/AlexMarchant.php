<?php

namespace modules\alexmarchant;

use modules\alexmarchant\twigextensions\AlexMarchantTwigExtensions;

use Craft;

use yii\base\Module;

class AlexMarchant extends Module
{
    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        // Register twig extensions
        Craft::$app
            ->view
            ->twig
            ->addExtension(new AlexMarchantTwigExtensions());
    }
}

