import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import Faqcontainer from '../index';


describe('<Faqcontainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <Faqcontainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
