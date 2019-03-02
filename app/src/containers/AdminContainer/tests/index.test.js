import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import AdminContainer from '../index';


describe('<AdminContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <AdminContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
