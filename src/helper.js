//Check if empty
export const rcsIsEmpty = ( data ) =>
	'undefined' === typeof data || null === data || '' === data;

//Generate css for box controls output like padding, margin border e.g obj = style.padding
export const boxControlCompileCss = ( obj, nameArray ) => {
	if ( rcsIsEmpty( obj ) ) {
		return ``;
	}

	let css = nameArray.map( ( name ) =>
		rcsIsEmpty( obj[ name ] )
			? ` `
			: `  
            ${
				rcsIsEmpty( obj[ name ].top )
					? ``
					: `${ name }-top:${ obj[ name ].top } !important;`
			}
            ${
				rcsIsEmpty( obj[ name ].bottom )
					? ``
					: `${ name }-bottom:${ obj[ name ].bottom } !important;`
			}
            ${
				rcsIsEmpty( obj[ name ].right )
					? ``
					: `${ name }-right:${ obj[ name ].right } !important;`
			}
            ${
				rcsIsEmpty( obj[ name ].left )
					? ``
					: `${ name }-left:${ obj[ name ].left } !important;`
			}
        `
	);

	return css.join( ' ' );
};
