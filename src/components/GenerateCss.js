import { useEffect } from '@wordpress/element';
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

	const blockId =
		responsiveControlsID ||
		clientId.replace( /[^a-zA-Z0-9_-]/g, '' ).slice( 0, 8 );

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
		// Desktop css
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

	useEffect( () => {
		const targetSelector = '.rcsid-' + blockId;
		const nextFrontendCss = getCss( targetSelector );

		if (
			nextFrontendCss !== responsiveControlsCss ||
			blockId !== responsiveControlsID
		) {
			setAttributes( {
				responsiveControlsCss: nextFrontendCss,
				responsiveControlsID: blockId,
			} );
		}
	}, [
		blockId,
		responsiveControlsID,
		responsiveControlsCss,
		responsiveControlsHideInDesktop,
		responsiveControlsHideInTab,
		responsiveControlsHideInMobile,
		responsiveControlsDStyle,
		responsiveControlsMStyle,
		responsiveControlsTStyle,
	] );

	// Calculate current block CSS directly during render to prevent stale state / lag
	const editorCss = getCss( '#block-' + clientId );

	return <style>{ editorCss }</style>;
};

export default GenerateCss;
