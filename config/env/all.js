'use strict';

module.exports = {
	app: {
		title: 'Joga Bonito',
		description: 'The real way to play fantasy football',
		keywords: 'soccer, football, fantasy, league'
	},
	kimono: {
		URL: 'https://www.kimonolabs.com/api/',
		apiKey: process.env.KIMONO_KEY || '9f3de7fbf94a75608b4e10adb275c151',
		secretToken: process.env.KIMONO_SECRET || '872UJIwbvM2K0e83jXQGGqlhHzqbWdOY',
		league: {
			apiURL: process.env.LEAGUE_API || 'dgbylo0g'
		},
		teams: {
			apiURL: process.env.TEAMS_API || 'dgbylo0g'
		},
		players: {
			apiURL: process.env.PLAYERS_API || 'dgbylo0g'
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
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js'
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