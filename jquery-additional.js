/*! jquery-additional.js
 *
 * Authored by: Cory Dorning & Brett Metzger
 *
 * Dependencies: jQuery v1.8+
 *
 * Last modified by: Cory Dorning & Brett Metzger
 * Last modified on: 02/03/2014
 *
 * The additional plugin allows you to hide extra content and display
 * it by clicking an anchor.  You can set the event type, the anchors
 * target, and show how many you want visible through the data attribute.
 *
 */

// include semicolon to make sure any JS before this plugin is terminated
;(function($) {
  // ECMAScript 5 strict mode
  "use strict";

  // begin plugin - change 'boilerplate' to name of your plugin
  $.fn.additional = function(options) {

        // set any defaults
    var defaults = {
          ev: 'click',  // sets the default event type to click
          target: null,  // sets the default target to null, must be set at init
          visible: 1
        },

        // overwrite 'defaults' with those passed via 'options'
        settings = $.extend(defaults, options),

        // original jQuery object
        $sel = this;


    /* loop context
     * =============
     * - return added to maintain jQuery chainability
     * - add needed for functionality within the loop
     *   for each individual instance of your jQuery object
     *
     */
    return $sel.each(function() {
          // current, single instance of $sel
      var $this = $(this),

          // get targets
          $targets = $($this.data('target') || settings.target),

          // get the number of elements to make visible
          visible = $.isNumeric($this.data('visible')) ? $this.data('visible') : settings.visible,

          showTarget = function(e) {
            $targets.eq(visible++).show();

            // removing delegated plugin event handler
            if(visible === $targets.length){
              $this.off(settings.event, showTarget);

              $this.remove();
            }

            e.preventDefault();
          };

      // hide additional content
      for( var i = visible, len = $targets.length; i < len; i++ ){
        $targets.eq(i).hide();
      }

      // create event handler for each $this
      $this.on(settings.ev, showTarget);

    });

  };
})(jQuery);
// end additional