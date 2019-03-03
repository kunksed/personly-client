import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import GlobalLeaderboardContainer from '../index';


describe('<GlobalLeaderboardContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <GlobalLeaderboardContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
