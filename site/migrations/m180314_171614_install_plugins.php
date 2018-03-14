<?php

namespace craft\contentmigrations;

use Craft;
use craft\db\Migration;

/**
 * m180314_171614_install_plugins migration.
 */
class m180314_171614_install_plugins extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
		if (!Craft::$app->getPlugins()->installPlugin('aws-s3')) {
            return false;
        };
		if (!Craft::$app->getPlugins()->installPlugin('redactor')) {
            return false;
        };
		if (!Craft::$app->getPlugins()->installPlugin('element-api')) {
            return false;
        };
        return true;
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        echo "m180314_171614_install_plugins cannot be reverted.\n";
        return false;
    }
}
