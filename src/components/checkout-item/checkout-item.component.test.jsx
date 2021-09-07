import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutItem } from './checkout-item.component';

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
})