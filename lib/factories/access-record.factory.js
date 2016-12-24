'use strict';

var regEx = new RegExp("[0-9]+");;

function hasNumbers(str) {
	return regEx.exec(str);
}

module.exports = {
	parser: function parser(line) {
		var sMsg = line.split(','),
			urlParts = sMsg[4].split('/'),
			uri = sMsg[4];

		if (sMsg[3] === 'GET') {
			// we need to remove ? 
			queryBlockIdx = sMsg[4].indexOf('?');
			if (queryBlockIdx > 0) {
				uri = sMsg[4].substring(0, queryBlockIdx);
			} else {
				var foundNumber = false
				for (var i = 0; i < urlParts.length && !foundNumber; i++) {
					foundNumber = hasNumbers(urlParts[i]);
					if (foundNumber) {
						uri += urlParts[i] + '/';
					}
				}

			}
		}

		return {
			time: sMsg[0] >> 0,
			host: sMsg[1],
			endPointPort: sMsg[2],
			method: sMsg[3],
			uri: uri,
			status: sMsg[5] >> 0,
			contentLength: sMsg[6] >> 0,
			respTime: sMsg[7] >> 0
		};
	}
};