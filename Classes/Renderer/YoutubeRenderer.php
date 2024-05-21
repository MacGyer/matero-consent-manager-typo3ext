<?php

namespace Materodev\ConsentManager\Renderer;

use TYPO3\CMS\Core\Resource\FileInterface;
use TYPO3\CMS\Core\Utility\ArrayUtility;

class YoutubeRenderer extends \TYPO3\CMS\Core\Resource\Rendering\YouTubeRenderer
{
    public function getPriority(): int
    {
        return 100;
    }

    public function render(FileInterface $file, $width, $height, array $options = []): string
    {
        $options = $this->collectOptions($options, $file);
        $videoId = $this->getVideoIdFromFile($file);

        $attributes = [
            'class' => 'youtube_extended_player videoPlayer',
            'videoID' => $videoId,
            'rel' => 0,
            'controls' => ArrayUtility::getValueByPath($options, 'controls'),
            'showinfo' => 1,
            'loop' => 0,
            'autoplay' => ArrayUtility::getValueByPath($options, 'autoplay'),
            'allow' => 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; playsinline; fullscreen'
        ];

        if ((int)$width > 0) {
            $attributes['width'] = (int)$width;
        }
        if ((int)$height > 0) {
            $attributes['height'] = (int)$height;
        }

        return sprintf(
            '<div %s></div>',
            $this->implodeAttributes($attributes)
        );
    }
}
