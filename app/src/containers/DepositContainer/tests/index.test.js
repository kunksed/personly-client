import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import DepositContainer from '../index';


describe('<DepositContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <DepositContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
