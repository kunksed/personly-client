import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import SettingsSidebar from '../index';

describe('<SettingsSidebar />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <SettingsSidebar />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
