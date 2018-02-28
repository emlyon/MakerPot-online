initPotList();


function initPotList() {

    var potContent = document.getElementById("potContent");

    potContent.innerHTML = (`<h2 class="titre" >Liste des potagers</h2>
            <p class="smallText">Cliquez sur un potager pour avoir les informations le concernant</p>
            <div id="potList" class="squareGrid">
            </div>`);

    var potList = document.getElementById("potList");


    makersPotpots.forEach(function (potpot) {
        potList.innerHTML = potList.innerHTML + (newPotThumb(potpot.name, potpot.feeds, potpot.token));
    });
}

function newPotThumb(name, feeds, token) {

    return (`<div class="potpot ${name}">
        <img src="medias/potThumb/${name}.jpg" alt="${name} picture" class="image" height="100%" width="100%">
        <div class="middle" onclick="initPotData('${name}','${feeds}','${token}')">
            <div class="text">${name}</div>
        </div>
    </div>`);
}



function initPotData(name, feed, token) {

    let potContent = document.getElementById("potContent");

    ///The group/feed name and the API token (could be smart to parse this on server side)
    let feedName = name;
    let apiToken = token;
    const potpotName = name

    potContent.innerHTML = (`<h2 id="potpotName">Loading datas</h2>
            <p id="potpotDescription">Si ça attends trop longtemps il y a peu être un problème</p>
            <div id="dataList" class="squareGrid">
            </div>`);
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

    var potpotName = document.getElementById("potpotName");
    var potpotDescription = document.getElementById("potpotDescription");

    potpotName.innerHTML = data.name;
    potpotDescription.innerHTML = data.description;

    var dataList = document.getElementById("dataList");
    dataList.innerHTML = ("");

    (data.feeds).forEach(function (element) {



        if (element.stream != undefined) {

            let html = "";

            let squareImg = (element.name == "waterlevel") ? "medias/img/water.jpg" : "medias/img/pot01.jpg";

            if (element.name == "waterlevel") {

                let lvlClass = (element.stream.value == 2) ? "highWater" : (element.stream.value == 1) ? "medWater" : "lowWater";


                html = `<div class="potpot ${potpotName}">
                        <div class="wave ${lvlClass}"></div>
                        <div class="middle">
                            <div class="text">${element.name} = ${element.stream.value} </div>
                        </div>
                    </div>`;


            } else if (element.name == "leds") {
                console.log("toto");

                let lightStatu = (element.stream.value == 1) ? "lightON" : "lightOFF";
                
                html = `<div class="potpot ${potpotName}">
                        <div class="light ${lightStatu}"></div>
                        <div class="middle">
                            <div class="text">${element.name} = ${element.stream.value} </div>
                        </div>
                    </div>`;


            } else {

                let date = Date.parse(element.last_value_at);
                let timeDif = parseInt((Date.now() - date) / 1000);

                html = `<div class="potpot ${potpotName}">
                        <img src="${squareImg}" alt="${element.name}" class="image" height="100%" width="100%">
                        <div class="middle">
                            <div class="text">${element.name} = ${element.stream.value} </div>
                        </div>
                    </div>`;
            }

            dataList.innerHTML = dataList.innerHTML + (html.toString());
        }

    });

}
