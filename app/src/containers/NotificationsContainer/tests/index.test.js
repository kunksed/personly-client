import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import NotificationsContainer from '../index';


describe('<NotificationsContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <NotificationsContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
