import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import InputDate from '../src/components/InputDate'

describe('Test InputDate Component', () => {
  let defaultValue, dateFormat, callbackSpy;
  beforeEach(() => {
    dateFormat = 'DD/MM/YYYY hh:mm:ss';
    defaultValue = null;
    callbackSpy = jasmine.createSpy('callbackSpy');
  });

  it('check prop: defaultValue empty', () => {

    let inputDate = TestUtils.renderIntoDocument(
      <InputDate defaultValue={defaultValue}
                 dateFormat={dateFormat}
                 valueChanged={callbackSpy} />
    );

    let input = TestUtils.findRenderedDOMComponentWithTag(inputDate, 'input');
    expect(input.value).toEqual('');
  });

  it('check prop: defaultValue not empy', () => {

    defaultValue = new Date(2000, 0, 1, 12, 0, 0, 0);
    let inputDate = TestUtils.renderIntoDocument(
      <InputDate defaultValue={defaultValue}
                 dateFormat={dateFormat}
                 valueChanged={callbackSpy} />
    );

    let input = TestUtils.findRenderedDOMComponentWithTag(inputDate, 'input');
    expect(input.value).toEqual('01/01/2000 12:00:00');
  });

  it('check input: press ENTER with wrong value', () => {

    let inputDate = TestUtils.renderIntoDocument(
      <InputDate defaultValue={defaultValue}
                 dateFormat={dateFormat}
                 valueChanged={callbackSpy} />
    );  
    let input = TestUtils.findRenderedDOMComponentWithTag(inputDate, 'input');
    TestUtils.Simulate.change(input, { target: { value: '11' } });
    TestUtils.Simulate.keyPress(input, {charCode: 13});

    expect(callbackSpy).toHaveBeenCalledWith(undefined, '11');
    expect(callbackSpy.calls.count()).toEqual(1);
  });

  it('check input: press ENTER with correct value', () => {

    let inputDate = TestUtils.renderIntoDocument(
      <InputDate defaultValue={defaultValue}
                 dateFormat={dateFormat}
                 valueChanged={callbackSpy} />
    );  
    let input = TestUtils.findRenderedDOMComponentWithTag(inputDate, 'input');
    TestUtils.Simulate.change(input, { target: { value: '01/01/2016 12:12:33' } });
    TestUtils.Simulate.keyPress(input, {charCode: 13});

    expect(callbackSpy).toHaveBeenCalledWith(new Date(2016, 0, 1, 12, 12, 33, 0), '01/01/2016 12:12:33');
    expect(callbackSpy.calls.count()).toEqual(1);
  });  

  it('check input: lost focus with wrong value', () => {

    let inputDate = TestUtils.renderIntoDocument(
      <InputDate defaultValue={defaultValue}
                 dateFormat={dateFormat}
                 valueChanged={callbackSpy} />
    );  
    let input = TestUtils.findRenderedDOMComponentWithTag(inputDate, 'input');
    TestUtils.Simulate.change(input, { target: { value: '11' } });
    TestUtils.Simulate.blur(input);

    expect(callbackSpy).toHaveBeenCalledWith(undefined, '11');
    expect(callbackSpy.calls.count()).toEqual(1);
  }); 

  it('check input: lost focus with correct value', () => {

    let inputDate = TestUtils.renderIntoDocument(
      <InputDate defaultValue={defaultValue}
                 dateFormat={dateFormat}
                 valueChanged={callbackSpy} />
    );  
    let input = TestUtils.findRenderedDOMComponentWithTag(inputDate, 'input');
    TestUtils.Simulate.change(input, { target: { value: '01/01/2015 01:02:03' } });
    TestUtils.Simulate.blur(input);

    expect(callbackSpy).toHaveBeenCalledWith(new Date(2015, 0, 1, 1, 2, 3, 0), '01/01/2015 01:02:03');
    expect(callbackSpy.calls.count()).toEqual(1);
  });     

});