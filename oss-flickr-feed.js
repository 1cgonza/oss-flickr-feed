(function($) {
  $(document).ready(function() {
    //The Widget can be used multiple times on the same page, so we iterate over each instance before doing anything.
    $('.ossFlickrFeed').each(function() {
      var thisFeed = $(this);
      var d = thisFeed.data();

      var widgetWidth = thisFeed.width();

      switch (d.feed) {
        case 'user':
          var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?id=" + encodeURIComponent(d.flickrid) + "&jsoncallback=?";
          break;
        case 'group':
          var flickerAPI = "http://api.flickr.com/services/feeds/groups_pool.gne?id=" + encodeURIComponent(d.flickrid) + "&jsoncallback=?";
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

        $.each( data.items, function( i, item ) {
          var flickrItem = document.createElement( 'a' );
          flickrItem.href = item.link;
          flickrItem.target = '_blank';
          flickrItem.rel = 'nofollow';
          flickrItem.style.display = 'inline-block';
          flickrItem.style.lineHeight = '0';
          flickrItem.style.verticalAlign = 'top';
          flickrItem.style.width = widgetWidth / d.columns + 'px';
          flickrItem.style.height = widgetWidth / d.columns + 'px';
          flickrItem.img = document.createElement( 'img' );
          flickrItem.img.alt = item.title;
          flickrItem.img.src = item.media.m.replace(/_m\.jpg/, "_q.jpg");
          flickrItem.img.style.width = '100%';
          flickrItem.img.style.height = 'auto';
          flickrItem.appendChild(flickrItem.img);

          thisFeed.append(flickrItem);
        });

        thisFeed.children('.oss-flickr-loading').fadeOut( 'slow', function(){
          $(this).remove();
        });

      });
      console.log(flickerAPI);
    }); // finish iterating over one instance of the widget
  });

  $(window).resize(function(){
    $('.ossFlickrFeed').each(function(){
      var data        = $(this).data();
      var parentWidth = $(this).width();
      var newWidth    = parentWidth / data.columns;
      var newHeight   = (parentWidth / data.columns) * data.rows;

      $(this).children('a').width(newWidth);
      $(this).children('a').height(newWidth);
      $(this).height(newWidth * data.rows);
    });
  });
})(jQuery);