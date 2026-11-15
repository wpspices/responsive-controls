// Check if empty
export const rcsIsEmpty = ( data ) =>
	'undefined' === typeof data || null === data || '' === data;

// Normalize CSS dimension value: ensures a unit like 'px' is attached if purely numeric
export const ensureCssUnit = ( value ) => {
	if ( rcsIsEmpty( value ) ) {
		return '';
	}
	const str = String( value ).trim();
	if ( str === '0' || str === 0 ) {
		return '0';
	}
	// If it's a numeric value without units (e.g. "20", 20, "-10", "-10.5")
	if ( /^-?\d+(\.\d+)?$/.test( str ) ) {
		return `${ str }px`;
	}
	return str;
};

// Generate css for box controls output like padding, margin border e.g obj = style.padding
export const boxControlCompileCss = ( obj, nameArray ) => {
	if ( rcsIsEmpty( obj ) ) {
		return ``;
	}

	let css = nameArray.map( ( name ) => {
		if ( rcsIsEmpty( obj[ name ] ) ) {
			return ` `;
		}

		const sides = [ 'top', 'bottom', 'right', 'left' ];
		let sideRules = '';

		sides.forEach( ( side ) => {
			const rawVal = obj[ name ][ side ];
			if ( ! rcsIsEmpty( rawVal ) ) {
				const formattedVal = ensureCssUnit( rawVal );
				if ( formattedVal !== '' ) {
					sideRules += `${ name }-${ side }:${ formattedVal } !important;\n`;
				}
			}
		} );

		return sideRules;
	} );

	return css.join( ' ' );
};
