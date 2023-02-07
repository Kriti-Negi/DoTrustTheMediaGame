const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight, false);

document.body.appendChild(renderer.domElement);

let currCheckPoint = 1;
let endgame = false;
let lost = false;

const instructions = ["Need help navigating the endless void?", "W => forward, S => back", "A => left, D=> Right", "arrow key left => turn left", "arrow key right => turn right", "to select an element move towards it and press F"];
const instructionsUI = document.getElementById('instructionsText');
let instructionsIndex = 0;

const popupUI = document.getElementById('popup-text');
const popUpButton = document.getElementById('popup-button');
const popUpBody = document.getElementById('popUpBody');
const popUpText = {
    "data": 
        [
            {
                "type": 1,
                "text": "Welcome to the show buddy?"
            },
            {
                "type": 1,
                "text": "Don’t look too happy... weird. Don’t worry about how you got here. Or what you’re doing"
            },
            {
                "type": 1,
                "text": "This is the show of a lifetime; well okay just the end of your lifetime honesty.."
            }, 
            {
                "type": 1,
                "text": "The rest of your life was probably too boring for a game-show anyway"
            }, 
            {
                "type": 1,
                "text": "Anyhow, here is what you do"
            },
            {
                "type": 1,
                "text": "SURVIVE"
            },
            {
                "type": 1,
                "text": "I kid. Sort of. You follow the instructions I give you."
            },
            {
                "type": 1,
                "text": "it's okay though, you got your entertainment fix: that livestream to the left there...that’s basically just a bunch of people voicing opinions. You guys might call it social media. Or twitch chat."
            },
            {
                "type": 1,
                "text": "So yeah, pick a cube, kid. Good Luck. Die Happy. But not too fast, this thing is scheduled for an hour every Monday. We need *something* for content"
            },
            {
                "type": 1,
                "text": "So, without further ado, pick a cup!"
            },
            {
                "type": 1,
                "text": "What...you want a clue??...and some cubes?"
            },
            {
                "type": 2,
                "text": "Fine... #1 graphics"
            },
            {
                "type": 1,
                "text": "ughhhh I *TOLD* him not to die this time"
            },
            {
                "type": 2,
                "text": "JIMMY GET THE NEXT GUY"
            },
            {
                "type": 1,
                "text": "Huh"
            },
            {
                "type": 1,
                "text": "time for trial 2... the real world"
            },
            {
                "type": 1,
                "text": "what, you think I'm kidding?"
            },
            {
                "type": 1,
                "text": "do you know how many people I had to drag out of here because they listened to those weirdos on the left?"
            },
            {
                "type": 1,
                "text": "Media presence isn't going away. And that's not bad."
            },
            {
                "type": 1,
                "text": "But just as you wouldn't trust a group of strangers you never met... you can't trust the media either."
            },
            {
                "type": 1,
                "text": "Don't believe everything you hear OR read."
            },
            {
                "type": 1,
                "text": "Got it?"
            },
            {
                "type": 1,
                "text": "I hope so... "
            },
            {
                "type": 2,
                "text": "Good luck out there."
            }
        ]
}

const chatTextUI = document.getElementById('chat-text');
const chatTextData = {
    "1": [
        {
            "author": "MC_HAIL",
            "text": "!survive_fool"
        },
        {
            "author": "S0Fie",
            "text": "hush it start now"
        },
        {
            author: "AhhHAHAhh",
            "text": "Color it red"
        },
        {
            author: "S0Fie",
            "text": "Color me mine"
        },
        {
            author: "Andy",
            "text": "Show it is"
        }, 
        {
            author: "Ellen",
            "text": "hello from Brazil?"
        },
        {
            author: "ALeX",
            "text": "hahhhhhahha dis dude ded"
        },
        {
            author: "DeadBoi",
            "text": "dead boi"
        },
        {
            author: "SnowCone",
            "text": "Betting pool?"
        },
        {
            author: "MC_HAIL",
            "text": "Opening one now"
        },
        {
            "author": "EarthHugger",
            "text": "this is ethically questionable"
        },
        {
            "author": "DeadBoi",
            "text": "shut up"
        },
        {
            "author": "EarthHugger",
            "text": "We need to shut this down"
        },
        {
            "author": "SnowCone",
            "text": "Vote 4 bets"
        },
        {
            "author": "LeXE",
            "text": "Vote bet"
        },
        {
            "author": "LeXE",
            "text": "My entertainment > ethics"
        },
        {
            "author": "SwagMoneyz",
            "text": "$$$$$$ > ethics"
        },
        {
            "author": "Aegz",
            "text": "Money boi gone"
        },
        {
            "author": "Aegz",
            "text": "ethics? wdym?"
        },
        {
            "author": "SwagMoneyz",
            "text": "supposedly this boi die"
        },
        {
            "author": "MC_HAIL",
            "text": "bet live in a sec"
        },
        {
            "author": "S0Fie",
            "text": "smart money not on dude"
        }
    ],
    "2": [
        {
            "author": "MC_HAIL",
            "text": "Open at coolBets.the.better.ur.bet.better.be.net"
        }, 
        {
            "author": "AhhHAHAhh",
            "text": "ah"
        },
        {
            "author": "Ellen",
            "text": "gren?"
        },
        {
            "author": "Ellen",
            "text": "blue"
        }, 
        {
            "author": "DeadBoi",
            "text": "Red or Dead."
        },
        {
            "author": "SALTY",
            "text": "I know who you are."
        }, 
        {
            "author": "MC_HAIL",
            "text": "Blue."
        },
        {
            "author": "S0Fie",
            "text": "#support."
        },
        {
            "author": "MC_HAIL",
            "text":"Yummy lubricant"
        },
        {
            "author": "SALTY",
            "text": "You need to get out."
        },
        {
            "author": "Yemini",
            "text":"BLue."
        },
        {
            "author": "copper",
            "text":"Center is the spring of eternal youth."
        },
        {
            "author": "SALTY",
            "text": "this is the WRONG GAME"
        },
        {
            "author": "thinkety",
            "text": "RGB == custom colors"
        },
        {
            "author": "blub",
            "text": "BBBBBluez neutral"
        },
        {
            "author": "moist",
            "text": "grEEEnnn"
        }, 
        {
            "author": "chet",
            "text": "I found ALL the cheats"
        },
        {
            "author": "SwagMoneyz",
            "text": "Pick red"
        },
        {
            "author": "Ellen",
            "text": "@SwagMoneyz didn't u bet he die?"
        },
        {
            "author": "moist",
            "text": "he die when drink red."
        }
    ],
    "2a": [
        {
            "author": "MC_HAIL",
            "text": "haha loser"
        },
        {
            "author": "Ellen",
            "text": "what was that stuff actually"
        },
        {
            "author": "s0fie",
            "text": "another day another L"
        },
        {
            "author": "DeadBoi",
            "text": "ded lol"
        },
        {
            "author": "SALTY",
            "text": "I TOLD YOU I TOLD YOU"
        },
        {
            "author": "chet",
            "text": "hehehhe knew it"
        }, 
        {
            "author": "Yemini",
            "text": "where did you find the cheats?"
        },
        {
            "author": "chet",
            "text": "the first run of this show"
        },
        {
            "author": "Ellen",
            "text": "this is the first run"
        }, 
        {
            "author": "VE",
            "text": "WHo's the next one?"
        }, 
        {
            "author": "Yemini",
            "text": "its always a surprise"
        },
        {
            "author": "S0Fie",
            "text": "What an L"
        },
        {
            "author": "AhhHAHAhh",
            "text": "hahah"
        },
        {
            "author": "MC_HAIL",
            "text": "I'll mess with this guy twitter"
        },
        {
            "author": "SnowCone",
            "text": "insta: @yumyumicecream"
        },
        {
            "author":"AhhHAHAhh",
            "text": "hehe"
        },
        {
            "author": "MC_HAIL",
            "text": "gullible"
        },
        {
            "author": "narrator",
            "text": "note to you kid, don't always trust the media"
        },
        {
            "author": "narrator",
            "text": "do your own thinking"
        },
        {
            "author": "narrator",
            "text": "do your own research"
        },
        {
            "author": "narrator",
            "text": "granted... you are dead now"
        }
    ],
    "3": [
        {
            "author": "MC_HAIL",
            "text": "I lost all the $$s"
        },
        {
            "author": "Ellen",
            "text": "lol"
        },
        {
            "author": "s0fie",
            "text": "See you on Twitter!"
        },
        {
            "author": "AhhHAHAhh",
            "text": "c u insta"
        },
        {
            "author": "MC_HAIL",
            "text": "msg u on snapchat"
        },
        {
            "author": "Andy",
            "text": "c u while catfishing"
        },
        {
            "author": "Aegz",
            "text": "@Aegzzes insta"
        },
        {
            "author": "SwagMoneyz",
            "text": "insta: @istealbitcoin"
        },
        {
            "author": "LeXE",
            "text": "iou 1 laugh on twitter"
        },
        {
            "author":"DeadBoi",
            "text":"meet me in the cemmmeettarry....snapchat"
        }, 
        {
            "author": "SnowCone",
            "text": "snap my good man"
        },
        {
            "author": "EarthHugger",
            "text": "@earthHugsMeToo"
        },
        {
            "author": "SALTY",
            "text": "there ARE aliens in ur computer"
        },
        {
            "author": "SALTY",
            "text": "watching you"
        },
        {
            "author": "Ellen",
            "text": "nope those be hackers"
        },
        {
            "author": "DeadBoi",
            "text": "1 photo 2 seconds lol"
        },
        {
            "author": "Yemini",
            "text": "c u on twitter @blue"
        },
        {
            "author": "Ellen",
            "text": "eat some soap to end aliens"
        },
        {
            "author": "SALTY",
            "text": "Y E S"
        },
        {
            "author": "Yemini",
            "text": "i dont think thats how it works"
        },
        {
            "author": "SnowCone",
            "text": "Ye..."
        },
        {
            "author": "SALTY",
            "text": "clean ur inside, clean da aliens"
        },
        {
            "author": "homie",
            "text": "instagggggrum @grummy"
        }
    ] 
}

const winLoseUI = document.getElementById('win-lose');
winLoseUI.style.visibility = "hidden";
const possibleColorsClass = ['green-msg', 'red-msg', 'blue-msg'];
let authorColorDisplay = {
    authors: [],
    color: []
}

let currentPopupString = 0;
let currChatIndex = 0;

let gameObjects = {
    "0":[],
    "1": [
        new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0x026905})),
        new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0x020769})),
        new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0x690202}))
    ]
}

function addObjects(objects){
    for(let i = 0; i < objects.length; i++){
        scene.add(objects[i]);
    }
}

let randDecrement = 0;
setInterval(() => {
    randDecrement += Math.floor(Math.random() * 20);
    if(currChatIndex == chatTextData[currCheckPoint].length){
        currChatIndex = 0;
    }

    if(chatTextData[currCheckPoint].length > 0){
        let author = chatTextData[currCheckPoint][currChatIndex].author;
        let textMsg = chatTextData[currCheckPoint][currChatIndex].text;
    
        if(!authorColorDisplay.authors.includes(author)){
            authorColorDisplay.authors.push(author);
            let randValue = Math.floor(Math.random() * 3);
            authorColorDisplay.color.push(randValue);
        }
    
        let colorIndex = authorColorDisplay.authors.findIndex((elem) => {return author == elem});
        chatTextUI.innerHTML += "<p class = 'message'><span class = 'author " +
                possibleColorsClass[authorColorDisplay.color[colorIndex]] + "'>" + 
                author + ":</span> " + textMsg + "</p>"
        currChatIndex++;
    }
}, 500 - randDecrement)

function UIPopUpReset(){
    popupUI.style.visibility = "visible";
    popUpBody.style.visibility = "visible";
    popUpButton.style.visibility = "visible";
}

function changePopupText(){
    //instructions
    if(instructionsIndex < instructions.length){
        instructionsUI.innerHTML = instructions[instructionsIndex];
        instructionsIndex++;
    }else{
        instructionsUI.innerHTML = "";
    }

    //popUP section
    if(currentPopupString < popUpText.data.length){
        currentPopupString++;
        popupUI.innerHTML = popUpText.data[currentPopupString].text;
        if(popUpText.data[currentPopupString].type == 1){
            //enable button
            UIPopUpReset();
        }else{
            //disable button
            popUpButton.style.visibility = "hidden";
            if(!endgame){
                currCheckPoint++;
            }
            currChatIndex = 0;
            //level-specific stuff
            if(currCheckPoint == "2"){
                addObjects(gameObjects["" + (currCheckPoint-1)]);
                let object = gameObjects["1"];
                object[0].position.y -= 1;
                object[1].position.y -= 1;
                object[2].position.y -= 1;

                object[0].position.x -= 4;
                object[1].position.x -= 2
                object[2].position.x += 0;
            }
            setTimeout(() => {
                if(!(endgame && !lost)){
                    popupUI.style.visibility = "hidden";
                    popUpButton.style.visibility = "hidden";
                    popUpBody.style.visibility = "hidden";
                }
            }, 5000);
        }
    }
}

camera.position.z = 6.5;
camera.position.x = -8;

let currSelection = null; 
let selectedIndex = -1;

function animate(){

    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    if(lost && endgame){
        winLoseUI.style.visibility = "visible";
        winLoseUI.innerHTML = "You died...because you trusted the chat";

    }else if(!lost && endgame){
        winLoseUI.style.visibility = "visible";
        winLoseUI.innerHTML = "You lived...";
    }

    if(currCheckPoint == "2"){
        let objects = gameObjects["1"];
        let differences = [];
        
        for(let i = 0; i < objects.length; i++){
            let v = new THREE.Vector3();
            let c = new THREE.Vector3();
            objects[i].getWorldPosition(v);
            camera.getWorldPosition(c);
            differences.push(c.distanceTo(v));
        }

        if(Math.min(...differences) < 6 && !endgame){
            if(differences[0] < differences[1] && differences[0] < differences[1]){
                currSelection = objects[0];
                currSelection.material.color.setHex(0x00ff00);
                objects[1].material.color.setHex(0x020769);
                objects[2].material.color.setHex(0x690202);
                selectedIndex = 0;
            }else if(differences[1] < differences[0] && differences[1] < differences[2]){
                currSelection = objects[1];
                currSelection.material.color.setHex(0x0000ff);
                objects[0].material.color.setHex(0x026905);
                objects[2].material.color.setHex(0x690202);
                selectedIndex = 1
            }else if(differences[2] < differences[1] && differences[2] < differences[0]){
                currSelection = objects[2];
                currSelection.material.color.setHex(0xff0000);
                objects[1].material.color.setHex(0x020769);
                objects[0].material.color.setHex(0x026905);
                selectedIndex = 2;
            }
        }else{
            objects[1].material.color.setHex(0x020769);
            objects[0].material.color.setHex(0x026905);
            objects[2].material.color.setHex(0x690202);
            selectedIndex = -1;
            currSelection = null;
        }
    }

    document.body.addEventListener('keydown', (e) => {
        if (!endgame) {
            if(e.key == 'w'){
                camera.translateZ(-0.0002);
            }else if(e.key == 's'){
                camera.translateZ(0.0002)
            }else if(e.key == 'a'){
                camera.translateX(-0.0002);
            }else if(e.key == 'd'){
                camera.translateX(0.0002);
            }else if(e.key == 'ArrowLeft'){
                camera.rotateY(-0.00001);
            }else if(e.key == 'ArrowRight'){
                camera.rotateY(0.00001);
            }else if(e.key == 'ArrowUp'){
                camera.rotateX(0.0001);
            }else if(e.key == 'ArrowDown'){
                camera.rotateX(-0.0001);
            }else if(e.key == 'f'){
                if(currCheckPoint == '2'){
                    if(currSelection != null){
                        endgame = true;
                        currChatIndex = 0;
                        if(selectedIndex != 2){
                            lost = true;
                            currCheckPoint = "2a";
                            changePopupText();
                        }else if(selectedIndex == 2){
                            currCheckPoint = "3";
                            currentPopupString = 13;
                            UIPopUpReset();
                            changePopupText();
                        }
                    }
                }
            }
        }
    });
}

animate();