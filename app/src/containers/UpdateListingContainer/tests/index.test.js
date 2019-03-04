import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import UpdateListingContainer from '../index';


describe('<UpdateListingContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <UpdateListingContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
