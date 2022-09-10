import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody } from '@wordpress/components';

import HideInDevice from './components/HideInDevice';
import GenerateCss from './components/GenerateCss';
import PaddingMargin from './components/PaddingMargin';
import Typography from './components/Typography';
import './style.scss';

const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name, attributes, setAttributes, isSelected, clientId } = props;

		const { useResponsiveControls } = attributes;

		return (
			<>
				<BlockEdit { ...props } />
				{ useResponsiveControls ? <GenerateCss { ...props } /> : '' }
				<InspectorControls>
					<PanelBody
						title={ __(
							'Responsive Controls',
							'responsive-controls'
						) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Use Responsive controls',
								'responsive-controls'
							) }
							checked={ useResponsiveControls }
							onChange={ ( useResponsiveControls ) =>
								setAttributes( { useResponsiveControls } )
							}
						/>
						{ useResponsiveControls ? (
							<>
								<HideInDevice { ...props } />
								<Typography { ...props } />
								<PanelBody
									title={ __(
										'Spacing',
										'responsive-controls'
									) }
									initialOpen={ true }
								>
									<PaddingMargin { ...props } />
									<PaddingMargin
										{ ...props }
										rcsIsMargin={ true }
									/>
								</PanelBody>
							</>
						) : (
							''
						) }
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withInspectorControl' );

addFilter(
	'editor.BlockEdit',
	'my-plugin/with-inspector-controls',
	withInspectorControls
);
