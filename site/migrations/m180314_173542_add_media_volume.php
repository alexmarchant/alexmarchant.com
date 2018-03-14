<?php

namespace craft\contentmigrations;

use Craft;
use craft\db\Migration;

/**
 * m180314_173542_add_media_volume migration.
 */
class m180314_173542_add_media_volume extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $volume = Craft::$app->getVolumes()->createVolume([
            'name' => 'Media',
            'handle' => 'media',
            'type' => \craft\awss3\Volume::class,
        ]);
        $success = Craft::$app->getVolumes()->saveVolume($volume);
        return $success;
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        echo "m180314_173542_add_media_volume cannot be reverted.\n";
        return false;
    }
}
