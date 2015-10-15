<?php
/*
   Plugin Name: Bluerock Asset Allocator
   Plugin URI: http://bluerockre.com
   Version: 0.1
   Author: Robby Milo
   Description: Asset Allocator for Bluerock Real Estate, LLC.
   License: GPLv3
  */

//Add Shortcode
function br_allocator() {
        readfile(plugins_url("allocator-content.php", __FILE__));

}
add_shortcode( 'asset_allocator', 'br_allocator' );

//Enqueue Scripts N Styles to Allocator Template

function br_enqueue() {
    
    if (is_page( 'Asset Allocator' )) { 
        wp_enqueue_script("jquery-1-5-2", 'http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js');
        wp_enqueue_script("allocator-implementing", plugins_url() . '/bluerock-allocator/js/implementing_alts_bluerock.js', array( 'jquery'));
        wp_enqueue_script("allocator-highcharts", plugins_url() . '/bluerock-allocator/js/highcharts.js', array( 'jquery'));
        wp_enqueue_script("allocator-revision", plugins_url() . '/bluerock-allocator/js/revision.js', array( 'jquery'));


        wp_enqueue_style("allocator", plugins_url() . '/bluerock-allocator/allocator.css', array(), "1.0", "all");
        //wp_enqueue_style("revision-print", plugins_url() . '/bluerock-allocator/css/font-awesome.min.css', array(), "1.0", "all");
        wp_enqueue_style("main", plugins_url() . '/bluerock-allocator/css/main.css', array(), "1.0", "all");
        wp_enqueue_style("overrides", plugins_url() . '/bluerock-allocator/css/overrides.css', array(), "1.0", "all");
        wp_enqueue_style("basic", plugins_url() . '/bluerock-allocator/css/basic.css', array(), "1.0", "all");
        wp_enqueue_style("revision", plugins_url() . '/bluerock-allocator/css/revision.css', array(), "1.0", "all");
        wp_enqueue_style("jquery-ui", '//ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css', array(), "1.0");

    }
}

add_action('wp_enqueue_scripts', 'br_enqueue');

