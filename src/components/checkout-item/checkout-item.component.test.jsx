import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutItem, mapDispatchToProps } from './checkout-item.component';

describe('Checkout Item Component', () => {
    let wrapper, mockProps;
    const mockCartItems = {
        item: {
            imageUrl: 'https://i.ibb.co/bPmVXyP/black-converse.png',
            name: "Black Converse",
            price: 110,
            quantity: 1
        }
    };

    beforeEach(() => {
        mockProps = {
            cartItem: mockCartItems,
            clearItem: jest.fn(),
            addItem: jest.fn(),
            removeItem: jest.fn()
        };

        wrapper = shallow(<CheckoutItem {...mockProps} />);
    })

    it('render basic component', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('call removeItem action', () => {
        wrapper.find('#remove-item').simulate('click');
        expect(mockProps.removeItem).toHaveBeenCalled();
    })

    it('call addItem action', () => {
        wrapper.find('#add-item').simulate('click');
        expect(mockProps.addItem).toHaveBeenCalled();
    })

    it('call clearItem action', () => {
        wrapper.find('#clear-item').simulate('click');
        expect(mockProps.clearItem).toHaveBeenCalled();
    })

    it('call dispatch when actions are called', () => {
        const dispatch = jest.fn();
        const props = mapDispatchToProps(dispatch);

        props.clearItem();

        expect(dispatch).toHaveBeenCalled();

        props.addItem();

        expect(dispatch).toHaveBeenCalled();

        props.removeItem();

        expect(dispatch).toHaveBeenCalled();
    })
})