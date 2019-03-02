import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import PeopleListContainer from '../index';


describe('<PeopleListContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <PeopleListContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
