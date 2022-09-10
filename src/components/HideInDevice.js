import { PanelBody, Button, ButtonGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const HideInDevice = ( props ) => {
	const { attributes, setAttributes } = props;

	const {
		responsiveControlsHideInDesktop,
		responsiveControlsHideInTab,
		responsiveControlsHideInMobile,
	} = attributes;

	const HideInDeviceOptions = {
		desktop: responsiveControlsHideInDesktop,
		tablet: responsiveControlsHideInTab,
		smartphone: responsiveControlsHideInMobile,
	};

	const setHideInDevice = ( deviceName ) => {
		let hideValue = HideInDeviceOptions[ deviceName ] ? false : true;
		if ( 'desktop' === deviceName ) {
			setAttributes( { responsiveControlsHideInDesktop: hideValue } );
		}
		if ( 'tablet' === deviceName ) {
			setAttributes( { responsiveControlsHideInTab: hideValue } );
		}
		if ( 'smartphone' === deviceName ) {
			setAttributes( { responsiveControlsHideInMobile: hideValue } );
		}
	};

	return (
		<>
			<PanelBody
				title={ __( 'Hide in device', 'responsive-controls' ) }
				initialOpen={ true }
			>
				<ButtonGroup>
					{ [ 'desktop', 'tablet', 'smartphone' ].map(
						( deviceName ) => {
							return (
								<Button
									key={ deviceName }
									isSmall
									isDestructive
									variant={
										HideInDeviceOptions[ deviceName ]
											? 'primary'
											: undefined
									}
									onClick={ () =>
										setHideInDevice( deviceName )
									}
									icon={ deviceName }
								></Button>
							);
						}
					) }
				</ButtonGroup>
			</PanelBody>
		</>
	);
};

export default HideInDevice;
