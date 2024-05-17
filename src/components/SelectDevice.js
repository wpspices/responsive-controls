import { __ } from '@wordpress/i18n';
import {
	store as editorStore,
} from '@wordpress/editor';
import { Button, ButtonGroup } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

const SelectDevice = () => {
	const deviceType = useSelect( ( select ) => {
		return select( 'core/editor' ).getDeviceType();
	}, [] );
	const { setDeviceType } = useDispatch( editorStore );

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
								setDeviceType( deviceOption )
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
