import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import ForInvestorsPage from '../index';


describe('<ForInvestorsPage />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <ForInvestorsPage />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
