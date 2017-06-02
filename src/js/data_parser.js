( function () { 

	let savedFields = [ 'createdAt', 'emojis', 'emotionsByEmoji', 'emotionsByHashtag', 'foodWords', 'foodWords2', 'hashtags', 'text' ];
	let savedFieldsType = [ 'string', 'array', 'array', 'array', 'array', 'array', 'array', 'string' ];

	// Start parsing

	parse(19);

	function parse ( index ) {

		Papa.parse ( 'resources/raw_data/emojiOutfile_' + index + '.csv' , {
	
			download: true,

			error: function(err, file, inputElem, reason) {
				
				console.error( err, file, inputElem, reason );

			},

			complete: function( file ) {

				let l = 0;
				let objectFile = {};

				for ( let i = 1; i < file.data.length - 1; i ++ ) {

					let user = {};

					for ( let j = 0; j < file.data[ i ].length; j ++ ) {

						for ( let k = 0; k < savedFields.length; k ++ ) {

							if ( file.data[ 0 ][ j ] == savedFields[ k ] ) {

								let type = savedFieldsType[ k ];
								
								switch ( type ) {

									case 'string':

										user[ file.data[ 0 ][ j ] ] = file.data[ i ][ j ];

									break;

									case 'array':

										let array = file.data[ i ][ j ];
										array = array.substring ( 1 );
										array = array.substring ( array.length - 1, 0 );

										if ( array.length > 0 ) {

											array = array.split ( ', ' );

										} else {

											array = undefined;

										}

										user[ file.data[ 0 ][ j ] ] = array;

									break;

								}

							}

						}

						user[ 'timeSinceEpoch' ] = new Date ( user.createdAt ).getTime();

					}

					objectFile[ i - 1 ] = user;

				}

				var json = JSON.stringify(objectFile);
				var blob = new Blob([json], {type: "application/json"});
				var url  = window.URL.createObjectURL(blob);
		
				var a = document.createElement('a');
				a.download    = 'emojiOutfile_' + index + ".json";
				a.href        = url;
				a.textContent = "Download backup.json";
				a.click();

				if ( index < 30 ) {

					console.log(index);
					parse ( index + 1 );

				}

			}

		} );

	}

} )();