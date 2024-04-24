/** Imports of natives and of the incredible functions of ALTV */
import * as alt from 'alt';
import * as native from 'natives';



let menuopen = false;
let camera;
let thiscam;


/**
 *  Creation of the WebView Item
 */
 let hud = new alt.WebView('http://resource/menu/index.html');



/**
 *  Listing CCTVs
 */
let CCTVList = [ 
    {   x : 997.06, y :-3002.81,  z :-39.13,    h : 45.4,   max : 50,  name : 'TESTZONE', st:true }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 

    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 


]

/**
 *  Format player or vehicle
 * {   
 *      entity : entity,
 *      max : 0,  
 *      name : 'entity name' 
 * }, 
 * 
 */
let CompaniesList = [
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 

    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
 
]
let PoliceList = [
    {   x : 433.59, y : -978.07,  z : 30.695,   h : 125.0,  max : 50,  name : 'LSPD - Entrée', st : true }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : 'LSPD - Acceuil', st : true }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 

    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
    {   x : 449.0,  y : -988.28,  z : 30.695,   h : 45.4,   max : 50,  name : '.. . ... ... .' }, 
]




/**
 *  Listing zone from where menu can be open
 * 
 *  x, y and z are coordinates
 *  dist is the size of the zone in which you can open the menu
 *  name is the name of the blip
 */
 let ComputerPosList = [ 
    {   x : 991.65,       y :-2993.34,    z : -39.17,  dist : 2.0, name : 'Computer', ispolice : true }, // Testzone
    {   x : 459.507,      y : -988.98,    z : 24.89,   dist : 1.0, name : 'Computer', ispolice : true }, // LSPD
    {   x : 1275.534,     y : -1710.58,   z : 54.37,   dist : 1.0, name : 'Computer', ispolice : false }, // Lester

]


/**
 *  Blip Generator
 * 
 *  Srite is the logo on map 
 *  ShortRange is how it is seen on map / radar 
 *      1 mean it will be seen on map and on radar if nearby enough but not pined 
 */
 ComputerPosList.forEach(b => {

    const blip = new alt.PointBlip(b.x, b.y, b.z);
        blip.sprite     = 521;
        blip.color      = 50;
        blip.scale      = 1.0;
        blip.shortRange = 1;
        blip.name       = b.name;
        
});

// JeSuisChiante.mp4
hud.on('BIP', (sound) => {

    native.playSoundFrontend(-1, sound, "DLC_HEIST_HACKING_SNAKE_SOUNDS", true); 

});


/**
 *  On WebView : Kill Camera
 */

let clone;
let mycoords;
hud.on('KillCam', () => {
    native.clearFocus();
    native.destroyCam(camera, 0)
    native.renderScriptCams(0, 0, 1, 1, 1)
    native.setNightvision(false);
    native.setSeethrough(false);
    native.deleteEntity(clone);
    alt.emitServer('seln:cctv:visibility', true);  
    native.setEntityCoords(alt.Player.local.scriptID, mycoords.x, mycoords.y, mycoords.z-1, 0, 0, 0, false);
    thiscam = null
    camera = null
});


/**
 *  On WebView : Create Camera
 */
hud.on('CameraFixe', (cam) => { 

    thiscam = cam
    mycoords = native.getEntityCoords(alt.Player.local.scriptID, false);

    clone = native.clonePed(alt.Player.local.scriptID, 0.0, true, false);
    native.freezeEntityPosition(clone, true);

    alt.emitServer('seln:cctv:visibility', false);  
    native.setEntityCoords(alt.Player.local.scriptID, cam.x, cam.y, cam.z, 0, 0, 0, false);

    camera = native.createCam("DEFAULT_SCRIPTED_CAMERA", true);
    alt.log(JSON.stringify(cam))

    native.setFocusPosAndVel(cam.x, cam.y, cam.z+2.0, 0, 0, 0);
    native.setCamCoord(camera, cam.x, cam.y, cam.z+2.0);
    native.setCamRot(camera, 0, 0, cam.h, 2);
    native.setCamFov(camera, 100);
    native.setCamActive(camera, true);
    native.renderScriptCams(1, 0, 0, 1, 1);
    native.setNightvision(true);


    
});

hud.on('SeeThrough', () => { 
    
    let using = native.getUsingseethrough();
    native.setSeethrough(!using );

});


/**
 *  On WebView & Client : Close Menu
 *      Close the WebView
 *      Stopping the no mouse and bug deleter interval
 *      Ask the WebView to set variables to their default values
 */
hud.on('Close', () => { Close() });
function Close() {
    menuopen  = false;

    native.freezeEntityPosition(alt.Player.local.scriptID, false); 
    hud.unfocus(); 
    alt.showCursor(false); 
    native.displayRadar(true);
    alt.toggleGameControls(true);
    
}





/**
 *  Menu Opener :
 *      Starting the no mouse and bug deleter interval
 * 
 */
 function openMenu(ispolice) { 

    hud.focus(); 
    alt.showCursor(true);
    native.displayRadar(false);
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    hud.emit('open', ispolice) 
    

    hud.emit('sendlist', 'CCTVlist', CCTVList) 
    hud.emit('sendlist', 'Policelist', PoliceList) 
    hud.emit('sendlist', 'Companieslist', CompaniesList) 

    alt.toggleGameControls(false);
    menuopen = true
}




/**
 * On : KeyDown
 * 
 * [O] key : If menu is closed :
 *      Get position and check if the player is in one of the computer zones
 *      If in a computer zone, open the menu
 *      
 * [Arrows] keys : move camera if in camera
 */
 let moving = { u: false, r: false, l: false, d: false }


 alt.on('keydown', (key) => {

    // [O]
    if ( key == 79 && menuopen == false ) { 
        
        let pos = native.getEntityCoords(alt.Player.local.scriptID, true);
        ComputerPosList.forEach(comp => {
            if( native.getDistanceBetweenCoords(comp.x, comp.y, comp.z, pos.x, pos.y, pos.z, true) < comp.dist ) 
                { openMenu(comp.ispolice) }
        });  
    }

    if ( key == 38 && menuopen == true && thiscam && thiscam.x ) { moving.u = true; MoveU() }
    if ( key == 40 && menuopen == true && thiscam && thiscam.x ) { moving.d = true; MoveD() }
    if ( key == 37 && menuopen == true && thiscam && thiscam.x ) { moving.l = true; MoveL() }
    if ( key == 39 && menuopen == true && thiscam && thiscam.x ) { moving.r = true; MoveR() }

    
});

/**
 * On : KeyUp
 * 
 * [Arrows] keys : if in camera remove the moving order
 */
alt.on('keyup', (key) => {

    if ( key == 38 && menuopen == true && thiscam && thiscam.x ) { moving.u = false; }
    if ( key == 40 && menuopen == true && thiscam && thiscam.x ) { moving.d = false; }
    if ( key == 37 && menuopen == true && thiscam && thiscam.x ) { moving.l = false; }
    if ( key == 39 && menuopen == true && thiscam && thiscam.x ) { moving.r = false; }
    
});


/**
 *  Camera Movements
 */
function MoveR() {
    let rot = native.getCamRot(camera, 2);
    let nextrot = rot.z - 1;

    let rotmin = thiscam.h - thiscam.max
    let rotmax = thiscam.h + thiscam.max

    if ( nextrot > rotmin && nextrot < rotmax) { 
        native.setCamRot(camera, rot.x, 0, nextrot, 2);
        alt.setTimeout(MoveAgain, 100)
    } else { 
        native.shakeCam(camera, "VIBRATE_SHAKE", 2); 
        native.playSoundFrontend(-1, "Turn", "DLC_HEIST_HACKING_SNAKE_SOUNDS", true); 
    }
    
}

function MoveL() {
    let rot = native.getCamRot(camera, 2);
    let nextrot = rot.z + 1;
    
    let rotmin = thiscam.h - thiscam.max
    let rotmax = thiscam.h + thiscam.max

    if ( nextrot > rotmin && nextrot < rotmax) { 
        native.setCamRot(camera, rot.x, 0, nextrot, 2);
        alt.setTimeout(MoveAgain, 100)
    } else { 
        native.shakeCam(camera, "VIBRATE_SHAKE", 2); 
        native.playSoundFrontend(-1, "Turn", "DLC_HEIST_HACKING_SNAKE_SOUNDS", true); 
    }
    
}

function MoveU() {
    let rot = native.getCamRot(camera, 2);
    let nextrot = rot.x + 1;

    let rotmin = 0 - thiscam.max
    let rotmax = thiscam.max

    if ( nextrot > rotmin && nextrot < rotmax) { 
        native.setCamRot(camera, nextrot, 0, rot.z, 2);
        alt.setTimeout(MoveAgain, 100)
    } else { 
        native.shakeCam(camera, "VIBRATE_SHAKE", 2); 
        native.playSoundFrontend(-1, "Turn", "DLC_HEIST_HACKING_SNAKE_SOUNDS", true); 
    }
}

function MoveD() {
    let rot = native.getCamRot(camera, 2);
    let nextrot = rot.x - 1;

    let rotmin = 0 - thiscam.max
    let rotmax = thiscam.max

    if ( nextrot > rotmin && nextrot < rotmax) { 
        native.setCamRot(camera, nextrot, 0, rot.z, 2);
        alt.setTimeout(MoveAgain, 100)
    } else { 
        native.shakeCam(camera, "VIBRATE_SHAKE", 2); 
        native.playSoundFrontend(-1, "Turn", "DLC_HEIST_HACKING_SNAKE_SOUNDS", true); 
    }
}

function MoveAgain() {
    
    alt.log(JSON.stringify(moving));
    if( moving.r == true ){ MoveR() }
    if( moving.l == true ){ MoveL() }
    if( moving.u == true ){ MoveU() }
    if( moving.d == true ){ MoveD() }
}