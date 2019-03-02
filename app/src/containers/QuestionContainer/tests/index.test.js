import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import QuestionContainer from '../index';


describe('<QuestionContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <QuestionContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
