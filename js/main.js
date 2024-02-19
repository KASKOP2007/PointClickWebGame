document.getElementById("mainTitle").innerText = "Point and click adventure game"
//game window refrence
const gameWindow = document.getElementById("gameWindow");

//gamestate
const gameState = {
    "door2locked": true,
}

//main character
const mainCharacter = document.getElementById("mainCharacter")
const offsetCharacter = 16;

//inventory
const inventoryBox = document.getElementById("inventoryBox");
const inventoryList = document.getElementById("inventoryList");

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
            console.log('door');

            mainCharacter.style.backgroundColor = "#FFFF00";
            door1.style.opacity = 0.2;
            sign.style.opacity = 1;
            if (document.getElementById("key1") !== null) {
                console.log('found key');
                document.getElementById("key1").remove();
                const keyElement = document.createElement("li");
                keyElement.id = "inv-key";
                keyElement.innerText = "Key";
                inventoryBox.appendChild(keyElement);
            }
            break;
        case "door2":
            if (gameState.door2locked == true) {
                //check if we have key
                if (document.getElementById("inv-key") !== null) {
                    gameState.door2locked = false;
                    console.log("door unlocked!")
                }
                else {
                    //yes -> unlock door
                    alert("Door is locked!")
                }
            } else {
                console.log("enter building")
            }
            break;

        case "sign":
            mainCharacter.style.backgroundColor = "FFFF00";
            sign.style.opacity = 0.2;
            door1.style.opacity = 1;
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