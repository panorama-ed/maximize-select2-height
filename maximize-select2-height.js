// maximize-select2-height
// (c) Panorama Education 2015
// MIT License

// This jQuery/Select2 plugin expands a Select2 dropdown to take up as much
// height as possible given its position on the page and the current viewport
// size.

// NOTE: The original <select> element that is $().select2()'d *must* have a
// unique ID for this code to work. (Ex: <select id="my-unique-id"></select>)

(function ($) {
  "use strict";

  // Call on a jQuery Select2 element to maximize the height of the dropdown
  // every time it is opened.
  // Options:
  //   - bottomMargin: The number of pixels between the bottom of the dropdown
  //                   and the bottom of the viewable window. [Default: 10]
  $.fn.maximizeSelect2Height = function (options) {
    var settings = $.extend({
      // Pixels between the bottom of the dropdown and the bottom of the window.
      bottomMargin: 10
    }, options);

    return this.each(function (_, el) {
      var id = el.id;

      // Each time the Select2 is opened, resize it to take up as much vertical
      // space as possible given its position and the current viewport size.
      $(el).on("select2:open", function () {
        var $select2Results = $("#select2-" + id + "-results");

        // Calculate the maximum height of the dropdown box.
        var maxHeight = window.innerHeight - // More accurate than
                                             // $(window).height().

                        // Compute the number of visible pixels above the
                        // dropdown element.
                        ($select2Results.offset().top - $(window).scrollTop()) -

                        // Leave a little cushion to prevent the dropdown from
                        // rendering off the edge of the viewport.
                        settings.bottomMargin;

        // Set the max height of the relevant DOM elements. We use max-height
        // instead of height directly to correctly handle cases in which there
        // are only a few elements and we don't want a giant empty dropdown box.
        $select2Results.parent().css("max-height", maxHeight);
        $select2Results.css("max-height", maxHeight);
      });
    });
  };
})(jQuery);
