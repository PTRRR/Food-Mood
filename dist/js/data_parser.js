(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {

	var savedFields = ['createdAt', 'emojis', 'emotionsByEmoji', 'emotionsByHashtag', 'foodWords', 'foodWords2', 'hashtags', 'text'];
	var savedFieldsType = ['string', 'array', 'array', 'array', 'array', 'array', 'array', 'string'];

	// Start parsing

	parse(19);

	function parse(index) {

		Papa.parse('resources/raw_data/emojiOutfile_' + index + '.csv', {

			download: true,

			error: function error(err, file, inputElem, reason) {

				console.error(err, file, inputElem, reason);
			},

			complete: function complete(file) {

				var l = 0;
				var objectFile = {};

				for (var i = 1; i < file.data.length - 1; i++) {

					var user = {};

					for (var j = 0; j < file.data[i].length; j++) {

						for (var k = 0; k < savedFields.length; k++) {

							if (file.data[0][j] == savedFields[k]) {

								var type = savedFieldsType[k];

								switch (type) {

									case 'string':

										user[file.data[0][j]] = file.data[i][j];

										break;

									case 'array':

										var array = file.data[i][j];
										array = array.substring(1);
										array = array.substring(array.length - 1, 0);

										if (array.length > 0) {

											array = array.split(', ');
										} else {

											array = undefined;
										}

										user[file.data[0][j]] = array;

										break;

								}
							}
						}

						user['timeSinceEpoch'] = new Date(user.createdAt).getTime();
					}

					objectFile[i - 1] = user;
				}

				var json = JSON.stringify(objectFile);
				var blob = new Blob([json], { type: "application/json" });
				var url = window.URL.createObjectURL(blob);

				var a = document.createElement('a');
				a.download = 'emojiOutfile_' + index + ".json";
				a.href = url;
				a.textContent = "Download backup.json";
				a.click();

				if (index < 30) {

					console.log(index);
					parse(index + 1);
				}
			}

		});
	}
})();

},{}]},{},[1]);
