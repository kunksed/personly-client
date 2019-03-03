import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import ContactContainer from '../index';


describe('<ContactContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <ContactContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
