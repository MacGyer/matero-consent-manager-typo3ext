<?php

namespace Materodev\ConsentManager\Renderer;

use TYPO3\CMS\Core\Resource\FileInterface;
use TYPO3\CMS\Core\Utility\ArrayUtility;

class VimeoRenderer extends \TYPO3\CMS\Core\Resource\Rendering\VimeoRenderer
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
            'class' => 'vimeo_extended_player videoPlayer',
            'videoID' => $videoId,
            'autoplay' => ArrayUtility::getValueByPath($options, 'autoplay'),
            'allow' => 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; playsinline; fullscreen'
        ];
        if ((int)$width > 0) {
            $attributes['data-width'] = (int)$width;
        }
        if ((int)$height > 0) {
            $attributes['data-height'] = (int)$height;
        }

        return sprintf(
            '<div %s></div>',
            $this->implodeAttributes($attributes)
        );
    }
}
