///The group/feed name and the API token (could be smart to parse this on server side)
const username = "ste1";
const apiToken = "0debe2dd12964d91841747106f174353"

// function sendData( data ) {
//     let dataToSend = Object.entries( data ).map( d => d[ 0 ] + "=" + d[ 1 ] ).join( '&&' );
//
//     let link = `https://io.adafruit.com/api/groups/${ username }/send.json?x-aio-key=${ apiToken }&${ dataToSend }`;
//
//     fetch( link ).then( r => r.json() )
//         .then( data => computeData( data ) )
//         .catch( e => console.log( `error: ${ e }` ) )
// }

function getData() {
    let link = `https://io.adafruit.com/api/groups/${ username }/receive.json?x-aio-key=${ apiToken }`;
    // console.log( link );

    fetch( link ).then( r => r.json() )
        .then( data => computeData( data ) )
        .catch( e => console.log( `error: ${ e }` ) );
}

function computeData( data ) {
    console.log( data );

    document.getElementById( "potpotName" ).innerText = data.name;
    document.getElementById( "potpotDescription" ).innerHTML = data.description;

    let dataList = document.getElementById( "potpotList" );
    // dataList.innerHTML = data.feeds.reduce( ( html, element ) => {
    //     let date = Date.parse( element.last_value_at );
    //     let timeDif = parseInt((Date.now() - date) / 1000);
    //     if( element.stream != null ) return html + `<p>${ element.name }: ${ element.stream.value } </p>`;
    //     else return html;
    // }, '' );
}

///First run of function
getData();
setInterval( getData, 60000 );
