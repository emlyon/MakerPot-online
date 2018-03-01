addEventListener( 'load', e => {
    const splitPath = location.pathname.split( '/' );
    const cred = creds[ splitPath[ splitPath.length - 1 ].split( '.' )[ 0 ] ];
    const link = `https://io.adafruit.com/api/v2/${ cred.username }/feeds?X-AIO-Key=${ cred.key }`;
    // console.log( link );

    ( function getData() {
        fetch( link ).then( r => r.json() )
            .then( data => {
                console.log( data );

                data.forEach( d => {
                    let survol = null,
                        value = null;
                    switch( d.key ){
                        case 'waterlevel':
                            survol = document.querySelector( '.water' );
                            break;
                        case 'pump':
                            survol = document.querySelector( '.pump' );
                            break;
                        case 'leds':
                            survol = document.querySelector( '.leds' );
                            break;
                    }

                    if( survol != null ){
                        survol.querySelector( 'span' ).innerText = d.last_value;
                    }
                } );

                [].forEach.call( document.querySelectorAll( '.info-text' ), d => d.style.opacity = 1 );
            } )
            .catch( e => console.log( `error: ${ e }` ) );

        setTimeout( getData, 60000 );
    } )();
} );
