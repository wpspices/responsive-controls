import {
	PanelRow,
	RangeControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

const SliderInput = ( props ) => {
	const {
		label,
		rangeValue,
		rangeOnChange,
		min,
		max,
		step,
		units,
		unitValue,
		unitOnChange,
	} = props;
	return (
		<PanelRow>
			<fieldset className="components-border-radius-control">
				<legend>{ label }</legend>
				<div className="components-border-radius-control__wrapper">
					<RangeControl
						className="components-border-radius-control__range-control"
						value={ rangeValue }
						withInputField={ false }
						onChange={ rangeOnChange }
						min={ min }
						max={ max }
						step={ step }
					/>
					<UnitControl
						className="components-border-radius-control__unit-control"
						units={ units }
						value={ unitValue }
						onChange={ unitOnChange }
					/>
				</div>
			</fieldset>
		</PanelRow>
	);
};

export default SliderInput;
