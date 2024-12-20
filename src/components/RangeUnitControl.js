/**
 * Range Unit control :
 * unit selection with set space attributes
 */
import { __ } from '@wordpress/i18n';
import {
	PanelRow,
	RangeControl,
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalUnitControl as UnitControl,
	__experimentalHStack as HStack,
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue,
} from '@wordpress/components';
import SelectDevice from './SelectDevice';
import { rcsIsEmpty } from '../helper';

const RangeUnitControl = ( props ) => {
	const {
		rangeLabel,
		rangeAttrValue,
		onChangeFunc,
		rangeMin,
		rangeMax,
		rangeStep,
	} = props;

	const units = useCustomUnits( {
		availableUnits: [ 'px', 'em', 'rem', 'vh', 'vw' ],
		defaultValues: { px: 0, em: 0, rem: 0, vh: 0, vw: 0 },
	} );

	const getQtyOrunit = ( rawUnit, quantityOrUnit = 'unit' ) => {
		const [ quantityToReturn, unitToReturn ] =
			parseQuantityAndUnitFromRawValue( rawUnit );
		let unit =
			'undefined' === typeof unitToReturn || null === unitToReturn
				? 'px'
				: unitToReturn;
		let Qty =
			'undefined' === typeof quantityToReturn ||
			null === quantityToReturn ||
			'' == quantityToReturn
				? 0
				: quantityToReturn;
		return 'unit' === quantityOrUnit ? unit : quantityToReturn;
	};

	return (
		<PanelRow>
			<fieldset className="components-border-radius-control responsive-controls-rangeunitcontrol">
				<HStack>
					<legend>
						{ rcsIsEmpty( rangeLabel ) ? '' : rangeLabel }
					</legend>
					<SelectDevice />
				</HStack>
				<div className="components-border-radius-control__wrapper">
					<RangeControl
						className="components-border-radius-control__range-control"
						value={ getQtyOrunit( rangeAttrValue, 'Qty' ) }
						withInputField={ false }
						onChange={ ( qty ) =>
							onChangeFunc( qty + getQtyOrunit( rangeAttrValue ) )
						}
						min={ rangeMin }
						max={ rangeMax[ getQtyOrunit( rangeAttrValue ) ] }
						step={ rangeStep }
						__nextHasNoMarginBottom
					/>
					<UnitControl
						className="components-border-radius-control__unit-control"
                        size={ '__unstable-large' }
						units={ units }
						value={ rangeAttrValue }
						onChange={ ( rangeAttrValue ) =>
							onChangeFunc( rangeAttrValue )
						}
					/>
				</div>
			</fieldset>
		</PanelRow>
	);
};

export default RangeUnitControl;
