'use strict';

module.exports = function (socket) {
	socket.emit('send:name', {
		name: 'Bob'
	});

	setInterval(function () {
		socket.emit('send:time', {
			time: (new Date()).toString()
		});
	}, 1000);
};
