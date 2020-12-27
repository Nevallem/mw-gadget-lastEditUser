/**
 * Shows on a user's page/subpage/discussion the date of the user's last contribution
 *
 * @author Roger Pestana ()
 * @date 29/jul/2012
 * @update 26/dec/2020
*/
/* global mw, $ */
/* jshint laxbreak:true, esversion: 6 */

( function() {
'use strict';

// Interface messages
mw.messages.set( {
	'leu-loading': 'Carregando data da última edição do usuário...',
	'leu-error': 'Erro - não foi possível exibir a data última edição do usuário.',
	'leu-notEditedYet': 'O usuário ainda não editou ou todas as suas edições foram eliminadas.',
	'leu-date': 'O usuário editou pela última vez às $1 de $2 de $3 de $4 (UTC).', // $1 = hour, $2 = day, $3 = month, $4 = year
	'leu-monthnames': 'janeiro fevereiro março abril maio junho julho agosto setembro outubro novembro dezembro'
} );

// Main function
// @return {undefined}
function lastEditUser() {
	let date, lastEdit, contribs, monthNames,
		$lastEditUser = $( '<span id="lastEditUser">' + mw.message( 'leu-loading' ).plain() + '</span>' ).css( 'font', '12px Tahoma' );

	monthNames = mw.message( 'leu-monthnames' ).plain().split( ' ' ); // default wgMonthNames returns the months in english on JS/CSS subpages
	monthNames.unshift( '' );

	$.getJSON( mw.util.wikiScript( 'api' ), {
		action: 'query',
		list: 'usercontribs',
		format: 'json',
		uclimit: '1',
		ucuser: window.decodeURIComponent( /:([^\/]+)/.exec( mw.util.getUrl() )[ 1 ] ),
		ucprop: 'timestamp'
	} ).done( function( data ) {
		if ( !data || data.error ) {
			$lastEditUser.html( mw.message( 'leu-error' ).plain() );
			return;
		}

		contribs = data.query.usercontribs[ 0 ];

		if ( $.isEmptyObject( contribs ) ) {
			$lastEditUser.html( mw.message( 'leu-notEditedYet' ).plain() );
			return;
		}

		lastEdit = contribs.timestamp.replace( /(T|Z)/g, ' ' ).split( ' ' );
		date = lastEdit[ 0 ].split( '-' );

		$lastEditUser.html(
			mw.message(
				'leu-date',
				lastEdit[ 1 ], // hour
				date[ 2 ].replace( /^0/, '' ).replace( /^1\b/, '1º' ), // day
				monthNames[ date[ 1 ].replace( /^0/, '' ) ], // month
				date[ 0 ] // year
			).plain()
		);
	} );

	$( '#bodyContent' ).before( $lastEditUser );
}

if ( $.inArray( mw.config.get( 'wgNamespaceNumber' ), [ 2, 3 ] ) !== -1
	&& mw.config.get( 'wgAction' ) === 'view'
	&& !( mw.util.getParamValue( 'oldid' ) || mw.util.getParamValue( 'diff' ) )
) {
	$( lastEditUser );
}

}() );
