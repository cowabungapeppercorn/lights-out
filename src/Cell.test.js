import React from 'react';
import { shallow, mount } from 'enzyme'
import Cell from './Cell';

it('renders without crashing', () => {
  shallow(<Cell />);
});