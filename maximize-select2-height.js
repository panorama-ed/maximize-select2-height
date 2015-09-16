// maximize-select2-height v1.0.0
// (c) Panorama Education 2015
// MIT License

// This jQuery/Select2 plugin expands a Select2 dropdown to take up as much
// height as possible given its position on the page and the current viewport
// size. The plugin correctly handles:
//   - Dynamic window resizing.
//   - The effects of scroll bars on the viewport.
//   - Select2 rendering dropdowns both upwards and downwards.

// NOTE: The original <select> element that is $().select2()'d *must* have a
// unique ID for this code to work. (Ex: <select id="my-unique-id"></select>)

(function ($) {
  "use strict";

  // We can find these elements now, since the properties we check on them are
  // all via methods that are recalculated each time.
  var $window = $(window);
  var $document = $(document);

  // @param {jQuery object} $select2Results The DOM element with class
  //   "select2-results"
  // @return {Number} the number of pixels in the document above the results DOM
  //   element
  var topOffset = function ($select2Results) {
    // Choose an offset key that is unlikely to collide with other jQuery data
    // keys.
    var OFFSET_KEY = "maximizeSelect2HeightTopOffset";

    // We only want to calculate the vertical offset of the DOM element once,
    // both to be more efficient and because when the dropdown is rendered
    // upward we are changing its offset the first time we adjust its height.
    if (typeof $select2Results.data(OFFSET_KEY) === "undefined") {
      $select2Results.data(OFFSET_KEY, $select2Results.offset().top);
    }

    return $select2Results.data(OFFSET_KEY);
  };

  // @param {Object} options The options object passed in when this plugin is
  //   initialized
  // @param {Boolean} dropdownDownwards True iff the dropdown is rendered
  //   downwards (Select2 sometimes renders the options upwards to better fit on
  //   a page)
  // @return {Object} The options passed in, combined with defaults. Keys are:
  //   - cushion: The number of pixels between the edge of the dropdown and the
  //              edge of the viewable window. [Default: 10, except when a
  //              horizontal scroll bar would interfere, in which case it's 30.]
  //              NOTE: If a value is passed in, no adjustments for possible
  //              scroll bars are made.
  var settings = function (options, dropdownDownwards) {
    return $.extend({
      cushion: (
        dropdownDownwards && $document.width() > $window.width()
      ) ? 30 : 10
    }, options);
  };

  // @param {jQuery object} $select2Results The DOM element with class
  //   "select2-results"
  // @param {Object} options The options object passed in when this plugin is
  //   initialized
  // @param {Boolean} dropdownDownwards True iff the dropdown is rendered
  //   downwards (Select2 sometimes renders the options upwards to better fit on
  //   a page)
  // @return {Number} the maximum height of the Select2 results box to display
  var computeMaxHeight = function (
    $select2Results, options, dropdownDownwards
  ) {
    var height;
    var pixelsAboveDropdown = topOffset($select2Results) - $window.scrollTop();

    if (dropdownDownwards) {
      // innerHeight is more accurate across browsers than $(window).height().
      height = window.innerHeight - pixelsAboveDropdown;
    } else {
      height = pixelsAboveDropdown;
    }

    // Leave a little cushion to prevent the dropdown from
    // rendering off the edge of the viewport.
    return height - settings(options, dropdownDownwards).cushion;
  };

  // Call on a jQuery Select2 element to maximize the height of the dropdown
  // every time it is opened.
  // @param {Object} options The options object passed in when this plugin is
  //   initialized
  $.fn.maximizeSelect2Height = function (options) {
    return this.each(function (_, el) {
      // Each time the Select2 is opened, resize it to take up as much vertical
      // space as possible given its position and the current viewport size.
      $(el).on("select2:open", function () {
        var $select2Results = $("#select2-" + el.id + "-results");
        var $parent = $select2Results.parent();
        var dropdownDownwards = $parent.parent()
                                .hasClass("select2-dropdown--below");
        var maxHeight = computeMaxHeight(
          $select2Results,
          options,
          dropdownDownwards
        );

        // Set the max height of the relevant DOM elements. We use max-height
        // instead of height directly to correctly handle cases in which there
        // are only a few elements (we don't want a giant empty dropdown box).
        $parent.css("max-height", maxHeight);
        $select2Results.css("max-height", maxHeight);
      });
    });
  };
})(jQuery);
