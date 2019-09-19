import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Board from './Board';

it('renders without crashing', () => {
  let wrapper = mount(<Board />);
  wrapper.setState({
    board: [[false, false, false, true, false],
    [false, false, false, true, false], [false, false, false, true, false],
    [false, false, false, true, false], [false, false, false, true, false]]
  });
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it('handles cell-clicks correctly', () => {
  let wrapper = mount(<Board />);
  wrapper.setState({
    board: [[false, false, false, false, false],
    [false, false, false, false, false], [false, false, false, false, false],
    [false, false, false, false, false], [false, false, false, false, false]]
  });
  wrapper.find('td').first()
    .simulate('click', { target: { value: false } });
  expect(wrapper.state().board).toEqual([[true, true, false, false, false],
  [true, false, false, false, false], [false, false, false, false, false],
  [false, false, false, false, false], [false, false, false, false, false]]);
});