import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import EditShareholderUpdatePage from '../index';


describe('<EditShareholderUpdatePage />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <EditShareholderUpdatePage />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
