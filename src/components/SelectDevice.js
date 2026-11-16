import { __ } from '@wordpress/i18n';
import { store as editorStore } from '@wordpress/editor';
import {
	Button,
	ToggleGroupControl,
	__experimentalToggleGroupControl,
	ToggleGroupControlOptionIcon,
	__experimentalToggleGroupControlOptionIcon,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

const ToggleGroup = ToggleGroupControl || __experimentalToggleGroupControl;
const ToggleGroupOptionIcon =
	ToggleGroupControlOptionIcon || __experimentalToggleGroupControlOptionIcon;

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

	const deviceLabels = {
		Desktop: __( 'Desktop', 'responsive-controls' ),
		Tablet: __( 'Tablet', 'responsive-controls' ),
		Mobile: __( 'Mobile', 'responsive-controls' ),
	};

	if ( ToggleGroup && ToggleGroupOptionIcon ) {
		return (
			<div className="responsive-controls-select-device-icon-group">
				<ToggleGroup
					label={ __( 'Device preview', 'responsive-controls' ) }
					value={ deviceType }
					onChange={ ( nextDevice ) => setDeviceType( nextDevice ) }
					hideLabelFromVision
					isBlock={ false }
					size="default"
					__nextHasNoMarginBottom
					__next40pxDefaultSize
				>
					{ [ 'Desktop', 'Tablet', 'Mobile' ].map( ( deviceOption ) => (
						<ToggleGroupOptionIcon
							key={ deviceOption }
							value={ deviceOption }
							icon={ deviceIcon[ deviceOption ] }
							label={ deviceLabels[ deviceOption ] }
						/>
					) ) }
				</ToggleGroup>
			</div>
		);
	}

	return (
		<div
			className="responsive-controls-select-device-icon-group responsive-controls-device-toggle-group"
			role="group"
			aria-label={ __( 'Device preview', 'responsive-controls' ) }
		>
			{ [ 'Desktop', 'Tablet', 'Mobile' ].map( ( deviceOption ) => (
				<Button
					key={ deviceOption }
					size="compact"
					variant={ deviceOption === deviceType ? 'primary' : 'tertiary' }
					onClick={ () => setDeviceType( deviceOption ) }
					icon={ deviceIcon[ deviceOption ] }
					label={ deviceLabels[ deviceOption ] }
					showTooltip
					__next40pxDefaultSize
				/>
			) ) }
		</div>
	);
};

export default SelectDevice;
