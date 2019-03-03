import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import TermsContainer from '../index';


describe('<TermsContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <TermsContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
