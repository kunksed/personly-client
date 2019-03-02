import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import AdminGenderContainer from '../index';


describe('<AdminGenderContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <AdminGenderContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
