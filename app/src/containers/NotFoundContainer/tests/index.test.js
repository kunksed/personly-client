import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import NotFoundContainer from '../index';


describe('<NotFoundContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <NotFoundContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
