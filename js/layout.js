(function ($) {
    // Util Function
    String.prototype.toUpperCaseFirst = function () {
        return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase()
    };

    // Loading
    (function () {
        var section = location.hash.substring(1);
        if (!section) return;

        document.title = 'IGRUS - ' + section.toUpperCaseFirst();
    })();

    // On Dom Ready
    $(function () {

        // Menu Click Events
        (function () {
            var $scrollTarget = $('html, body');
            var $nav = $('header nav');
            var MIN_TIME = 300;

            $nav.find('>a').on('click', function (e) {
                e.preventDefault();

                var section = $(this).attr('href').substring(1);
                var $section = $('a[name=' + section + ']');

                var pastTop = $scrollTarget.scrollTop();

                var top = $section.offset().top;
                var diff = Math.abs(pastTop - top);

                $scrollTarget.animate({ scrollTop: top }, Math.min(diff, MIN_TIME), 'swing');

                var title = 'IGRUS - ' + section.toUpperCaseFirst();
                history.pushState({ section: section }, title, '#' + section);
                document.title = title;

                return false;
            });
        })();

        // Banner
        (function () {
            var $banner = $('section.main .banner');
            var $items = $banner.find('.items');
            var $wrapper = $items.find('.items-wrapper');

            var $prev = $banner.find('.prev');
            var $next = $banner.find('.next');

            var now = 0;

            function move(index) {
                if (index < 0) return;
                if (index >= $wrapper.children().length) return;

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

            // Banner Link Focus
            $wrapper.on('focus', 'a', function () {
                var index = $(this).index();
                move(index);
            });
        })();

    });
})(jQuery);