// @flow

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Link from '../../components/Link';

Enzyme.configure({ adapter: new Adapter() });

const setup = (setupProps = {}) => {
  const defaultProps = {
    active: false,
    onClick: jest.fn(),
    children: 'Test link'
  };
  const props = { ...defaultProps, ...setupProps };
  const wrapper = shallow(
    <Link active={props.active} onClick={props.onClick}>
      {props.children}
    </Link>
  );

  return {
    props,
    wrapper
  };
};

describe('Link', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  test('renders a span when active is true', () => {
    const { wrapper } = setup({ active: true });
    expect(wrapper).toMatchSnapshot();
  });

  test('calls onClick() on click', () => {
    const preventDefault = jest.fn();
    const { props, wrapper } = setup();
    expect(wrapper).toMatchSnapshot();

    const link = wrapper.find('a');
    link.simulate('click', { preventDefault });

    expect(props.onClick).toBeCalled();
    expect(preventDefault).toBeCalled();
  });
});
