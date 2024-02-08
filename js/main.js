document.getElementById("mainTitle").innerText = "Point and click adventure game"

const gameWindow = document.getElementById("gameWindow");

const mainCharacter = document.getElementById("mainCharacter")
const offsetCharacter = 16;

const door1 = document.getElementById("door1")

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left
    var y = e.clientY - rect.top

    console.log(e.target.id);
    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top = y - offsetCharacter + "px";


    switch (e.target.id) {
        case "door1":
            mainCharacter.style.backgroundColor = "#FFFF00"
            door1.style.opacity = 0.5;
            sign.style.opacity = 0.5;
            break;
        case "sign":
            mainCharacter.style.backgroundColor = "#FFFF00"
            door1.style.opacity = 0.5;
            sign.style.opacity = 0.5;
            break;


        default:
            //explode
            mainCharacter.style.backgroundColor = "#442c1c"
            door1.style.opacity = 1;
            sign.style.opacity = 1;
            break;

    }

    if (e.target.id == "door1") {
        mainCharacter.style.backgroundColor = "#FFFF00"
        door1.style.opacity = 0.5;
    } else {

    }
}