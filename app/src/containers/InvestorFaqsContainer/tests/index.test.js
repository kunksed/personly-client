import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import InvestorFaqsContainer from '../index';


describe('<InvestorFaqsContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <InvestorFaqsContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
