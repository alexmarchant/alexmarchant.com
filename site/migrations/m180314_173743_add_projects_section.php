<?php

namespace craft\contentmigrations;

use Craft;
use craft\db\Migration;
use craft\models\Section;
use craft\models\Section_SiteSettings;

/**
 * m180314_173743_add_projects_section migration.
 */
class m180314_173743_add_projects_section extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $siteId = Craft::$app->sites->getPrimarySite()->id;
        $settings = [new Section_SiteSettings([
            'siteId' => $siteId,
            'hasUrls' => true,
            'uriFormat' => 'projects/{slug}',
            'template' => 'projects/_entry',
        ])];
        $section = new Section([
            'name' => 'Projects',
            'handle' => 'projects',
            'type' => 'channel',
        ]);
        $section->setSiteSettings($settings);
        $success = Craft::$app->sections->saveSection($section);
        return $success;
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        echo "m180314_173743_add_projects_section cannot be reverted.\n";
        return false;
    }
}
