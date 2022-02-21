var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
});

$('.autoExpand').each(function () {
    this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
}).on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
    this.style.minHeight = '100px';
    this.style.maxHeight = '350px';
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});


 
// Active navbar on scroll
$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll <= 80) {
        $("nav.navbar").removeClass("nav-active");
    } else {
        $("nav.navbar").addClass("nav-active");
    }
});

 
    
$(window).on('load', function () {
    if ($('.wrap').length) {
        $('.wrap').delay(100).fadeOut('slow', function () {
            $(this).remove();
            $('.hero_section').addClass("bg-active");
        });
    }
});

// active header for other pages
if (!$(".hero-section").length) {
    $('nav.navbar').addClass('always-nav-active');
};


$(document).ready(function () {
    $('.venobox').venobox();
});

$(document).ready(function () {
    $('.navbar-toggler').on('click', function () {
        $('body').toggleClass('navbar-show');
    })
});
// // Lazy Load Images
// document.addEventListener("DOMContentLoaded", function () {
//     let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
//     let active = false;

//     const lazyLoad = function () {
//         if (active === false) {
//             active = true;

//             setTimeout(function () {
//                 lazyImages.forEach(function (lazyImage) {
//                     if (
//                         lazyImage.getBoundingClientRect().top <= window.innerHeight &&
//                         lazyImage.getBoundingClientRect().bottom >= 0 &&
//                         getComputedStyle(lazyImage).display !== "none"
//                     ) {
//                         lazyImage.src = lazyImage.dataset.src;
//                         lazyImage.srcset = lazyImage.dataset.srcset;
//                         lazyImage.classList.remove("lazy");

//                         lazyImages = lazyImages.filter(function (image) {
//                             return image !== lazyImage;
//                         });

//                         if (lazyImages.length === 0) {
//                             document.removeEventListener("scroll", lazyLoad);
//                             window.removeEventListener("resize", lazyLoad);
//                             window.removeEventListener("orientationchange", lazyLoad);
//                         }
//                     }
//                 });

//                 active = false;
//             }, 200);
//         }
//     };

//     document.addEventListener("scroll", lazyLoad);
//     window.addEventListener("resize", lazyLoad);
//     window.addEventListener("orientationchange", lazyLoad);
// });


// $(document).ready(function () {
//     window.scrollBy(0, 1);
// });
 
AOS.init();


// $('.mainMenu').on('click', function () {
//     $('.subMenu').toggleClass('submenus_show');
//     $(this).addClass('submenus_show-active');
// });

// $('.mainMenu').on('click', function(){
//     $(this).next().addClass('submenus_show');
//     $('.subMenu').removeClass('submenus_show'); 
// });
// $('.mainMenu').on('click', function(){
//     $('.subMenu').toggleClass('submenus_show'); 
// })