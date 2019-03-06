import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import DividendsContainer from '../index';


describe('<DividendsContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <DividendsContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
