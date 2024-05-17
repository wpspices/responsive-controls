/**
 * Range Unit control :
 * unit selection with set space attributes
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
	PanelRow,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import SelectDevice from './SelectDevice';

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
		if ( spacing !== getSpacing() ) {
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
		}
	};

	const allowNegativeMargin = rcsIsMargin ? { min: -1000 } : {};

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
				inputProps={ allowNegativeMargin }
				onChange={ ( nextValues ) => setSpacing( nextValues ) }
			/>
		</>
	);
};

export default PaddingMargin;
