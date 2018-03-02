initPotList();


function initPotList() {

    var potContent = document.getElementById("content");

    potContent.innerHTML = (`<div id="potList" class="squareGrid">`);

    var potList = document.getElementById("potList");


    makersPotpots.forEach(function (potpot) {
        potList.innerHTML = potList.innerHTML + (newPotThumb(potpot.name, potpot.feeds, potpot.token));
    });
}

function newPotThumb(name, feeds, token) {

    return (`<div class="potpot carre-hover ${name}">
        <img src="medias/potThumb/${name}.jpg" alt="${name} picture" class="image" height="100%" width="100%">
        <div class="middle" onclick="initPotData('${name}','${feeds}','${token}')">
            <div class="text">${name}</div>
        </div>
    </div>`);


}



function initPotData(name, feed, token) {

    let potContent = document.getElementById("content");

    ///The group/feed name and the API token (could be smart to parse this on server side)
    let feedName = name;
    let apiToken = token;
    const potpotName = name

    /*    potContent.innerHTML = (`<h2 id="potpotName">Loading datas</h2>
                <p id="potpotDescription">Si ça attends trop longtemps il y a peu être un problème</p>
                <div id="dataList" class="squareGrid">
                </div>`);*/
    
    let city = '';
    
    if ( name.startsWith('ecu') ){
        city = "Ecully";
    } else if (name.startsWith('ste')){
        city = "Saint-Etienne";
    } else if (name.startsWith('par')){
        city = "Paris";
    }


    potContent.innerHTML = ` <div id="pot-content-background"></div>
            <div id="pot-content">
                <div id="pot-desc-bis">
                    <p id="potpot-description">
                        ${city}<br> makers'pot
                        <br> #${name[3]}
                    </p>
                    <div id="pot-alert" hidden>
                        ATTENTION : Niveau d'eau bas !
                    </div>
                </div>
                <div id="data-visu">
                    <div class="potpot">
                        <div id="datas-block">
                <div> Datas are loading, please wait</div>
    
                </div>
                <br>
                <form>
                    <input type="email"><input type="submit" value="Submit">
                </form>

</div></div></div>`;




    getDatas(feed, token);

}

function getDatas(feedName, apiToken) {
    var ioLink = `https://io.adafruit.com/api/groups/${feedName}/receive.json?x-aio-key=${apiToken}`;
    console.log(ioLink);
    fetch(ioLink).then(r => r.json())
        .then(data => computeData(data))
        .catch(e => console.log("pas ok"))
}

function computeData(data) {
    console.log(data);

    // var potpotName = document.getElementById("potpotName");

    //  var potpotDescription = document.getElementById("potpotDescription");

    //  potpotName.innerHTML = data.name;
    // potpotDescription.innerHTML = data.description;

    var dataBlocks = document.getElementById("datas-block");
    dataBlocks.innerHTML = ("");

    let waterBlock = '',
        pumpBlock = '',
        ledsBlock = '';

        (data.feeds).forEach(function (element) {

            if (element.stream != undefined) {

                let html = "";

                let squareImg = (element.name == "waterlevel") ? "medias/img/water.jpg" : "medias/img/pot01.jpg";

                if (element.name == "waterlevel") {

                    let redLvl = (element.stream.value == 2) ? 100 : (element.stream.value == 1) ? 50 : 10;


                    waterBlock = `<div class="carre-data carre-hover water-level">
                                <div class="carre-gris" style="height: ${100-redLvl}%;">
                                </div>
                                <div class="carre-rouge" style="height: ${redLvl}%;">
                                </div>
                                <div class="text-data">water level</div>
                                <div class="middle" hidden>
                                    <div class="text"> data unavailable </div>
                                </div>
                            </div>`;


                } else if (element.name == "leds") {
                    
                    let buttonTxt = "";
                    console.log("leds !!");
                    if (element.stream.value == 1){
                        redLvl= 100;
                        buttonTxt = "Eteindre";
                    } else {
                        redLvl = 0;
                        buttonTxt = "Allumer";
                    }
                    

                    ledsBlock = `<div class="carre-data carre-hover light-statut">
                                <div class="carre-gris" style="height: ${100-redLvl}%;">
                                </div>
                                <div class="carre-rouge" style="height: ${redLvl}%;">
                                </div>
                                <div class="text-data">light</div>
                                <div class="middle">
                                    <div class="text">${buttonTxt}</div>
                                </div>
                            </div>`;


                } else if (element.name == "pump") {
                    

                    let redLvl = (element.stream.value == 1) ? 100 : 0;

                    pumpBlock = `<div class="carre-data carre-hover pump-statu">
                                <div class="carre-gris" style="height: ${100-redLvl}%;">
                                </div>
                                <div class="carre-rouge" style="height: ${redLvl}%;">
                                </div>
                                <div class="text-data">pump</div>
                                <div class="middle" hidden>
                                    <div class="text"> Bonjour </div>
                                </div>

                            </div>`;


                }

            }

        });
    
    dataBlocks.innerHTML = (waterBlock+pumpBlock+ledsBlock).toString();

}
