import { PanelBody, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const HideInDevice = ( props ) => {
	const { attributes, setAttributes } = props;

	const {
		responsiveControlsHideInDesktop,
		responsiveControlsHideInTab,
		responsiveControlsHideInMobile,
	} = attributes;

	const deviceConfigs = [
		{
			key: 'desktop',
			active: !! responsiveControlsHideInDesktop,
			attr: 'responsiveControlsHideInDesktop',
			label: __( 'Hide on Desktop', 'responsive-controls' ),
		},
		{
			key: 'tablet',
			active: !! responsiveControlsHideInTab,
			attr: 'responsiveControlsHideInTab',
			label: __( 'Hide on Tablet', 'responsive-controls' ),
		},
		{
			key: 'smartphone',
			active: !! responsiveControlsHideInMobile,
			attr: 'responsiveControlsHideInMobile',
			label: __( 'Hide on Mobile', 'responsive-controls' ),
		},
	];

	return (
		<PanelBody
			title={ __( 'Hide in device', 'responsive-controls' ) }
			initialOpen={ true }
		>
			<div
				className="responsive-controls-device-toggle-group"
				role="group"
				aria-label={ __( 'Hide in device', 'responsive-controls' ) }
			>
				{ deviceConfigs.map( ( { key, active, attr, label } ) => (
					<Button
						key={ key }
						size="compact"
						variant={ active ? 'primary' : 'tertiary' }
						isDestructive={ active }
						onClick={ () => setAttributes( { [ attr ]: ! active } ) }
						icon={ key }
						label={ label }
						showTooltip
						__next40pxDefaultSize
					/>
				) ) }
			</div>
		</PanelBody>
	);
};

export default HideInDevice;
