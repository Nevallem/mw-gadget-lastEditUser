/**
 * Last Edit User
 *
 * @desc Shows on a user's page/subpage/discussion the date of the user's last contribution
 * @author Roger Pestana (!Silent)
 * @date 29/jul/2012
 * @update 30/oct/2021
 * @source https://github.com/Nevallem/mw-gadget-lastEditUser
*/
/* jshint laxbreak: true */
/* global mw, $ */

( function () {
'use strict';

if ( $.inArray( mw.config.get( 'wgNamespaceNumber' ), [ 2, 3 ] ) !== -1
	&& mw.config.get( 'wgAction' ) === 'view'
	&& !( mw.util.getParamValue( 'oldid' ) || mw.util.getParamValue( 'diff' ) )
) {
	mw.loader.load( '//pt.wikipedia.org/w/index.php?title=MediaWiki:Gadget-lastEditUser.js/core.js&action=raw&ctype=text/javascript' );
}

}() );
