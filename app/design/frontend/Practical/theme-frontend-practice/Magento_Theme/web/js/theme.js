/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'mage/smart-keyboard-handler',
    'mage/mage',
    'domReady!'
], function ($, keyboardHandler) {
    'use strict';

    $('.cart-summary').mage('sticky', {
        container: '#maincontent'
    });

    $('.product-info-main').mage('sticky', {
        container: '.product-media-information'
    });

    $('.product.info.detailed').mage('sticky', {
        container: '.product-media-information'
    });

    $('.product-social-links').mage('sticky', {
        container: '.product.media'
    });

    $('.panel.header > .header.links').clone().appendTo('#store\\.links');
    $('#store\\.links li a').each(function () {
        var id = $(this).attr('id');

        if (id !== undefined) {
            $(this).attr('id', id + '_mobile');
        }
    });
    keyboardHandler.apply();
});
