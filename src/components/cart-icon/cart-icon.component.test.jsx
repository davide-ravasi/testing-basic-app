import React from "react";
import { shallow } from "enzyme";
import { CartIcon } from './cart-icon.component';

// Create the mock store
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();

// testare toggle

describe('CartIcon Component', () => {
    const mockToggle = jest.fn();
    const mockCount = 0;
    let wrapper, mockProps, store;


    beforeEach(() => {
        mockProps = {
            toggleCartHidden: mockToggle,
            itemCount: mockCount
        }

        wrapper = shallow(<CartIcon {...mockProps} />);

    })

    it('render basic component', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('expect count exists and be 3', () => {
        expect(wrapper.find('ItemCountContainer').length).toEqual(1);
        expect(wrapper.find('ItemCountContainer').text()).toEqual('0');

    })

    it('expect toggle to fire when icon is clicked', () => {
        wrapper.simulate('click');

        expect(mockProps.toggleCartHidden).toHaveBeenCalled();
    })
})