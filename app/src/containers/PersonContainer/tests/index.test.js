import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import PersonContainer from '../index';


describe('<PersonContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <PersonContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
