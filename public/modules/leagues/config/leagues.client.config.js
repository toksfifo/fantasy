'use strict';

// Configuring the Articles module
angular.module('leagues').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Leagues', 'leagues', 'item', '/leagues(/create|/[a-fA-F0-9]{24}|/join|/[a-fA-F0-9]{24}/join)?');
		//Menus.addSubMenuItem('topbar', 'leagues', 'List Leagues', 'leagues');
		//Menus.addSubMenuItem('topbar', 'leagues', 'Create League', 'leagues/create');
	}
]);
