import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import TradesListContainer from '../index';


describe('<TradesListContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <TradesListContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
