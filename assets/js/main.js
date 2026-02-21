/**
* Template Name: iPortfolio - v1.2.1
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Hero typed
  if ($('.typed').length) {
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        // Close mobile menu when clicking nav links
        if ($('.nav-menu').hasClass('active')) {
          $('.nav-menu').removeClass('active');
          $('.mobile-nav-toggle i').removeClass('bx-x').addClass('bx-menu');
          $('body').css('overflow', '');
        }

        return false;
      }
    }
  });

  // Mobile Navigation Toggle - Updated for new horizontal navbar
  $(document).on('click', '.mobile-nav-toggle', function(e) {
    e.preventDefault();
    $('.nav-menu').toggleClass('active');
    
    var icon = $(this).find('i');
    if ($('.nav-menu').hasClass('active')) {
      icon.removeClass('bx-menu icofont-navigation-menu').addClass('bx-x');
      $('body').css('overflow', 'hidden');
    } else {
      icon.removeClass('bx-x icofont-close').addClass('bx-menu');
      $('body').css('overflow', '');
    }
  });

  // Close mobile menu when clicking outside
  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    var navMenu = $(".nav-menu");
    
    if (!container.is(e.target) && container.has(e.target).length === 0 && 
        !navMenu.is(e.target) && navMenu.has(e.target).length === 0) {
      if ($('.nav-menu').hasClass('active')) {
        $('.nav-menu').removeClass('active');
        $('.mobile-nav-toggle i').removeClass('bx-x icofont-close').addClass('bx-menu');
        $('body').css('overflow', '');
      }
    }
  });

  // Add scrolled class to header on scroll
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 50) {
      $('#header').addClass('scrolled');
    } else {
      $('#header').removeClass('scrolled');
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 100;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 200) {
        $(".nav-menu li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Portfolio/Gallery isotope and filter
  $(window).on('load', function() {
    // Initialize Gallery Isotope
    var galleryIsotope = $('.gallery-container').isotope({
      itemSelector: '.gallery-item',
      layoutMode: 'fitRows'
    });

    // Gallery filter clicks
    $('#gallery-filters li').on('click', function() {
      $("#gallery-filters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      galleryIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

    // Portfolio isotope
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

    // Initiate venobox (lightbox feature used in gallery)
    $(document).ready(function() {
      $('.venobox').venobox({
        share: false
      });
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  AOS.init({
    duration: 1000,
    easing: "ease-in-out-back"
  });

})(jQuery);

// Video Modal Functionality - OUTSIDE jQuery wrapper
document.addEventListener('DOMContentLoaded', function() {
  const videoModal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  const closeModal = document.querySelector('.video-modal-close');
  const videoThumbnails = document.querySelectorAll('.video-thumbnail');

  // Check if elements exist
  if (!videoModal || !videoFrame || !closeModal) {
    console.log('Video modal elements not found');
    return;
  }

  // Open video modal when clicking on video thumbnail
  videoThumbnails.forEach(function(thumbnail) {
    thumbnail.addEventListener('click', function(e) {
      e.preventDefault();
      const videoId = this.getAttribute('data-video-id');
      
      if (!videoId) {
        console.log('Video ID not found');
        return;
      }

      // Create embed URL
      const embedUrl = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';
      
      console.log('Opening video:', videoId);
      
      videoFrame.setAttribute('src', embedUrl);
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal when clicking X button
  closeModal.addEventListener('click', function() {
    closeVideo();
  });

  // Close modal when clicking outside
  videoModal.addEventListener('click', function(e) {
    if (e.target === videoModal) {
      closeVideo();
    }
  });

  // Close modal on ESC key
  document.addEventListener('keyup', function(e) {
    if (e.key === "Escape" && videoModal.classList.contains('active')) {
      closeVideo();
    }
  });

  // Function to close and stop video
  function closeVideo() {
    videoModal.classList.remove('active');
    videoFrame.setAttribute('src', ''); // This stops the video
    document.body.style.overflow = '';
    console.log('Video closed');
  }
});