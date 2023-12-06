console.log("hello world");

class Ship{
    constructor(length){
        this.shipLength=length
        this.tileShip=[];
        this.horizontal=true;
        for(let i=0;i<this.shipLength;i++){
            this.tileShip[i]={isIntact:true,positionX:-1,positionY:-1};
        }
    }
    getLength(){
        return this.shipLength
    }
    getTile(x,y){
        for(let i=0;i<this.tileShip.length;i++){
            if(this.tileShip[i].positionX==x && this.tileShip[i].positionY==y){
                return this.tileShip[i];
            }
        }
        return -1;
    }
    getX(){
        return this.positionX;
    }
    getY(){
        return this.positionY;
    }
    getPosition(){
        return this.tileShip;
    }
    hit(i){
        this.tileShip[i].isIntact=false;
    }
    isSunk(){
        for (let i = 0; i < this.length; i++) {
            if(this.tileShip[i]==true){
                return false;
            }
        }
        return true;
    }
    isHorizontal(){
        return this.horizontal;
    }
    switchAlignment(){
        if(this.horizontal==true){
            return this.horizontal=false;
        }
        return this.horizontal=true;
    }
}
class Gameboard{
    constructor(){
        this.tiles=[];
        this.missedAttacks=0;
        for (let i = 0; i < 10; i++) {
            this.tiles[i]=[];
            for (let j = 0; j < 10; j++) {
                this.tiles[i][j]="empty";
            }
        }
    }
    isEmpty(x,y){
        if(this.tiles[x][y]=="empty"){
            return true;
        }
        return false;
    }
    canPlaceHorizontally(ship,x,y){
        for(let i=0;i<ship.length;i++){
            if(this.isEmpty(x+i,y)){
                return false
            }
        }
        return true;
    }
    canPlaceVertically(ship,x,y){
        for(let i=0;i<ship.length;i++){
            if(!this.isEmpty(x,y+i)){[this.getX(),this.getY()]
                return false;
            }
        }
        return true;
    }
    placeHorizontally(ship,x,y){
        if(!this.canPlaceHorizontally(ship,x,y)){
            return;
        }


        for(let i=0;i<ship.getLength();i++){
            this.tiles[x][y]=ship.tileShip[i];
            ship.tileShip[i].positionX=x;
            ship.tileShip[i].positionY=y
            y++;
        }

    }
    placeVertically(ship,x,y){
        if(!this.canPlaceVertically(ship,x,y)){
            return
        }
        for(let i=0;i<ship.getLength();i++){
            this.tiles[x][y]=ship.tileShip[i];
            ship.tileShip[i].positionX=x;
            ship.tileShip[i].positionY=y
            x++;
        }
    }
    placeShip(ship,x,y){
        if(ship.isHorizontal()){
            console.log("placing ship horizontally")
            this.placeHorizontally(ship,x,y);
            return;     
        }
        console.log("placing ship vertically")
        this.placeVertically(ship,x,y);
    }
    
    
    
    receiveAttack(x,y){
        let tile=this.tiles[x][y];
        if(tile=="empty"){
            missedAttacks++;
            this.tiles[x][y]="no ship"
            return;
        }
        tileShip=tile.getTile(x,y);
        if(tileShip.isIntact=false){
            return;
        }
        tileShip.hit();
    }
}

class Player{
    constructor(){
        this.gameboard=new Gameboard();
        this.ships={
            carrier:new Ship(5),
            battleship:new Ship(4),
            cruiser:new Ship(3),
            submarine:new Ship(3),
            destroyer:new Ship(2),
        }
        
    }
    hasShips(){
        for (let ship in this.ships) {
            console.log(this.ships[ship]);
            if(!this.ships[ship].isSunk()){
                console.log("at least one ship remains")
            return true;
           }
        }
        return false;
    }
}

let playerOne=new Player();
let computer=new Player();

console.log(playerOne.gameboard); 
//playerOne.ships.carrier.switchAlignment();
playerOne.gameboard.placeShip(playerOne.ships.carrier,0,0);
let positionCarrier=playerOne.ships.carrier.getPosition();
console.log(positionCarrier);
console.log(playerOne.gameboard);
console.log(playerOne.hasShips());


/*
Gameboards should be able to report whether or not all of their ships have been sunk.

3 create Player.
Players can take turns playing the game by attacking the enemy Gameboard.
The game is played against the computer, so make the ‘computer’ capable of making random plays. The AI does not have to be smart, but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice).
Create the main game loop and a module for DOM interaction.
At this point it is appropriate to begin crafting your User Interface.
The game loop should set up a new game by creating Players and Gameboards. For now just populate each Gameboard with predetermined coordinates. You are going to implement a system for allowing players to place their ships later.
We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class/factory.
You need methods to render the gameboards and to take user input for attacking. For attacks, let the user click on a coordinate in the enemy Gameboard.
The game loop should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.
Create conditions so that the game ends once one player’s ships have all been sunk. This function is appropriate for the Game module.
Finish it up
Implement the system that allows players to place their ships. There are several options available for letting users place their ships. You can let them type coordinates for each ship, or investigate implementing drag and drop.
You can polish the intelligence of the computer player by having it try adjacent slots after getting a ‘hit’.
Optionally, create a 2 player option that lets users take turns by passing the device back and forth. If you’re going to go this route, make sure the game is playable on a mobile screen and implement a ‘pass device’ screen so that players don’t see each others boards!
*/