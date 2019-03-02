import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import UpdateProfileContainer from '../index';


describe('<UpdateProfileContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <UpdateProfileContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
