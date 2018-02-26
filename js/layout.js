(function ($) {
    // Util Function
    String.prototype.toUpperCaseFirst = function () {
        return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase()
    };

    // On Dom Ready
    $(function () {
        (function () {
            var $nav = $('header nav');
            var $menus = $nav.find('a');
            var $sections = $('body>section');
            var $scrollTarget = $('html,body');
            var $button = $nav.find('button');
            var $menuWrap = $nav.find('.menu-wrap');
            var MIN_TIME = 300;

            function highlightMenu() {
                var middle = $(window).scrollTop() + $(window).innerHeight() / 2;

                var $target = null;
                var distance = Number.MAX_VALUE;

                $.each($sections, function () {
                    var $section = $(this);
                    var dist = Math.abs($section.offset().top + $section.height() / 2 - middle);

                    if (distance > dist) {
                        $target = $section;
                        distance = dist;
                    }
                });

                var name = $target.data('section');
                $menus.removeClass('active');
                $nav.find('a[data-target=' + name + ']').addClass('active');
            }

            $nav.on('focusin', function (e) {
                e.stopPropagation();
                $menuWrap.addClass('xs sm');
            });

            $(document).on('focusin', function () {
                $menuWrap.removeClass('xs sm');
            });

            // Highlight Menu
            $(window).on('scroll', highlightMenu);
            highlightMenu();

            $menus.on('click', function (e) {
                e.preventDefault();

                var section = $(this).attr('href').substring(1);
                var $section = $('a[name=' + section + ']');

                var pastTop = $scrollTarget.scrollTop();

                var top = $section.offset().top;
                var diff = Math.abs(pastTop - top);

                $scrollTarget.stop().animate({ scrollTop: top }, Math.min(diff, MIN_TIME), 'swing');

                return false;
            });
        })();

        // Banner
        (function () {
            var $main = $('section[data-section=main]');
            var $banner = $main.find('.banner');
            var $items = $banner.find('.items');
            var $wrapper = $items.find('.items-wrapper');

            var $prev = $banner.find('.prev');
            var $next = $banner.find('.next');

            var now = 0;

            function move(index) {
                var length = $wrapper.children().length;
                index = (index % length + length) % length;

                $items.scrollLeft(0);
                $wrapper.css('transform', 'perspective(1000px) translateX(' + index * -100 + '%)');

                now = index;
            }

            // Banner Control Button Events
            $prev.on('click', function () {
                move(now - 1);
            });

            $next.on('click', function () {
                move(now + 1);
            });
        })();

    });
})(jQuery);