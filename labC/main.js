let map = L.map('map').setView([53.422478425771686, 14.50215102755259], 14);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);
let marker = L.marker([53.90396435493905, 14.253947192053328]).addTo(map);
marker.bindPopup("<strong>Hello!</strong><br>This is a popup.");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}
document.getElementById("puzzle").addEventListener("dragend", check_puzzles);

document.getElementById("saveButton").addEventListener("click", function() {
 //   document.getElementById("puzzle").addEventListener("dragend", check_puzzles);
    document.getElementById("puzzle").style.background = "#793030";


    leafletImage(map, function (err, canvas) {
        let can1 = document.getElementById("can_1");
        let can1_context = can1.getContext("2d");
        can1_context.drawImage(canvas, 0, 0, 175, 100, 0, 0, 175, 100);

        let can2 = document.getElementById("can_2");
        let can2_context = can2.getContext("2d");
        can2_context.drawImage(canvas, 175, 0, 175, 100, 0, 0, 175, 100);

        let can3 = document.getElementById("can_3");
        let can3_context = can3.getContext("2d");
        can3_context.drawImage(canvas, 350, 0, 175, 100, 0, 0, 175, 100);

        let can4 = document.getElementById("can_4");
        let can4_context = can4.getContext("2d");
        can4_context.drawImage(canvas, 525, 0, 175, 100, 0, 0, 175, 100);

        let can5 = document.getElementById("can_5");
        let can5_context = can5.getContext("2d");
        can5_context.drawImage(canvas, 0, 100, 175, 100, 0, 0, 175, 100);

        let can6 = document.getElementById("can_6");
        let can6_context = can6.getContext("2d");
        can6_context.drawImage(canvas, 175, 100, 175, 100, 0, 0, 175, 100);

        let can7 = document.getElementById("can_7");
        let can7_context = can7.getContext("2d");
        can7_context.drawImage(canvas, 350, 100, 175, 100, 0, 0, 175, 100);

        let can8 = document.getElementById("can_8");
        let can8_context = can8.getContext("2d");
        can8_context.drawImage(canvas, 525, 100, 175, 100, 0, 0, 175, 100);

        let can9 = document.getElementById("can_9");
        let can9_context = can9.getContext("2d");
        can9_context.drawImage(canvas, 0, 200, 175, 100, 0, 0, 175, 100);

        let can10 = document.getElementById("can_10");
        let can10_context = can10.getContext("2d");
        can10_context.drawImage(canvas, 175, 200, 175, 100, 0, 0, 175, 100);

        let can11 = document.getElementById("can_11");
        let can11_context = can11.getContext("2d");
        can11_context.drawImage(canvas, 350, 200, 175, 100, 0, 0, 175, 100);

        let can12 = document.getElementById("can_12");
        let can12_context = can12.getContext("2d");
        can12_context.drawImage(canvas, 525, 200, 175, 100, 0, 0, 175, 100);

        let can13 = document.getElementById("can_13");
        let can13_context = can13.getContext("2d");
        can13_context.drawImage(canvas, 0, 300, 175, 100, 0, 0, 175, 100);

        let can14 = document.getElementById("can_14");
        let can14_context = can14.getContext("2d");
        can14_context.drawImage(canvas, 175, 300, 175, 100, 0, 0, 175, 100);

        let can15 = document.getElementById("can_15");
        let can15_context = can15.getContext("2d");
        can15_context.drawImage(canvas, 350, 300, 175, 100, 0, 0, 175, 100);

        let can16 = document.getElementById("can_16");
        let can16_context = can16.getContext("2d");
        can16_context.drawImage(canvas, 525, 300, 175, 100, 0, 0, 175, 100);

        let puzzlePieces = document.querySelectorAll('#puzzle_pieces .item');
        let piecesArray = Array.from(puzzlePieces);
        shuffleArray(piecesArray);

        // Append shuffled pieces to the container
        let puzzleContainer = document.getElementById('puzzle_pieces');
        puzzleContainer.innerHTML = ''; // Clear existing content
        piecesArray.forEach(piece => puzzleContainer.appendChild(piece));
    });


});

function check_puzzles() {
    let tmp_check = true;

    let check_1 = document.getElementById("d1").querySelector("#can_1");
    if (check_1 == null) {
        tmp_check = false;
    }
    let check_2 = document.getElementById("d2").querySelector("#can_2");
    if (check_2 == null) {
        tmp_check = false;
    }

    let check_3 = document.getElementById("d3").querySelector("#can_3");
    if (check_3 == null) {
        tmp_check = false;
    }

    let check_4 = document.getElementById("d4").querySelector("#can_4");
    if (check_4 == null) {
        tmp_check = false;
    }

    let check_5 = document.getElementById("d5").querySelector("#can_5");
    if (check_5 == null) {
        tmp_check = false;
    }

    let check_6 = document.getElementById("d6").querySelector("#can_6");
    if (check_6 == null) {
        tmp_check = false;
    }

    let check_7 = document.getElementById("d7").querySelector("#can_7");
    if (check_7 == null) {
        tmp_check = false;
    }

    let check_8 = document.getElementById("d8").querySelector("#can_8");
    if (check_8 == null) {
        tmp_check = false;
    }

    let check_9 = document.getElementById("d9").querySelector("#can_9");
    if (check_9 == null) {
        tmp_check = false;
    }

    let check_10 = document.getElementById("d10").querySelector("#can_10");
    if (check_10 == null) {
        tmp_check = false;
    }

    let check_11 = document.getElementById("d11").querySelector("#can_11");
    if (check_11 == null) {
        tmp_check = false;
    }

    let check_12 = document.getElementById("d12").querySelector("#can_12");
    if (check_12 == null) {
        tmp_check = false;
    }

    let check_13 = document.getElementById("d13").querySelector("#can_13");
    if (check_13 == null) {
        tmp_check = false;
    }

    let check_14 = document.getElementById("d14").querySelector("#can_14");
    if (check_14 == null) {
        tmp_check = false;
    }

    let check_15 = document.getElementById("d15").querySelector("#can_15");
    if (check_15 == null) {
        tmp_check = false;
    }

    let check_16 = document.getElementById("d16").querySelector("#can_16");
    if (check_16 == null) {
        tmp_check = false;
    }

    if(tmp_check === true){
        alert("Brawo!");
        console.log("Brawo!");
    }else{
        console.log("No nie do końca...");
    }
}

document.getElementById("getLocation").addEventListener("click", function(event) {
    if (! navigator.geolocation) {
        console.log("No geolocation.");
    }

    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        map.setView([lat, lon]);
        document.getElementById("latitude").innerText = position.coords.latitude;
        document.getElementById("longitude").innerText = position.coords.longitude;
    }, positionError => {
        console.error(positionError);
    });
});


let items = document.querySelectorAll('.item');
for (let item of items) {
    item.addEventListener("dragstart", function(event) {
        this.style.border = "5px dashed #D8D8FF";
        event.dataTransfer.setData("text", this.id);
    });

    item.addEventListener("dragend", function(event) {
        this.style.borderWidth = "0";
    });
}

let targets = document.querySelectorAll(".drag-target");
for (let target of targets) {
    target.addEventListener("dragover", function (event) {
        event.preventDefault();
    });
    target.addEventListener("drop", function (event) {
        let myElement = document.querySelector("#" + event.dataTransfer.getData('text'));
        this.appendChild(myElement)
    }, false);
}