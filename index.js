const charbox = document.getElementById("charbox");
var recentsearch = search("");
var currentpage = 0;
var currentline = 1;

let d = new Date()
let seed = d.getFullYear().toString();
seed += d.getMonth().toString();
seed += d.getDate().toString();

var mat = new Math.seedrandom("beeep boop boop boop beeep");

function makeid(length, seed) {
    let result = '';
    const characters = Object.values(chars).join("");
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(seed() * charactersLength));
      counter += 1;
    }
    return result;
}

const str = makeid(5, mat);

function search(word) {
    var results = [];

    Object.keys(chars).forEach(element => {
        if (element.toLowerCase().includes(word.toLowerCase())) {
            results.push(element)
        }
    });

    return results;
}

function updatepg(pgnum) {
    let len = recentsearch.length;

    if (pgnum * 70 > len) { return; }

    charbox.innerHTML = "";
    [...Array(70).keys()].forEach(num => {
        if (chars[recentsearch[(pgnum)*56 + num]] != undefined) {
            charbox.innerHTML += "<button class=\"characterbutton\">" + chars[recentsearch[(pgnum)*56 + num]] + "</button>";
        }
    })
    
}

function decpg() {
    if ((currentpage+1) * 70 < recentsearch.length) {
        currentpage += 1;
        updatepg(currentpage)
    }
}

function incpg() {
    if (currentpage > 0) {
        currentpage -= 1;
        updatepg(currentpage)
    }
}

updatepg(currentpage)

function searchchange() {
    recentsearch = search(document.getElementById('searchbar').value);
    currentpage = 0;
    updatepg(0);
}

function enter() {
    let ind = 0;
    let correctant = 0;
    let ar = Array.from(document.getElementsByClassName("line-" + currentline.toString())[0].children);

    for (var letter in ar) {
        letter = ar[letter];

        if (letter.innerText == "") {
            return;
        }
    }

    for (var letter in ar) {
        letter = ar[letter];

        if (letter.innerText == str[ind]) {
            letter.classList.add("soylent");
            correctant += 1;
        }

        else if (str.includes(letter.innerText) && letter.innerText != "") {
            letter.classList.add("somewhere");
        }

        else {
            letter.classList.add("nobe");
        }

        ind += 1;
    }

    if (correctant == 5) {
        let mes = document.getElementById("screen");
        document.getElementById("endmessage").textContent = "Right!"
        document.getElementById("endtext").textContent = "The word was: " + str;
        mes.style.opacity = 1;
        mes.style.pointerEvents = "all";
    }

    currentline += 1;

    if (currentline - 1 == 6) {
        let mes = document.getElementById("screen");
        document.getElementById("endmessage").textContent = "Wrong!"
        document.getElementById("endtext").textContent = "The word was: " + str;
        mes.style.opacity = 1;
        mes.style.pointerEvents = "all";
    }
}

function del() {
    let last = Array.from(document.getElementsByClassName("line-" + currentline.toString())[0].children)[4];
    last.classList.remove("pending");
    last.innerText = "";
}

function characterpressed(char) {
    let letters = Array.from(document.getElementsByClassName("line-" + currentline.toString())[0].children);
    let done = false;

    for (let letter in letters) {
        if (done) { continue; }

        letter = letters[letter]

        if (!letter.classList.contains("pending")) {
            letter.innerText = char;
            letter.classList.add("pending");
            done = true;
            continue;
        }
    }
}

document.addEventListener("click", ({ target }) => {
    if (target.matches("button") && target.className == "characterbutton") {
        characterpressed(target.innerText);
    }
});