import { Component } from "react";

class GameTimer extends Component {
    intervalID = 0;
    constructor(props) {
        super(props);
        this.state = { minutes: 0, secounds: 0 };
        this.timerHandler = this.timerHandler.bind(this);
    }
    componentDidMount() {
        this.intervalID = setInterval(this.timerHandler, 1000);
    }
    timerHandler() {
        if(!this.props.isEndOfGame) {
            this.setState(st => ({
                minutes: st.secounds == 59 ? st.minutes + 1 : st.minutes,
                secounds: st.secounds < 59 ? st.secounds + 1 : 0
            }));
        } else  {
            clearInterval(this.intervalID);
            this.intervalID = 0;
        }
    }
    startNewCountUp() {
        if(this.intervalID !== 0) {
            clearInterval(this.intervalID);
            this.intervalID = 0;
        }
        
        this.setState({ minutes: 0, secounds: 0 });
        this.intervalID = setInterval(this.timerHandler, 1000);
    }
    render() {
        return (
            <div className="info-text">Time: {this.state.minutes}:{this.state.secounds < 10 && `0`}{this.state.secounds}</div>
        )
    }
}

export default GameTimer;