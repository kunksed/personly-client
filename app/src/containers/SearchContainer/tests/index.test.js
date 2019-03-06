import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import SearchContainer from '../index';


describe('<SearchContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <SearchContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
