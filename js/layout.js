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

    $(function () {
        // Menu Click Events
        (function () {
            var $scrollTarget = $('html, body');
            var $nav = $('header nav');

            $nav.find('>a').on('click', function (e) {
                e.preventDefault();

                var section = $(this).attr('href').substring(1);
                var $target = $('a[name=' + section + ']');

                var pastTop = $scrollTarget.scrollTop();

                var top = $target.offset().top;
                var diff = Math.abs(pastTop - top);

                var MIN_TIME = 300;

                $scrollTarget.animate({ scrollTop: top }, Math.min(diff, MIN_TIME), 'swing');

                var title = 'IGRUS - ' + section.toUpperCaseFirst();
                history.pushState({ section: section }, title, '#' + section);
                document.title = title;

                return false;
            });
        })();
    });
})(jQuery);