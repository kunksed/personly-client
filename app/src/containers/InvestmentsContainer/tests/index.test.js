import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import InvestmentsContainer from '../index';


describe('<InvestmentsContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <InvestmentsContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
