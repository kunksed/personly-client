import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import RisksContainer from '../index';


describe('<RisksContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <RisksContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
