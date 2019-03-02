import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import ProfileContainer from '../index';


describe('<ProfileContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <ProfileContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
