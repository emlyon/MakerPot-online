///The group/feed name and the API token (could be smart to parse this on server side)
const feedName = "ste1";
const apiToken = "0debe2dd12964d91841747106f174353"
const potpotName = "ste1"




function sendRandomDatas() {
    randomizeDatas();

    sendData((Object.entries(datasObj)));
}


function sendData(dataArr) {

    let dataToSend = "";
    dataArr.forEach(function (element) {
        console.log(element);
        dataToSend += element[0] + "=" + element[1].value + "&&"
    });
    dataToSend = dataToSend.slice(0, -2);


    let ioLink = `https://io.adafruit.com/api/groups/${feedName}/send.json?x-aio-key=${apiToken}&${dataToSend}`;
    fetch(ioLink).then(r => r.json())
        .then(data => computeData(data))
        .catch(e => console.log("pas ok"))
}


function getDatas() {
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

    var dataList = document.getElementById("potpotList");
    dataList.innerHTML = ("");

    (data.feeds).forEach(function (element) {
        if (element.stream != undefined) {
            let date = Date.parse(element.last_value_at);
            let timeDif = parseInt((Date.now() - date) / 1000);

            let html = `<div class="potpot ${potpotName}">
                        <div class="middle">
                            <div class="text">${element.name} = ${element.stream.value} </div>
                        </div>
                    </div>`;

            dataList.innerHTML = dataList.innerHTML + (html.toString());
        }

    });

}

const getRandom = (min, max) => Math.round(Math.random() * (max - min) + min);

const getTimeAgo = (prevTimestamp) => {
    let s = parseInt((Date.now() - prevTimestamp) / 1000);
    if (s < 60) {
        return "less than one minute ago"
    } else if (s < 3600) {
        return (`${(s-(s%60))/60} minutes ago`)
    } else {
        return (`more than ${(s-(s%3600))/3600} hours ago`)
    }
}

///First run of function
getDatas();

///Update data every 10s
function verifyData(){
    getDatas();
}
var verifDataTimer = setInterval(function(){ verifyData() }, 10000);
