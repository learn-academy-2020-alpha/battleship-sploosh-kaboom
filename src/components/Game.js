import React, {Component} from 'react';
import Box from './Box'

class Game extends Component {

    constructor(){
        super()
        //This is our ships, and how big they are
        this.listOfShips = [4,3,2,5,3]
        this.state = {
            //Will have our final array of ships populated in it
            gameBoard: this.bigFunction(),
            shipHealth: this.shipsHPArray(this.listOfShips),
            ammo: 50,
            canShoot: 0,
            winStatus: "",
            deathCounter: 1,
            taco: ""
        }
    }

    bigFunction() {
        //Creates the wireframe for our array
        let tempArray = Array(10).fill().map(n => Array(10).fill(0));

        //Make sure the god dang thing works
        console.log(tempArray)

        //Loop to create the actual ships
        for(let i = 0; i< this.listOfShips.length; i++){
            //Unique ship identifier
            let increment = i+1;
            // Creates the ship, using the index of the ship array, passes in our wireframe, and the unique identifier
            tempArray = this.placeShip(this.listOfShips[i], tempArray, increment)
        }

        //Lets us see the populated array
        console.log(tempArray)
        //Check to see if our collision worked
        let check = this.checkYourWork(tempArray)

        //If the collision didnt work, try again until you do
        while (check === false){
            tempArray =  this.bigFunction();
            check = this.checkYourWork(tempArray);
        }
        return tempArray; 
    }

    //Make sure the collission did its job
    checkYourWork = (arr) => {
        let x = 0;
        //Add all the values in the array together
        for (let i = 0; i < this.listOfShips.length; i++){
            x += this.listOfShips[i]; 
        }

        //A tracker to see how many elements are not 0
        let y = 0;
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j<arr[i].length; j++){
                if (arr[i][j] !== 0){
                    //If you are not 0, add to the tracker
                    y += 1;
                }
            }
        }

        //If we do not have matching numbers, our collision didnt work properly
        if (x !== y){
            return false;
        } else if (x === y) {
            return true;
        }
    }

    placeShip(arg, arr, increment) {
        //Choose either a vertical or horizontal ship placement
        let flipCoin = Math.floor(Math.random()*2)

        //Grab a Random index for the array
        let rIndexOne = Math.floor(Math.random()*arr.length)
        let rIndexTwo = Math.floor(Math.random()*arr.length)

        //Make sure that the place we are setting our ship into is not taken
        while (this.collisionFunct(flipCoin, rIndexOne, rIndexTwo, arr, arg) === false){
            //If it was taken, find a new place
            rIndexOne = Math.floor(Math.random()*arr.length)
            rIndexTwo = Math.floor(Math.random()*arr.length)
        }

        //0 means we are looking vertically
        if (flipCoin === 0){
            //Assigns the indexes with our unique idenifier
            for(let i = 0; i < arg; i++){
                arr[rIndexOne+i][rIndexTwo] = increment;
                
            }
            //0 means we are looking horizontally
        } else if (flipCoin === 1){
            for(let i = 0; i < arg; i++){
                //Assigns the indexes with our unique idenifier
                arr[rIndexOne][rIndexTwo+i] = increment;
            }
        }
        //Returns the array with the ship inside of it
        return arr;
    }

    collisionFunct(coin, rI1, rI2, arr, arg) {
        //I doing a vertical check if the coin was 0
        if (coin === 0){
            //I create a loop to check every index for the size of my ship
            for(let i = 0; i<arg; i++){
                //I create a variable to return my boolean statement
                let ourBoolean = "";
                //I make sure that the place I am checking exists in my array
                if (rI1+i < arr.length-1 && rI1+arg < arr.length-i){
                    //I check if the value I am looking at is not a 0
                    if (arr[rI1+i][rI2] !== 0){
                        //If I am not a 0, do not write
                        ourBoolean = false;
                    } else{
                        //I am a 0, go ahead and write
                        ourBoolean = true;
                    }
                } else {
                    //I dont exist in the array, dont write anything
                    ourBoolean = false;
                }
                //Return my boolean at the end of my loops
                if (i+1 === arg){ return ourBoolean}
            }// Horizontal Checking below
        } else if (coin === 1){
            //I create a loop to check every index for the size of my ship
            for(let i = 0; i<arg; i++){
                //I create a variable to return my boolean statement
                let ourBoolean = "";
                //I make sure the place I am checking exists in my array
                if (rI2+i < arr.length-1 && rI2+arg < arr.length-i){
                    //I check fi the value I am looking at is not a 0
                    if (arr[rI1][rI2+i] !== 0){
                        //If I am not a 0, do not write
                        ourBoolean = false;
                    } else{
                        //I am a 0, go ahead and write
                        ourBoolean = true;
                    }
                    //I dont exist in the array, dont write anything
                } else { ourBoolean = false;}
                //Return my boolean at the end of my loops
                if (i+1 === arg){ return ourBoolean}
            }
        }
    }

    //Lets fill our 2d array with boxes
    boxPopulation(arr) {
        //Start with a blank box
        let finalArr = [];
        //For every array, we map an array of boxes
        for( let i = 0; i < arr.length; i++){
            finalArr.push(arr[i].map((value,index) => {return(
                <Box 
                    value = {value}
                    index = {index}
                    ammo = { this.state.ammo }
                    canShoot = { this.state.canShoot }
                    clickFunction = { this.clickFunction }
                    winCheck = {this.winCheck}
                />)}
            ));
        }
        console.log(finalArr)
        return finalArr
    }

    //Things we want to happen in the on click event
    clickFunction = (value, ammo) => {
        //Keep track of how many ships are dead
        let shipHit = this.state.deathCounter

        //Add one to our ship hit counter if they hit a ship
        if(value !== 0){
            shipHit += 1;
            //Reassign Death counter for later use
            this.setState({ deathCounter: shipHit})            
        }

        //Get how many ships exist in our board
        let nubmerOfShips = 0;
        for(let i = 0; i < this.state.gameBoard.length; i++){
            for(let j = 0; j<this.state.gameBoard[i].length; j++){
                if (this.state.gameBoard[i][j] !== 0){
                    //If you are not 0, add to the tracker
                    nubmerOfShips += 1;
                    
                }
            }
        }

        if (this.state.deathCounter === nubmerOfShips){
            this.setState({ winStatus: true })
            console.log(this.state.winStatus);
            
        }

        //This is broken - WIP
        for(let i = 0; i < this.state.shipHealth.length; i++){
            let newVal = (value-1)*2
            if(i === newVal){
                let newHealth = this.state.shipHealth
                let newHealthElement = newHealth[i];
                let removeHeart = newHealthElement.split("")
                removeHeart.pop()
                removeHeart.pop()
                newHealth[i] = removeHeart.join("")             
                this.setState({shipHealth: newHealth})
            }
            
        }

        //Ammo Tracker
        if (ammo > 0){
            let currAmmo = ammo;
            currAmmo -= 1;
            this.setState({ ammo: currAmmo })            
            //If we are out of ammo you lose
            if (currAmmo === 0){
                this.setState({ winStatus: false})
            }
        }
    }
    
    //Create the hp display
    shipsHPArray(arr) {
        let shipArray = [];
        let healthArray = [];
        let noComma = []

        //Create an array to hold all of the health
        for (let i = 0; i < this.listOfShips.length; i++){
            for (let j = 0; j< arr[i]; j++){
                //Push the hearts equal to the ship size into a string
                healthArray.push("❤️")
                noComma = healthArray.join("");
            }
            //Take that string above and push that with our other text into a single string in the array
            shipArray.push(`🚢 HP: ${noComma}`, <br/>)
            healthArray = [];
        }
        //Returns our final array of strings
        return shipArray
    }

    seeAmmo = () => {
        let visAmm = []

        for(let i = 0; i < this.state.ammo ; i++){
            visAmm.push("💣")
        }  
        return visAmm;
    }

    render(){
        //Render our gameboard onto the screen
        let start = this.boxPopulation(this.state.gameBoard);
        let healthMap = this.state.shipHealth.map(value => value)
        
        return (
            //This is a huge css mess to make it look kinda pretty sometimes
            <div>
                <div className = "centerBoard">
                    <div className = "wrap">
                        <span className = "outerBox">
                            <p className = "ammoDisplay">
                                Ammo: {this.state.ammo} <br/>
                                <br/>
                                {this.seeAmmo()}
                            </p>
                        </span>
                        <span className = "squareIt">
                            { start }
                        </span>
                        <span className = "outerBox">
                            <p className = "healthDisplay">
                            Enemy Ship Health: <br/>
                            <br/>
                            { healthMap }<br/>
                            </p>
                        </span> 
                    </div>
                </div>
                <div className = "centerMessage">
                    {/* If we won, show we won, if we lost, show we lost. */}
                    {this.state.winStatus === true &&
                        <span className = "endText onTopWinner">You Win</span>
                    }
                    {this.state.winStatus === false &&
                        <span className = "endText onTopLoser">You Lose</span>
                    }
                </div>
            </div>
        );
    }
}

export default Game;