import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
	PanelRow,
	BoxControl as StableBoxControl,
	__experimentalBoxControl as ExpBoxControl,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';
import SelectDevice from './SelectDevice';

const BoxControl = StableBoxControl || ExpBoxControl;

const PaddingMargin = ( props ) => {
	const {
		name,
		attributes,
		setAttributes,
		isSelected,
		clientId,
		rcsIsMargin,
	} = props;

	const {
		responsiveControlsDStyle,
		responsiveControlsMStyle,
		responsiveControlsTStyle,
	} = attributes;

	const deviceType = useSelect( ( select ) => {
		return select( 'core/editor' ).getDeviceType();
	}, [] );

	const defaultUnits = [
		{ value: 'px', label: 'px', default: 0 },
		{ value: '%', label: '%', default: 0 },
		{ value: 'em', label: 'em', default: 0 },
		{ value: 'rem', label: 'rem', default: 0 },
		{ value: 'vw', label: 'vw', default: 0 },
		{ value: 'vh', label: 'vh', default: 0 },
	];

	const units = useCustomUnits
		? useCustomUnits( {
				availableUnits: [ 'px', '%', 'em', 'rem', 'vw', 'vh' ],
				defaultValues: { px: 0, '%': 0, em: 0, rem: 0, vw: 0, vh: 0 },
		  } )
		: defaultUnits;

	const getSpacing = () => {
		if ( 'Mobile' === deviceType ) {
			return rcsIsMargin
				? responsiveControlsMStyle?.margin
				: responsiveControlsMStyle?.padding;
		} else if ( 'Tablet' === deviceType ) {
			return rcsIsMargin
				? responsiveControlsTStyle?.margin
				: responsiveControlsTStyle?.padding;
		} else {
			return rcsIsMargin
				? responsiveControlsDStyle?.margin
				: responsiveControlsDStyle?.padding;
		}
	};

	const setSpacing = ( spacing ) => {
		if ( 'Mobile' === deviceType ) {
			if ( rcsIsMargin ) {
				setAttributes( {
					responsiveControlsMStyle: {
						...responsiveControlsMStyle,
						margin: spacing,
					},
				} );
			} else {
				setAttributes( {
					responsiveControlsMStyle: {
						...responsiveControlsMStyle,
						padding: spacing,
					},
				} );
			}
		} else if ( 'Tablet' === deviceType ) {
			if ( rcsIsMargin ) {
				setAttributes( {
					responsiveControlsTStyle: {
						...responsiveControlsTStyle,
						margin: spacing,
					},
				} );
			} else {
				setAttributes( {
					responsiveControlsTStyle: {
						...responsiveControlsTStyle,
						padding: spacing,
					},
				} );
			}
		} else {
			if ( rcsIsMargin ) {
				setAttributes( {
					responsiveControlsDStyle: {
						...responsiveControlsDStyle,
						margin: spacing,
					},
				} );
			} else {
				setAttributes( {
					responsiveControlsDStyle: {
						...responsiveControlsDStyle,
						padding: spacing,
					},
				} );
			}
		}
	};

	const allowNegativeMargin = rcsIsMargin ? { min: -1000 } : {};

	if ( ! BoxControl ) {
		return null;
	}

	return (
		<>
			<PanelRow className="justify-content-end">
				<SelectDevice />
			</PanelRow>
			<BoxControl
				label={
					rcsIsMargin
						? __( 'Margin', 'responsive-controls' )
						: __( 'Padding', 'responsive-controls' )
				}
				values={ getSpacing() }
				units={ units }
				inputProps={ allowNegativeMargin }
				onChange={ ( nextValues ) => setSpacing( nextValues ) }
				__next40pxDefaultSize
			/>
		</>
	);
};

export default PaddingMargin;
