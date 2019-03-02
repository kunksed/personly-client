import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import DashboardContainer from '../index';


describe('<DashboardContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <DashboardContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
