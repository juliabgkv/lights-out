import React, { Component } from 'react';
import styles from './Cell.module.css';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler(e) {
        this.props.click(e.target.id);
    }
    render() {
        return (
            <div
                className={`${styles.cell} ${this.props.isOn && styles.on}`}
                id={this.props.id}
                onClick={this.clickHandler}
            ></div>
        );
    }
}

export default Cell;