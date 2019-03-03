import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import ShareholderRelationsContainer from '../index';


describe('<ShareholderRelationsContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <ShareholderRelationsContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
