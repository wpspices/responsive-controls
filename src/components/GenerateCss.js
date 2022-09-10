import { useEffect, useState } from '@wordpress/element';
import { rcsIsEmpty, boxControlCompileCss } from '../helper';

const GenerateCss = ( props ) => {
	const { name, attributes, setAttributes, isSelected, clientId } = props;

	const {
		responsiveControlsID,
		responsiveControlsHideInDesktop,
		responsiveControlsHideInTab,
		responsiveControlsHideInMobile,
		responsiveControlsCss,
		responsiveControlsDStyle,
		responsiveControlsMStyle,
		responsiveControlsTStyle,
	} = attributes;

	useEffect( () => {
		let setCss = true;

		if ( setCss ) {
			setAttributes( {
				responsiveControlsCss: getCss( '.rcsid-' + clientId ),
				responsiveControlsID: clientId,
			} );
			setLocalCSS( getCss( '#block-' + clientId ) );
		}

		return () => {
			setCss = false;
		};
	}, [
		responsiveControlsHideInDesktop,
		responsiveControlsHideInTab,
		responsiveControlsHideInMobile,
		responsiveControlsDStyle,
		responsiveControlsMStyle,
		responsiveControlsTStyle,
	] );

	const boxControls = [ 'padding', 'margin' ];

	const getTypographyCss = ( typography ) => {
		if ( rcsIsEmpty( typography ) ) {
			return ``;
		}

		return `${
			rcsIsEmpty( typography.fontSize )
				? ``
				: `font-size:${ typography.fontSize } !important;`
		}`;
	};

	const getDevicsCss = ( deviceAttr, selector, deviceName = 'Desktop' ) => {
		let HideInDevice = responsiveControlsHideInDesktop;
		if ( 'Tablet' === deviceName ) {
			HideInDevice = responsiveControlsHideInTab;
		} else if ( 'Mobile' === deviceName ) {
			HideInDevice = responsiveControlsHideInMobile;
		}

		return `
            ${ selector }{
                ${ HideInDevice ? `display:none;` : `` }
                ${
					rcsIsEmpty( deviceAttr )
						? ``
						: boxControlCompileCss( deviceAttr, boxControls ) +
						  getTypographyCss( deviceAttr.typography )
				}
            }`;
	};

	const getCss = ( selector ) => {
		//Desktop css
		return `
            ${ getDevicsCss( responsiveControlsDStyle, selector, 'Desktop' ) }

            @media only screen and (min-width: 769px) and (max-width: 1080px) {
                ${ getDevicsCss(
					responsiveControlsTStyle,
					selector,
					'Tablet'
				) }
            }

            @media only screen and (max-width: 768px) {
                ${ getDevicsCss(
					responsiveControlsMStyle,
					selector,
					'Mobile'
				) }
            }
        `;
	};

	const [ localCSS, setLocalCSS ] = useState(
		getCss( '#block-' + clientId )
	);

	return <style>{ localCSS }</style>;
};

export default GenerateCss;
