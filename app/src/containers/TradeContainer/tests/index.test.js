import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import TradeContainer from '../index';


describe('<TradeContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <TradeContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
