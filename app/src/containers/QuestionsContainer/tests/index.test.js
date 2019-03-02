import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import QuestionsContainer from '../index';


describe('<QuestionsContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <QuestionsContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
