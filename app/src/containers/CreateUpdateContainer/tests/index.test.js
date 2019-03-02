import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import CreateUpdateContainer from '../index';


describe('<CreateUpdateContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <CreateUpdateContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
