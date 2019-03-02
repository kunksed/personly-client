import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import RegisterContainer from '../index';


describe('<RegisterContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <RegisterContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
