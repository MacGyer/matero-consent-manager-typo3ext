<?php
defined('TYPO3') or die('Access denied.');

(function () {
    $vendor = 'Matero';
    $extKey = 'matero_consent_manager';

    // TypoScript
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($extKey, 'Configuration/TypoScript', 'Matero Consent Manager');
})();
