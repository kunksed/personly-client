import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import EditQuestionContainer from '../index';


describe('<EditQuestionContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <EditQuestionContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
