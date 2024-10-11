define(['jquery'], function ($) {
    'use strict';
    return function (SwatchRenderer) {
        $.widget('mage.SwatchRenderer', $['mage']['SwatchRenderer'], {
            options: {
                mediaGalleryCustomSelector: '[data-gallery-role="gallery-placeholder-custom"]',
                mediaGalleryInitSelector: '.gallery-placeholder'
            },

            // Slick slider code
            initSlick: function (newGallery) {
                if ($(window).width() <= 768) { // Only initialize for mobile view
                    newGallery.slick({
                        dots: true,              // Show navigation dots
                        arrows: false,           // Disable navigation arrows
                        infinite: true,          // Infinite looping
                        speed: 500,              // Transition speed
                        slidesToShow: 1,         // Number of slides to show
                        slidesToScroll: 1
                    });
                } else {
                    if (newGallery.hasClass('slick-initialized')) {
                        newGallery.slick('unslick'); // Destroy the Slick slider for larger screens
                    }
                }
            },

            /**
             * Update [gallery-placeholder] or [product-image-photo]
             * @param {Array} images
             * @param {jQuery} context
             * @param {Boolean} isInProductView
             */
            updateBaseImage: function (images, context, isInProductView) {
                this._super(images, context, isInProductView);

                if (isInProductView) {
                    var newGallery = context.find(this.options.mediaGalleryCustomSelector),
                        initGallery = context.find(this.options.mediaGalleryInitSelector),
                        imagesToUpdate;
                    if (newGallery.hasClass('slick-initialized')) {
                        newGallery.slick('unslick');
                    }

                    newGallery.empty();
                    initGallery.hide()
                    imagesToUpdate = images.length ? this._setImageType($.extend(true, [], images)) : [];

                    $.each(imagesToUpdate, function(index, image) {
                        if(image.img) {
                            newGallery.append(
                                '<img alt="' + image.caption + '" class="gallery-image" src="' + image.img + '" width="700" height="700">'
                            );
                        } else {
                            initGallery.show()
                        }
                    });

                    this.initSlick(newGallery);
                }
            }
        });
        return $['mage']['SwatchRenderer'];
    };
});