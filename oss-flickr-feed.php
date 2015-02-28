<?php
/*
  Plugin Name: OSS Flickr Feed
  Description: Get images from Flickr and display them on a responsive grid.
  Version:     0.2
  Author:      Juan Camilo Gonz&#225;lez
  Author URI:  http://juancgonzalez.com
*/

class oss_Flickr_Widget extends WP_Widget {
  function __construct() {
    parent::__construct(
      'oss_flickr_feed',  // Base ID
      'OSS Flickr Feed',  // Name
      array(              // Args
        'description' => 'Get images from Flickr and display them on a responsive grid.' )
    );
  }

  public function widget( $args, $instance ) {
    $title = apply_filters( 'widget_title', $instance['title'] );

    echo $args['before_widget'];
      if ( ! empty( $title ) ) {
        echo $args['before_title'] . '<a class="ossFlickrFeedTitle" href="#" target="_blank">' . $title . '</a>' . $args['after_title'];
      }

      echo '<div class="ossFlickrFeed"
            data-id= "' . $this->number . '"
            data-flickrid="' . $instance['flickrId'] . '"
            data-feed= "' . $instance['feed'] . '"
            data-rows="' . $instance['rows'] . '"
            data-columns="' . $instance['columns'] . '"
            style="position:relative;overflow:hidden;height:50px;width:100%;">
              <div class="oss-flickr-loading" style="position:absolute;left:50%;margin-left:-16px;top:18px;">
                <img src="' . plugins_url('oss-tools/public/img/loading.gif') . '" width="32" height="32">
              </div>
            </div>';

    echo $args['after_widget'];
  }

  public function form( $instance ) {
    // TITLE
    if ( isset( $instance[ 'title' ] ) ) {
      $title = $instance[ 'title' ];
    } else {
      $title = NULL;
    }

    // FLICKR ID
    if ( isset( $instance[ 'flickrId' ] ) ) {
      $flickrId = $instance[ 'flickrId' ];
    } else {
      $flickrId = NULL;
    }

    // FEED
    if ( isset( $instance[ 'feed' ] ) ) {
      $feed = $instance[ 'feed' ];
    } else {
      $feed = 'user';
    }

    // ROWS
    if ( isset( $instance[ 'rows' ] ) ) {
      $rows = $instance[ 'rows' ];
    } else {
      $rows = '1';
    }

    // COLUMNS
    if ( isset( $instance[ 'columns' ] ) ) {
      $columns = $instance[ 'columns' ];
    } else {
      $columns = '20';
    }
  ?>
  <p>
    <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
    <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo sanitize_text_field( $title ); ?>">
  </p>
  <p>
    <label for="<?php echo $this->get_field_id( 'feed' ); ?>"><?php _e( 'Feed: ' ); ?></label>

    <select style="width: 200px;" id="<?php echo $this->get_field_id( 'feed' ) ?>" name="<?php echo $this->get_field_name('feed') ?>" type="text">
      <option value="user" <?php if ($feed == 'user') { echo 'selected'; } ?>>User</option>
      <option value="group" <?php if ($feed == 'group') { echo 'selected'; } ?>>Group</option>
      <option value="friends" <?php if ($feed == 'friends') { echo 'selected'; } ?>>Friends</option>
      <option value="favorites" <?php if ($feed == 'favorites') { echo 'selected'; } ?>>Favorites</option>
    </select>
  </p>
  <p>
    <label for="<?php echo $this->get_field_id( 'flickrId' ); ?>"><?php _e( 'Flickr ID: ' ); ?><a href="http://idgettr.com/" target="_blank">Find it here</a></label>
    <input class="widefat" id="<?php echo $this->get_field_id( 'flickrId' ); ?>" name="<?php echo $this->get_field_name( 'flickrId' ); ?>" type="text" value="<?php echo sanitize_text_field( $flickrId ); ?>">
  </p>
  <table style="width:150px">
    <tr>
      <td><label for="<?php echo $this->get_field_id( 'rows' ); ?>"><?php _e( 'Rows: ' ); ?></label></td>
      <td><input id="<?php echo $this->get_field_id( 'rows' ); ?>" name="<?php echo $this->get_field_name( 'rows' ); ?>" type="text" maxlength="2" size="2" value="<?php echo (int)$rows; ?>"></td>
    </tr>
    <tr>
      <td><label for="<?php echo $this->get_field_id( 'columns' ); ?>"><?php _e( 'Columns: ' ); ?></label></td>
      <td><input id="<?php echo $this->get_field_id( 'columns' ); ?>" name="<?php echo $this->get_field_name( 'columns' ); ?>" type="text" maxlength="2" size="2" value="<?php echo (int)$columns; ?>"></td>
    </tr>
  </table>
  <?php
  }

  public function update( $new_instance, $old_instance ) {
    $instance = array();
    $instance['title']    = ( ! empty( $new_instance['title'] ) )    ? strip_tags( $new_instance['title'] ) : '';
    $instance['flickrId'] = ( ! empty( $new_instance['flickrId'] ) ) ? strip_tags( $new_instance['flickrId'] ) : '';
    $instance['feed']     = ( ! empty( $new_instance['feed'] ) )     ? strip_tags( $new_instance['feed'] ) : 'user';
    $instance['rows']     = ( ! empty( $new_instance['rows'] ) )     ? (int)( $new_instance['rows'] ) : '1';
    $instance['columns']  = ( ! empty( $new_instance['columns'] ) )  ? (int)( $new_instance['columns'] ) : '20';
    return $instance;
  }

}