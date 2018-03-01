addEventListener( 'load', e => {
    let split = location.pathname.split( '/' );
    const cred = creds[ split[ split.length-1 ].split( '.' )[ 0 ] ];

    function getData() {
        let link = `https://io.adafruit.com/api/v2/${ cred.username }/feeds?X-AIO-Key=${ cred.key }`;
        // console.log( link );

        fetch( link ).then( r => r.json() )
        .then( data => computeData( data ) )
        .catch( e => console.log( `error: ${ e }` ) );
    }

    function computeData( data ) {
        console.log( data );

        leds:{
            on: "YOU ARE MY SUNSHINE",
            off: "IF YOU LOVE ME LET ME SLEEP"
        }

    }

    ///First run of function
    getData();
    setInterval( getData, 60000 );
} );
