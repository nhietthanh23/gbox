// load
$(window).on('load', function () {
    $('.loading-screen').slideUp(800);
});
//
//navigation
$('.jumbotron').paroller();

$('.hambeger').click(function () {
    $('.list_menu').toggleClass('active');
    $('.home').toggleClass('active');
    $('.hambeger').toggleClass('active');
    $('main').toggleClass('active');
});

//BackToTop
$('.backtotop').click(function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//photo
var initPhotoSwipeFromDOM = function (gallerySelector) {
    var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for (var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if (figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if (figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML;
            }
            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    var onThumbnailsClick = function (e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function (el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if (!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }
            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if (index >= 0) {
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };
    var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
            params = {};
        if (hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }
        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function (index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {
                    x: rect.left,
                    y: rect.top + pageYScroll,
                    w: rect.width
                };
            },
            showAnimationDuration: 0,
            hideAnimationDuration: 0
        };
        if (fromURL) {
            if (options.galleryPIDs) {
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if (isNaN(options.index)) {
            return;
        }
        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};

$(window).load(function () {
    initPhotoSwipeFromDOM('.carousel-img');
    initPhotoSwipeFromDOM('.section2_img');
    initPhotoSwipeFromDOM('.studio_img');
});



$('.studio_img').flickity({
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    lazyLoad: true,
    draggable: false,
    imagesLoaded: true,
    selectedAttraction: 0.01,
    friction: 0.2,
    lazyLoad: 1,
    fullscreen: true,
     on: {
         change: function (index) {
             let number = $('.number b');
             let indexPage = index + 1;
             number.text(indexPage.toString().padStart(2, 0))
         }
     }
});

$('.control .next').on('click', function () {
    $('.studio_img').flickity('next', true);
});
$('.control .prev').on('click', function () {
    $('.studio_img').flickity('previous');
});

$('.control_studio-detail .next').on('click', function () {
    $('.studio_img').flickity('next', true);
});
$('.control_studio-detail .prev').on('click', function () {
    $('.studio_img').flickity('previous');
});

// 
$('.carousel_cafegbox').flickity({
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    draggable: false,
    // imagesLoaded: true,
    // selectedAttraction: 0.01,
    // friction: 0.2,
    // lazyLoad: 1,
})

$('.btn_control .next').on('click', function () {
    $('.carousel_cafegbox').flickity('next', true);
});
$('.btn_control .prev').on('click', function () {
    $('.carousel_cafegbox').flickity('previous');
});

// 
new WOW().init();

// scroll
let $logo = document.querySelector(".logo")
let $header = document.querySelector("header")

window.addEventListener("scroll", function () {

    let scrollTop = document.querySelector('html').scrollTop;
    if (scrollTop > 70) {

        $('.header').addClass('active');
        $('.logo-scroll').addClass('active');
        $('.logo-scroll a').slideDown();
    } else {
        $('.header').removeClass('active');
        $('.logo-scroll').removeClass('active');
        $('.logo-scroll a').slideUp();
    }

});

// 
// MENU SCROLL
let prevScroll = $('html').scrollTop();

$(document).scroll(function () {
    if (prevScroll < window.pageYOffset) {
        $('.navigation').css({
            top: -$('.navigation').height(),
            transition: 'all 0.4s'
        });
    } else {
        $('.navigation').css({
            top: 0,
            transition: 'all 0.4s',
        });
    }
    prevScroll = window.pageYOffset;
});

// 

$('.view-fullscreen-button').on('click', function () {
    $('.studio_img').flickity('viewFullscreen');
});