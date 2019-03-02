import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import UserContainer from '../index';


describe('<UserContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <UserContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
