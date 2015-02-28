(function($) {
    //The Widget can be used multiple times on the same page, so we iterate over each instance before doing anything.
    $('.ossFlickrFeed').each(function() {
    var thisFeed    = $(this);
    var d           = thisFeed.data();
    var widgetWidth = thisFeed.width();
    var flickrAPI   = '';

    switch (d.feed) {
      case 'user':
        flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?id=" + encodeURIComponent(d.flickrid) + "&jsoncallback=?";
        break;
      case 'group':
        flickrAPI = "http://api.flickr.com/services/feeds/groups_pool.gne?id=" + encodeURIComponent(d.flickrid) + "&jsoncallback=?";
        break;
      case 'friends':
        flickrAPI = "https://api.flickr.com/services/feeds/photos_friends.gne?user_id=" + encodeURIComponent(d.flickrid) + "&jsoncallback=?";
        break;
      case 'favorites':
        flickrAPI = "https://api.flickr.com/services/feeds/photos_faves.gne?id=" + encodeURIComponent(d.flickrid) + "&jsoncallback=?";
        break;
      default:
        flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?id=" + encodeURIComponent(d.flickrid) + "&jsoncallback=?";
    }

    $.getJSON( flickrAPI, {
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
    // console.log(flickrAPI);
  }); // finish iterating over one instance of the widget

  /*-----  End of OSS FLICKR FEED  ------*/

  function resize() {
    $('.ossFlickrFeed').each(function() {
      var data        = $(this).data();
      var parentWidth = $(this).width();

      var newWidth    = parentWidth / data.columns;
      var newHeight   = (parentWidth / data.columns) * data.rows;

      $(this).height(newWidth * data.rows);

    });
  }

  window.onresize = resize;

})(jQuery);