import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import LeaderboardContainer from '../index';


describe('<LeaderboardContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <LeaderboardContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
