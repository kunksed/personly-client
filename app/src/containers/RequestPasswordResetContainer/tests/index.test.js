import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import RequestPasswordResetContainer from '../index';


describe('<RequestPasswordResetContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <RequestPasswordResetContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
