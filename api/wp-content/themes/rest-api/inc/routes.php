<?php

////////////////////////////////////////////////////////////////
// Creates route for succinctly sending a list
// of all published pages including templates used
////////////////////////////////////////////////////////////////

function react_wp_rest_get_page_routes() {
	$pages = get_pages();
	$names = [];

	foreach ($pages as $page) {
		if ($page->post_status === 'publish') {

			// Add template name to object
			$template = get_page_template_slug( $page->ID );

			// Clean up template filename
			$template = str_replace('.php', '', $template);
			$template = str_replace('page-', '', $template);

			$name = array(
				'path' => get_page_uri($page->ID),
				'slug' => $page->post_name,
				'template' => $template,
				'type' => 'page'
			);

			array_push($names, $name);
		}
	}

	return $names;
}

function react_wp_rest_get_post_routes() {
	$pages = get_posts();
	$names = [];

	foreach ($pages as $page) {
		if ($page->post_status === 'publish') {

			// Add template name to object
			$template = get_page_template_slug( $page->ID );

			// Clean up template filename
			$template = str_replace('.php', '', $template);
			$template = str_replace('page-', '', $template);

			$name = array(
				'path' => get_page_uri($page->ID),
				'slug' => $page->post_name,
				'template' => $template,
				'type' => 'post'
			);

			array_push($names, $name);
		}
	}

	return $names;
}

function react_wp_rest_get_campaign_routes() {
	$args = array(
	  'post_type'   => 'campaign'
	);

	$pages = get_posts($args);
	$names = [];

	foreach ($pages as $page) {
		if ($page->post_status === 'publish') {

			// Add template name to object
			$template = get_page_template_slug( $page->ID );

			// Clean up template filename
			$template = str_replace('.php', '', $template);
			$template = str_replace('page-', '', $template);

			$name = array(
				'path' => get_page_uri($page->ID),
				'slug' => $page->post_name,
				'template' => $template,
				'type' => 'campaign'
			);

			array_push($names, $name);
		}
	}

	return $names;
}

////////////////////////////////////////////////////////////////
// Register routes
////////////////////////////////////////////////////////////////

add_action( 'rest_api_init', function () {
	register_rest_route( 'react-wp-rest', '/pages/list', array(
		'methods' => 'GET',
		'callback' => 'react_wp_rest_get_page_routes',
	) );

	register_rest_route( 'react-wp-rest', '/posts/list', array(
		'methods' => 'GET',
		'callback' => 'react_wp_rest_get_post_routes',
	) );

	register_rest_route( 'react-wp-rest', '/campaigns/list', array(
		'methods' => 'GET',
		'callback' => 'react_wp_rest_get_campaign_routes',
	) );
} );

?>
