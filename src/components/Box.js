import React, {Component} from 'react';


class Box extends Component {
    constructor(){
        super()
        this.state = {
            picture: "",
            boxClicked: 0,
            //Use .bind so that you dont disable every box
            canClick: this.boxCaller.bind(this)
        }
    }

    //If you are a ship, show a bomb when you are clicked, if not, show an X
    changePicture(value){
        if (value === 0){
            this.setState({ picture: "❌"})
        } else if (value){
            this.setState({ picture: "💥"})
        }
    }

    //Run our tempFunction from before, change your picture, and disable yourself from being clicked again
    boxCaller() {
        if (this.props.canShoot === 0 && this.props.ammo !== 0){
            if (this.state.boxClicked === 0){
                this.props.clickFunction(this.props.value, this.props.ammo);
                this.setState({ boxClicked: 1})
            }
            this.changePicture(this.props.value)
        }
    }
    render(){
        return (
            <div className = "box" onClick = { this.state.canClick }>
                {this.state.picture}
            </div>
        );
    }
}

export default Box;