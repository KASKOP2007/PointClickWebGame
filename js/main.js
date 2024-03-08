document.getElementById("mainTitle").innerText = "Point and Click adventure game";

//game state
let gameState = {
    "door2locked": true,
    "inventory": [],

}

localStorage.removeItem("gameState");

// handle browser storage
if (typeof (Storage) !== "undefined") {
    //check if gamestate already exists
    if (localStorage.gameState) {
        // load savegame into local variable
        gameState = JSON.parse(localStorage.gameState)

    } else {
        // save local gamestate into browser storage
        localStorage.setItem("gameState", JSON.stringify(gameState))
    }
} else {
    // sorry! no web storage support
    alert('Web storage not supported')
}

//Game window reference
const gameWindow = document.getElementById("gameWindow");

if (gameState.keyPickedUp) {
    document.getElementById("key1").remove();
}


const sec = 1000;

//Main Character
const mainCharacter = document.getElementById("mainCharacter");
const offsetCharacter = 16;

//speech bubbles
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");
const counterSpeech = document.getElementById("counterSpeech");

//Audio
const mcAudio = document.getElementById("mcAudio");
const cAudio = document.getElementById("cAudio");

//Inventory
const inventoryBox = document.getElementById("inventoryBox"); //div
const inventoryList = document.getElementById("inventoryList"); //ul

//Foreground Items
const door1 = document.getElementById("door1");
const sign = document.getElementById("sign");


//update inventory with gamestate items
updateInventory(gameState.inventory, inventoryList);

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    if (e.target.id !== "mainCharacter") {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }

    console.log(e.target.id);
    switch (e.target.id) {


        case "wall":
            return;

        case "door1":
            door1.style.opacity = 0;
            sign.style.opacity = 1;
            if (document.getElementById("key1") !== null) {
                console.log('Found key!');
                document.getElementById("key1").remove();
                changeInventory('key', 'add');
                gameState.keyPickedUp = true
                saveToBrowser(gameState);
            }

            break;
        case "door2":
            if (gameState.door2locked == true) {
                // check if we have key
                if (document.getElementById("inv-key") !== null) {
                    //yes -> unlock door?
                    gameState.door2locked = false;
                    changeInventory('key', 'delete');
                    console.log('Door unlocked!');
                    // Add a coin to the inventory
                    changeInventory('coin', 'add');
                    saveToBrowser(gameState);
                } else {
                    //no -> alert 'door locked'
                    alert("Door is locked!");
                }
            } else {
                console.log('enter building');
            }
            break;

        case "trade":
            // Check if the inventory contains a coin
            if (gameState.inventory.includes('coin')) {
                // Grant the sword and remove the coin
                changeInventory('sword', 'add');
                changeInventory('coin', 'delete');
                console.log('Trade successful! Got a sword.');
                saveToBrowser(gameState);
            } else {
                // Notify the player that they need a coin for the trade
                alert("You need a coin for the trade!");
            }
            break;

        case "escape":
            // Check if the inventory contains a sword
            if (gameState.inventory.includes('sword')) {
                showEscapeDialog("Victory royale!!!");
            } else {
                alert("You need a sword to defeat the enemies and escape!");
            }
            break;

            function showEscapeDialog(message) {
                const endScreen = document.getElementById("endScreen");
                endScreen.style.display = "block";

                const endMessage = document.getElementById("endMessage");
                endMessage.innerText = message;
            }


        case "statue":
            setTimeout(function () { counterAvatar.style.opacity = 1; }, 0 * sec);
            showMessage(mainCharacterSpeech, mcAudio, "Hey, who are you?")
            setTimeout(showMessage, 4 * sec, counterSpeech, cAudio, "Hey, im Urag the orc.")
            setTimeout(showMessage, 8 * sec, mainCharacterSpeech, mcAudio, "How do i escape this place.")
            setTimeout(showMessage, 12 * sec, counterSpeech, cAudio, "Search for the key and use the key on one of the other houses.")
            setTimeout(showMessage, 16 * sec, mainCharacterSpeech, mcAudio, "Thanks for helping.")
            setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);
            break;

        default:
            //explode
            door1.style.opacity = 0;
            sign.style.opacity = 1;
            break;

    }

}

/**
 * function to change inventory
 * @param {string} itemName 
 * @param {string} action "add", "delete"
 * @returns 
 */
function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.log('wrong parameters given to changeInventory()');
        return
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);
            break
        case 'delete':
            gameState.inventory.find(function (item, index) {
                if (item == itemName) {
                    var index = gameState.inventory.indexOf(item);
                    if (index !== -1) {
                        gameState.inventory.splice(index, 1);
                    }
                }
            })
            break

        default:
            break;
    }
    updateInventory(gameState.inventory, inventoryList);
}

/**
 * update inventoryList
 * @param {Array} inventory array of items 
 * @param {HTMLElement} inventoryList html <ul> element 
 */
function updateInventory(inventory, inventoryList) {
    inventoryList.innerHTML = '';
    inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = "inv-" + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}

/**
 * shows a message in a speech bubble
 * @param {*} targetBalloon
 * @param {*} targetSound
 * @param {string} message
 */

function showMessage(targetBalloon, targetSound, message) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBalloon.style.opacity = "1";
    targetBalloon.innerText = message;
    setTimeout(hideMessage, 4 * sec, targetBalloon, targetSound);
}

function hideMessage(targetBalloon, targetSound) {
    targetSound.pause();
    targetBalloon.style.opacity = "0";
}
/**
 * store gameState into LocalStorage.gameState
 * @param {object} gameState our game object
 */
function saveToBrowser(gamestate) {
    localStorage.gameState = JSON.stringify(gameState);
}