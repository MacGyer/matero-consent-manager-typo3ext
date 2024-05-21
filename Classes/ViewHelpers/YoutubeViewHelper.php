<?php

namespace Materodev\ConsentManager\ViewHelpers;

use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\FileInterface;
use TYPO3\CMS\Core\Resource\FileReference;
use TYPO3\CMS\Core\Resource\OnlineMedia\Helpers\OnlineMediaHelperInterface;
use TYPO3\CMS\Core\Resource\OnlineMedia\Helpers\OnlineMediaHelperRegistry;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

class YoutubeViewHelper extends AbstractViewHelper
{
    protected ?OnlineMediaHelperInterface $onlineMediaHelper = null;

    public function initializeArguments(): void
    {
        $this->registerArgument('file', FileInterface::class, 'The file to be rendered', escape: false);
    }

    public function canRender(FileInterface $file): bool
    {
        return ($file->getMimeType() === 'video/youtube' || $file->getExtension() === 'youtube') && $this->getOnlineMediaHelper($file) !== null;
    }

    protected function getOnlineMediaHelper(FileInterface $file): ?OnlineMediaHelperInterface
    {
        if ($this->onlineMediaHelper === null) {
            $orgFile = $file;
            if ($orgFile instanceof FileReference) {
                $orgFile = $orgFile->getOriginalFile();
            }

            if ($orgFile instanceof File) {
                /** @var OnlineMediaHelperRegistry $registry */
                $registry = GeneralUtility::makeInstance(OnlineMediaHelperRegistry::class);
                $this->onlineMediaHelper = $registry->getOnlineMediaHelper($orgFile);
            }

            if (false === $this->onlineMediaHelper) {
                $this->onlineMediaHelper = null;
            }
        }
        return $this->onlineMediaHelper;
    }

    public function render(): string
    {
        $file = $this->arguments['file'] ?? $this->renderChildren();

        if (!$file || !$file instanceof FileInterface) {
            throw new \InvalidArgumentException('No file provided or must be of type ' . FileInterface::class);
        }

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