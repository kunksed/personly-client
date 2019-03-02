import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import ShareholdersContainer from '../index';


describe('<ShareholdersContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <ShareholdersContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
