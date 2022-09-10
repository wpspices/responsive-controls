/**
 * Range Unit control :
 * unit selection with set space attributes
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { PanelBody } from '@wordpress/components';
import RangeUnitControl from './RangeUnitControl';
import { rcsIsEmpty } from '../helper';

const Typography = ( props ) => {
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
		return select( 'core/edit-post' ).__experimentalGetPreviewDeviceType();
	}, [] );

	const getTypographyValue = ( name ) => {
		if ( 'Mobile' === deviceType ) {
			return rcsIsEmpty( responsiveControlsMStyle ) ||
				rcsIsEmpty( responsiveControlsMStyle.typography )
				? undefined
				: responsiveControlsMStyle.typography[ name ];
		} else if ( 'Tablet' === deviceType ) {
			return rcsIsEmpty( responsiveControlsTStyle ) ||
				rcsIsEmpty( responsiveControlsTStyle.typography )
				? undefined
				: responsiveControlsTStyle.typography[ name ];
		} else {
			return rcsIsEmpty( responsiveControlsDStyle ) ||
				rcsIsEmpty( responsiveControlsDStyle.typography )
				? undefined
				: responsiveControlsDStyle.typography[ name ];
		}
	};

	//Prevent useeffect to set  attributes on first render
	const [ firstRender, setFirstRender ] = useState( true );

	const setFontSize = ( fontSize ) => {
		if ( fontSize !== getTypographyValue( 'fontSize' ) ) {
			let typographyObj = {
				fontSize: fontSize,
			};
			if ( 'Mobile' === deviceType ) {
				setAttributes( {
					responsiveControlsMStyle: {
						...responsiveControlsMStyle,
						typography: {
							...typographyObj,
						},
					},
				} );
			} else if ( 'Tablet' === deviceType ) {
				setAttributes( {
					responsiveControlsTStyle: {
						...responsiveControlsTStyle,
						typography: {
							...typographyObj,
						},
					},
				} );
			} else {
				setAttributes( {
					responsiveControlsDStyle: {
						...responsiveControlsDStyle,
						typography: {
							...typographyObj,
						},
					},
				} );
			}
		}
	};

	const MAX_SPACE_VALUES = {
		px: 120,
		em: 20,
		rem: 20,
		vh: 1,
		vw: 1,
	};

	return (
		<PanelBody
			title={ __( 'Typography', 'responsive-controls' ) }
			initialOpen={ true }
		>
			<RangeUnitControl
				data={ props }
				rangeLabel={ __( 'Font size', 'responsive-controls' ) }
				rangeAttrValue={ getTypographyValue( 'fontSize' ) }
				rangeAttrName=""
				onChangeFunc={ ( fontSizeValue ) =>
					setFontSize( fontSizeValue )
				}
				rangeMin={ 5 }
				rangeMax={ MAX_SPACE_VALUES }
				rangeStep={ 1 }
			/>
		</PanelBody>
	);
};

export default Typography;
