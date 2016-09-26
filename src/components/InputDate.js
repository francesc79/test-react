import React, { Component } from 'react';
import DateHelper from '../DateHelper'

/**
 * InputDate component manage a input data
 * @author Francesco Zanutto <francesco.zanutto@gmail.com>
 */
export default class InputDate extends Component {

    /** Create a InputDate component  */
    constructor(props) {
        super(props);

        this._dateHelper = new DateHelper(props.dateFormat);
        this.state = {
            id: Math.floor(Math.random() * 0xFFFF),
            value: props.defaultValue ? this._dateHelper.format(props.defaultValue) : '',
            isError: false,             
        };

        this.onBlur = this.onBlur.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onChange = this.onChange.bind(this);            
    }

    /** 
     * Internal method for manage valueChanged callback
    */
    _handleValueChanged () {
        let date = undefined;
        if (this.state.isError) {
            date = !this.state.value  ? null : undefined
        } 
        else {
            date = this._dateHelper.parse(this.state.value);
        }     
        this.props.valueChanged(date, this.state.value);
    }

    /** 
     * Handler of onBlur event 
     * @param {event} event - event data
    */
    onBlur (event) {
        this._handleValueChanged();
    }

    /** 
     * Handler of onKeyPress event 
     * @param {event} event - event data
    */
    onKeyPress (event) {
        if (event.charCode === 13) {
            this._handleValueChanged();
        }
    }    

    /** 
     * Handler of onChange event 
     * @param {event} event - event data
    */
    onChange (event) {
        let isError = false;
        if (!this._dateHelper.isValid(event.target.value)) {
            isError = true;
        }
        this.setState({
            value: event.target.value,
            isError
        });
    }

    /** Render component */
    render() {
        return (
            <div className={"form-group " + (this.state.isError ? "has-error" : "")}>
                <label className="control-label" htmlFor={'inputDate' + this.state.id}>Date</label>
                <input id={'inputDate' + this.state.id} className="form-control"
                    type="text"
                    value={this.state.value}
                    onBlur={this.onBlur}
                    onKeyPress={this.onKeyPress}
                    onChange={this.onChange}
                    placeholder={this.props.dateFormat} />
                {this.state.isError && this.state.value.length > 0 ? [
                    <span key={'help' + this.state.id} className="help-block">Format error must be {this.props.dateFormat}</span>
                ] : null }

            </div>
        );
    }
}

/** Define props type */
InputDate.propTypes = {
    defaultValue: React.PropTypes.instanceOf(Date),
    dateFormat: React.PropTypes.string.isRequired,
    valueChanged: React.PropTypes.func.isRequired
}; 