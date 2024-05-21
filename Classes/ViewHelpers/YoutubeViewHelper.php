<?php

namespace Materodev\ConsentManager\ViewHelpers;

use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\FileInterface;
use TYPO3\CMS\Core\Resource\FileReference;
use TYPO3\CMS\Core\Resource\OnlineMedia\Helpers\OnlineMediaHelperInterface;
use TYPO3\CMS\Core\Resource\OnlineMedia\Helpers\OnlineMediaHelperRegistry;
use TYPO3\CMS\Extbase\Domain\Model\AbstractFileFolder;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractTagBasedViewHelper;

/**
 * Class YoutubeViewHelper
 * @package Materodev\ConsentManager\ViewHelpers
 */
class YoutubeViewHelper extends AbstractTagBasedViewHelper
{
    /**
     * @var OnlineMediaHelperInterface
     */
    protected $onlineMediaHelper;

    public function initializeArguments()
    {
        parent::initializeArguments();
    }

    public function canRender(FileInterface $file)
    {
        return ($file->getMimeType() === 'video/youtube' || $file->getExtension() === 'youtube') && $this->getOnlineMediaHelper($file) !== false;
    }

    /**
     * Get online media helper
     *
     * @param FileInterface $file
     * @return bool|OnlineMediaHelperInterface
     */
    protected function getOnlineMediaHelper(FileInterface $file)
    {
        if ($this->onlineMediaHelper === null) {
            $orgFile = $file;
            if ($orgFile instanceof FileReference) {
                $orgFile = $orgFile->getOriginalFile();
            }
            if ($orgFile instanceof File) {
                $this->onlineMediaHelper = OnlineMediaHelperRegistry::getInstance()->getOnlineMediaHelper($orgFile);
            } else {
                $this->onlineMediaHelper = false;
            }
        }
        return $this->onlineMediaHelper;
    }

    /**
     * @param FileInterface|AbstractFileFolder $file
     */
    public function render($file)
    {
        if ($file instanceof FileReference) {
            $orgFile = $file->getOriginalFile();
        } else {
            $orgFile = $file;
        }

        if ($this->canRender($file)) {
            $videoId = $this->getOnlineMediaHelper($file)->getOnlineMediaId($orgFile);
        }

        $attributes = [
            'class="youtube_player"',
            'width="100%"',
            'height="100%"',
            'videoId="' . $videoId . '"',
            'rel="0"',
            'showinfo="0"',
            'autoplay="0"',
            'loop="0"',
            'controls="1"',
        ];

        return sprintf(
            '<div %s></div>',
            implode(' ', $attributes)
        );
    }
}