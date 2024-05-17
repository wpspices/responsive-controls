<?php
/**
 *
 * @since             1.0.0
 * @package           Responsive_Controls
 *
 * @responsive-controls
 * Plugin Name:       Responsive controls
 * Description:       Add responsive controls to blocks
 * Version:           1.0.2
 * Author:            wpspices
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       responsive-controls
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}
defined( 'ABSPATH' ) || exit;

// Check if class exists
if ( ! class_exists( 'Responsive_Controls' ) ) {

	class Responsive_Controls {

		public $version = '1.0.2';

		// The instance of this class
		private static $instance = null;

		// Returns the instance of this class.
		public static function get_instance() {
			if ( null === self::$instance ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		public function __construct() {

			// Add attributes for responsive-controls before the metadata gets processed
			add_action( 'block_type_metadata', array( $this, 'add_attributes_to_blocks' ) );

			// Render responsive CSS
			add_filter( 'render_block', array( $this, 'render_block' ), 10, 2 );

			// Enqueue block editor assets
			add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_scripts' ) );
		}

		// Enqueue block editor assets
		public function enqueue_editor_scripts() {

			// enqueue script
			wp_enqueue_script( 'responsive-controls-script', trailingslashit( plugin_dir_url( __FILE__ ) ) . 'build/index.js', array('wp-block-editor', 'wp-components', 'wp-compose', 'wp-data', 'wp-element', 'wp-hooks', 'wp-i18n'), $this->version, false );

			// enqueue style
			wp_enqueue_style( 'responsive-controls-style', trailingslashit( plugin_dir_url( __FILE__ ) ) . 'build/style-index.css', array(), $this->version, 'all' );

		}

		// Add attributes for responsive-controls before the metadata gets processed
		public function add_attributes_to_blocks( $metadata ) {
			// Check has attributes
			if ( ! empty( $metadata['attributes'] ) ) {

				$metadata['attributes'] = array_merge(
					$metadata['attributes'],
					array(
						'useResponsiveControls'           => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'responsiveControlsID'            => array(
							'type'    => 'string',
							'default' => '',
						),
						'responsiveControlsHideInDesktop' => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'responsiveControlsHideInTab'     => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'responsiveControlsHideInMobile'  => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'responsiveControlsCss'           => array(
							'type'    => 'string',
							'default' => '',
						),
						'responsiveControlsDStyle'        => array(
							'type' => 'object',
						),
						'responsiveControlsMStyle'        => array(
							'type' => 'object',
						),
						'responsiveControlsTStyle'        => array(
							'type' => 'object',
						),
					),
				);
			}

			return $metadata;
		}

		// Render block
		public function render_block( $block_content, $block ) {
			
			if ( ! empty( $block['attrs']['useResponsiveControls'] ) &&  ! empty( $block['attrs']['responsiveControlsID'] ) && ! empty( $block['attrs']['responsiveControlsCss'] ) ) {
				// Class with unique responsiveControlsID
				$class = 'rcsid-' . esc_attr( $block['attrs']['responsiveControlsID'] );

				// Add class to block
				if ( false === strpos( $block_content, 'class="' ) ) {
					$block_content = preg_replace(
						'/' . preg_quote( '>', '/' ) . '/',
						' class="' . $class . '" > ',
						$block_content,
						1
					);
				} else {
					$block_content = preg_replace(
						'/' . preg_quote( 'class="', '/' ) . '/',
						'class="' . $class . ' ',
						$block_content,
						1
					);
				}

				// enqueue block css
				$this->enqueue_block_responsive_styles( $block['attrs']['responsiveControlsCss'], 11 );
			}

			return $block_content;
		}

		// Render block css
		private function enqueue_block_responsive_styles( $style, $priority = 10 ) {

			$action_hook_name = 'wp_footer';
			if ( wp_is_block_theme() ) {
				$action_hook_name = 'wp_head';
			}
			add_action(
				$action_hook_name,
				static function () use ( $style ) {
					echo '<style>' . wp_kses_post( wp_unslash( $style ) ) . "</style>\n";
				},
				$priority
			);
		}

	}

	Responsive_Controls::get_instance();
}
