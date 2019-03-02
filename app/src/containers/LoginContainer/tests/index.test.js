import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import LoginContainer from '../index';


describe('<LoginContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <LoginContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
