import { __ } from '@wordpress/i18n';
import { Button, ButtonGroup } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

const SelectDevice = () => {
	const deviceType = useSelect( ( select ) => {
		return select( 'core/edit-post' ).__experimentalGetPreviewDeviceType();
	}, [] );
	const { __experimentalSetPreviewDeviceType: setPreviewDeviceType } =
		useDispatch( 'core/edit-post' );

	const deviceIcon = {
		Desktop: 'desktop',
		Tablet: 'tablet',
		Mobile: 'smartphone',
	};

	return (
		<div className="responsive-controls-select-device-icon-group">
			<ButtonGroup>
				{ [ 'Desktop', 'Tablet', 'Mobile' ].map( ( deviceOption ) => {
					return (
						<Button
							key={ deviceOption }
							isSmall
							variant={
								deviceOption === deviceType
									? 'primary'
									: undefined
							}
							onClick={ () =>
								setPreviewDeviceType( deviceOption )
							}
							icon={ deviceIcon[ deviceOption ] }
						></Button>
					);
				} ) }
			</ButtonGroup>
		</div>
	);
};

export default SelectDevice;
