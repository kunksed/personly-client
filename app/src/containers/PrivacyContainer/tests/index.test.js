import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import PrivacyContainer from '../index';


describe('<PrivacyContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <PrivacyContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
