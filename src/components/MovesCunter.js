import { Component } from "react";

class MovesCounter extends Component {
    render() {
        return <div className="info-text">Moves: <span>{this.props.moves}</span></div>
    }
}

export default MovesCounter;