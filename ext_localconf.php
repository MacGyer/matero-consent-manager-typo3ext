<?php

use Materodev\ConsentManager\Renderer\VimeoRenderer;
use Materodev\ConsentManager\Renderer\YoutubeRenderer;
use TYPO3\CMS\Core\Resource\Rendering\RendererRegistry;

defined('TYPO3') || die('Access denied.');

(function () {
    $vendor = 'Matero';
    $extKey = 'matero_consent_manager';

    $rendererRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(RendererRegistry::class);
    $rendererRegistry->registerRendererClass(YoutubeRenderer::class);
    $rendererRegistry->registerRendererClass(VimeoRenderer::class);
})();
