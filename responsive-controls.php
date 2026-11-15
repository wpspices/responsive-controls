<?php
/**
 *
 * @since             1.0.0
 * @package           Responsive_Controls
 *
 * @responsive-controls
 * Plugin Name:       Responsive controls
 * Description:       Add responsive controls to blocks
 * Version:           1.0.4
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

		public $version = '1.0.4';

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
			$require_assets = trailingslashit( plugin_dir_path( __FILE__ ) ) . 'build/index.asset.php';
			if ( ! file_exists( $require_assets ) ) {
				return;
			}

			$require_assets = include( $require_assets );

			// enqueue script
			wp_enqueue_script( 'responsive-controls-script', trailingslashit( plugin_dir_url( __FILE__ ) ) . 'build/index.js', $require_assets['dependencies'], $require_assets['version'], false );

			// enqueue style
			wp_enqueue_style( 'responsive-controls-style', trailingslashit( plugin_dir_url( __FILE__ ) ) . 'build/style-index.css', array(), $require_assets['version'], 'all' );

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

		/**
		 * Collected responsive CSS for blocks on the current page.
		 *
		 * @var array
		 */
		private static $collected_styles = array();

		/**
		 * Whether the footer hook has been attached.
		 *
		 * @var bool
		 */
		private static $footer_hook_added = false;

		// Render block
		public function render_block( $block_content, $block ) {
			if ( empty( $block_content ) ) {
				return $block_content;
			}

			if ( ! empty( $block['attrs']['useResponsiveControls'] ) && ! empty( $block['attrs']['responsiveControlsID'] ) && ! empty( $block['attrs']['responsiveControlsCss'] ) ) {
				// Class with unique responsiveControlsID
				$class = 'rcsid-' . sanitize_html_class( $block['attrs']['responsiveControlsID'] );

				// Add class to block using WP_HTML_Tag_Processor if available (WP 6.2+)
				if ( class_exists( 'WP_HTML_Tag_Processor' ) ) {
					$processor = new WP_HTML_Tag_Processor( $block_content );
					if ( $processor->next_tag() ) {
						$processor->add_class( $class );
						$block_content = $processor->get_updated_html();
					}
				} else {
					if ( false === strpos( $block_content, 'class="' ) ) {
						$block_content = preg_replace(
							'/' . preg_quote( '>', '/' ) . '/',
							' class="' . esc_attr( $class ) . '" > ',
							$block_content,
							1
						);
					} else {
						$block_content = preg_replace(
							'/' . preg_quote( 'class="', '/' ) . '/',
							'class="' . esc_attr( $class ) . ' ',
							$block_content,
							1
						);
					}
				}

				// Enqueue block css
				$this->enqueue_block_responsive_styles( $block['attrs']['responsiveControlsCss'] );
			}

			return $block_content;
		}

		// Collect and render block css
		private function enqueue_block_responsive_styles( $style, $priority = 20 ) {
			if ( empty( $style ) ) {
				return;
			}

			self::$collected_styles[] = $style;

			if ( ! self::$footer_hook_added ) {
				self::$footer_hook_added = true;
				add_action(
					'wp_footer',
					array( __CLASS__, 'print_collected_styles' ),
					$priority
				);
			}
		}

		/**
		 * Print all collected responsive block styles in the footer.
		 */
		public static function print_collected_styles() {
			if ( empty( self::$collected_styles ) ) {
				return;
			}

			$unique_styles = array_unique( self::$collected_styles );
			$combined_css  = implode( "\n", $unique_styles );
			echo '<style id="responsive-controls-frontend-css">' . wp_strip_all_tags( wp_unslash( $combined_css ) ) . "</style>\n";
		}

	}

	Responsive_Controls::get_instance();
}
