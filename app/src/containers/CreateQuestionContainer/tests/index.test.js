import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import CreateQuestionContainer from '../index';


describe('<CreateQuestionContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <CreateQuestionContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
