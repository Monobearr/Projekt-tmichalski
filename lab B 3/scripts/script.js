function sprawdzFormularz() {
    console.log("sprawdzanie formularza");
    var zadanieInput = document.getElementById("input-task").value;
    var dataInput = document.getElementById("input-date").value;

    if (zadanieInput === "") {
        alert("Pole zadania nie może być puste!");
        return false;
    }
    if (zadanieInput.length < 3 || zadanieInput.length > 255) {
        alert("Zadanie musi zawierać od 3 do 255 znaków");
        return false;
    }

    if (dataInput) {
        var dzisiejszaData = new Date();
        var dataDoPorownania = new Date(dataInput);
        if (dataDoPorownania < dzisiejszaData && dataDoPorownania.toDateString() !== dzisiejszaData.toDateString()) {
            alert("Data musi być dzisiejsza lub późniejsza");
            return false;
        }
    }
    return true;
}

function pobierzListeZadan() {
    return JSON.parse(localStorage.getItem("tasksList")) || [];
}

function zapiszListeZadan(listaZadan) {
    localStorage.setItem("tasksList", JSON.stringify(listaZadan));
}

function pokazDane() {
    var listaZadan = pobierzListeZadan();
    var html = "";

    listaZadan.forEach(function (element, index) {
        html += "<div class='task' data-index='" + index + "'>";
        html += "<input class='checkbox' type='checkbox' " + (element.done ? "checked" : "") + ">";
        html += "<div class='name' contentEditable='true'>" + element.name + "</div>";
        html += "<div class='date' contentEditable='true'>" + element.date + "</div>";
        html += "<button type='submit' onclick='usunZadanie(" + index + ")' class='delete-button'>";
        html += "<img class='delete-icon' src='images/icons8-delete.svg'></button>";
        html += "</div>";
    });

    document.getElementById("tasksContainer").innerHTML = html;
    dodajEventListenersDoCheckboxow();
}


function dodajZadanie() {
    if (sprawdzFormularz()) {
        var zadanieInput = document.getElementById("input-task").value;
        var dataInput = document.getElementById("input-date").value;

        var listaZadan = pobierzListeZadan();

        listaZadan.push({
            name: zadanieInput,
            date: dataInput,
            done: false
        });

        zapiszListeZadan(listaZadan);
        pokazDane();
        document.getElementById("input-task").value = "";
        document.getElementById("input-date").value = "";
    }
}

function usunZadanie(index) {
    var listaZadan = pobierzListeZadan();

    if (confirm("Czy na pewno chcesz usunąć to zadanie?")) {
        listaZadan.splice(index, 1);
        zapiszListeZadan(listaZadan);
        pokazDane();
    }
}

function szukajZadan() {
    let poleWyszukiwania = document.getElementById("search-input");
    poleWyszukiwania.addEventListener("input", function () {
        const tekstWyszukiwania = this.value.replace(/\s+/g, '');
        if (tekstWyszukiwania.length >= 2) {
            filtrujZadania(tekstWyszukiwania);
        } else {
            pokazDane();
        }
    });
}

function filtrujZadania(tekstWyszukiwania) {
    var listaZadan = pobierzListeZadan();
    var html = "";

    var oczyszczonyTekstWyszukiwania = tekstWyszukiwania.replace(/\s+/g, '').toLowerCase();

    listaZadan.forEach(function (element, index) {
        if (element.name.replace(/\s+/g, '').toLowerCase().includes(oczyszczonyTekstWyszukiwania)) {
            html += "<div class='task'>";
            html += "<input class='checkbox' type='checkbox'>";
            html += "<div class='name' contentEditable='true'>" + podkreslNazwe(element.name, tekstWyszukiwania) + "</div>";
            html += "<div class='date' contentEditable='true'>" + element.date + "</div>";
            html += "<button type='submit' onclick='usunZadanie(" + index + ")' class='delete-button'>";
            html += "<img class='delete-icon' src='images/icons8-delete.svg'></button>";
            html += "</div>";
        }
    });

    document.getElementById("tasksContainer").innerHTML = html;
}

function podkreslNazwe(nazwa, tekstWyszukiwania) {
    var oczyszczonyTekstWyszukiwania = tekstWyszukiwania.replace(/\s+/g, '');
    var regEx = new RegExp(oczyszczonyTekstWyszukiwania.split('').join('\\s*'), "gi");
    return nazwa.replace(regEx, function(match) {
        return "<span style='background-color: yellow'>" + match + "</span>";
    });
}

function aktualizujZadanie(index, nazwa, data) {
    var listaZadan = pobierzListeZadan();
    if (listaZadan[index]) {
        listaZadan[index].name = nazwa;
        listaZadan[index].date = data;
        zapiszListeZadan(listaZadan);
    }
}

function dodajEventListenersDoEdycji() {
    var edytowalnePola = document.querySelectorAll('.name, .date');

    edytowalnePola.forEach(function(pole) {
        pole.addEventListener('blur', function() {
            var index = this.closest('.task').getAttribute('data-index');
            var nazwa = this.closest('.task').querySelector('.name').textContent;
            var data = this.closest('.task').querySelector('.date').textContent;
            aktualizujZadanie(index, nazwa, data);
        });
    });
}

function aktualizujStatusZadania(index, wykonane) {
    var listaZadan = pobierzListeZadan();
    if (listaZadan[index]) {
        listaZadan[index].done = wykonane;
        zapiszListeZadan(listaZadan);
    }
}

function dodajEventListenersDoCheckboxow() {
    var checkboxes = document.querySelectorAll('.task .checkbox');

    checkboxes.forEach(function(checkbox, index) {
        checkbox.addEventListener('change', function() {
            aktualizujStatusZadania(index, this.checked);
        });
    });
}
window.onload = function() {
    pokazDane();
    dodajEventListenersDoEdycji();
    dodajEventListenersDoCheckboxow();
    szukajZadan();
};