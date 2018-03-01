addEventListener( 'load', e => {
    let splitPath = location.pathname.split( '/' );
    const cred = creds[ splitPath[ splitPath.length - 1 ].split( '.' )[ 0 ] ];

    ( function getData() {
        let link = `https://io.adafruit.com/api/v2/${ cred.username }/feeds?X-AIO-Key=${ cred.key }`;
        // console.log( link );

        fetch( link ).then( r => r.json() )
            .then( data => {
                console.log( data );

            } )
            .catch( e => console.log( `error: ${ e }` ) );

        setTimeout( getData, 60000 );
    } )();
} );
