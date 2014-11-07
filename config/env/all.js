'use strict';

module.exports = {
	app: {
		title: 'Joga Bonito',
		description: 'The real way to play fantasy football',
		keywords: 'soccer, football, fantasy, league'
	},
	kimono: {
		baseURL: 'https://www.kimonolabs.com/api/',
		apiKey: process.env.KIMONO_KEY || '9f3de7fbf94a75608b4e10adb275c151',
		apiURLs:{
			league: process.env.LEAGUE_API || 'dgbylo0g',
			teams: process.env.TEAMS_API || '580q3d28',
			players: process.env.PLAYERS_API || 'egsljlaq'
		}
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/datatables/media/css/jquery.dataTables.min.css',
				'public/lib/datatables/media/css/jquery.dataTables_themeroller.css',
				'public/lib/angular-datatables/dist/datatables.bootstrap.min.css',
				'public/lib/datatables-scroller/css/dataTables.scroller.css'
			],
			js: [
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/zeroclipboard/dist/ZeroClipboard.js',
				'public/lib/datatables/media/js/jquery.dataTables.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-datatables/dist/angular-datatables.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/datatables-scroller/js/dataTables.scroller.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
