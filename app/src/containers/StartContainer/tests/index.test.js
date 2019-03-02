import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import StartContainer from '../index';


describe('<StartContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <StartContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
