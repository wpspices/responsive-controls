=== Responsive controls ===
Contributors: wpspices
Tags: responsive controls, responsive, block, responsive block
Requires at least: 6.5
Tested up to: 7.1
Requires PHP: 7.4
Stable tag: 1.0.4
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Add responsive controls to blocks

== Description ==

Responsive controls plugin will add separate ('Desktop', 'Tablet', 'Mobile') block controls inside block editor. 

Add following responsive controls to blocks:

* Hide/Show
* Padding
* Margin (negative margin enabled)
* Typography


== Screenshots ==

1. Use Responsive controls
2. Hide and show in device
3. Responsive typography
4. Responsive spacing and negative margin


== Changelog ==

= 1.0.4 =
* Fixed: Resolved issue where unitless padding and margin values were discarded by CSS parser.
* Fixed: BoxControl unit support with useCustomUnits for px, %, em, rem, vw, and vh.
* Fixed: Block themes (FSE) responsive styles now reliably print in footer.
* Fixed: Upgraded deprecated ButtonGroup to ToggleGroupControl and accessible button groups for WordPress 6.8+ compatibility.
* Fixed: Prevented unnecessary editor dirty state on initial post load.
* Enhancement: Real-time synchronous CSS compilation in editor canvas.

= 1.0.3 =
* Fixed responsive control toggle
* Updated rangecontrol component

= 1.0.2 =
* Updated to getDeviceType & setDeviceType function for preview responsive changes

= 1.0.1 =
updated readme

= 1.0.0 =
Released