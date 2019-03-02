import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import ForPeoplePage from '../index';


describe('<ForPeoplePage />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <ForPeoplePage />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
