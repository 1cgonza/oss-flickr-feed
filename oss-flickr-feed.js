(function($) {
  $(document).ready(function() {
    //The Widget can be used multiple times on the same page, so we iterate over each instance before doing anything.
    $('.oss-flickr-feed').each(function() {
      var thisFeed = $(this);
      var d = thisFeed.data();

      var widgetWidth = thisFeed.width();

      switch (d.feed) {
        case 'user':
          var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?id=" + encodeURIComponent(d.flickrid) + "&jsoncallback=?";
          break;
        case 'group':
          var flickerAPI = "http://api.flickr.com/services/feeds/groups_pool.gne?id=" + encodeURIComponent(d.flickrid) + "&jsoncallback=?";
          var flickrAPI  = 'https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=10e93e713dd6b58254bb75310e29f43b&group_id=2128661%40N24&format=json'
          break;
        case 'friends':
          var flickerAPI = "https://api.flickr.com/services/feeds/photos_friends.gne?user_id=" + encodeURIComponent(d.flickrid) + "&jsoncallback=?";
          break;
        case 'favorites':
          var flickerAPI = "https://api.flickr.com/services/feeds/photos_faves.gne?id=" + encodeURIComponent(d.flickrid) + "&jsoncallback=?";
          break;
        default:
          var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?id=" + encodeURIComponent(d.flickrid) + "&jsoncallback=?";
      }

      $.getJSON( flickerAPI, {
        format: "json"
      }).done(function( data ) {
        // ASSIGN LINK TO WIDGET TITLE
        $('.ossFlickrFeedTitle').attr('href', data.link);
        thisFeed.animate({height: widgetWidth / d.columns * d.rows + 'px'}, 500);// = widgetWidth / d.columns + d.rows + 'px';

        for (var i = 0; i < (d.columns * d.rows); i++) {
          var flickrItem = document.createElement( 'a' );
          flickrItem.href = data.items[i].link;
          flickrItem.target = '_blank';
          flickrItem.rel = 'nofollow';
          flickrItem.style.display = 'inline-block';
          flickrItem.style.lineHeight = '0';
          flickrItem.style.verticalAlign = 'top';
          flickrItem.style.width  = 100 / (d.columns / d.rows) + '%';
          flickrItem.img = document.createElement( 'img' );
          flickrItem.img.alt = data.items[i].title;
          flickrItem.img.src = data.items[i].media.m.replace(/_m\.jpg/, "_q.jpg");
          flickrItem.img.style.width = '100%';
          flickrItem.img.style.height = 'auto';
          flickrItem.appendChild(flickrItem.img);

          thisFeed.append(flickrItem);
        }

        thisFeed.children('.oss-flickr-loading').fadeOut( 'slow', function(){
          $(this).remove();
        });

      });
      // console.log(flickerAPI);
    }); // finish iterating over one instance of the widget
  });

/*----------------------------------------------

                     RESIZE

-----------------------------------------------*/

//OPTIMIZED RESIZE from: https://developer.mozilla.org/en-US/docs/Web/Events/resize
var optimizedResize = (function() {
  var callbacks = [],
  running = false;

  // fired on resize event
  function resize() {
    if (!running) {
      running = true;
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCallbacks);
      } else {
        setTimeout(runCallbacks, 66);
      }
    }
  }

  // run the actual callbacks
  function runCallbacks() {
    callbacks.forEach(function(callback) {
      callback();
    });
    running = false;
  }

  // adds callback to loop
  function addCallback(callback) {
    if (callback) {
      callbacks.push(callback);
    }
  }

  return {
    // initalize resize event listener
    init: function(callback) {
      window.addEventListener('resize', resize);
      addCallback(callback);
    },
     // public method to add additional callback
    add: function(callback) {
      addCallback(callback);
    }
  };
}());

// start process
optimizedResize.init(function() {
  $('.oss-flickr-feed').each(function(){
    var data        = $(this).data();
    var parentWidth = $(this).width();

    var newWidth    = parentWidth / data.columns;
    var newHeight   = (parentWidth / data.columns) * data.rows;

    $(this).height(newWidth * data.rows);

  });
});

})(jQuery);