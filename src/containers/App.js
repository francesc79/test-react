import React, { Component } from 'react';
import InputDate from '../components/InputDate';

/**
 * App component is a main component
 * @author Francesco Zanutto <francesco.zanutto@gmail.com>
 */
export default class App extends Component {

    /** Create App component */
    constructor(props) {
        super(props);
        
        this.defaultValue = new Date ();
        this.dateFormat = 'DD/MM/YYYY hh:mm:ss';
    }    

    /** 
     * Callback function of InputDate component
     * @param {Date} date - date is null when input is empty, 
     * undefined when input value isn't a valid date
     * otherwise a data object.
     * @param {string} string - input text value
    */
    valueChanged (date, string) {
        console.log (`DATE: ${date} STRING:${string}`);
    }

    /** Render component */
    render() {
        return (
            <div className="row">
                <div className="col-xs-6">
                    <InputDate defaultValue={this.defaultValue}
                               dateFormat={this.dateFormat}
                               valueChanged={this.valueChanged} />
                </div>
            </div>
        );
    }
}