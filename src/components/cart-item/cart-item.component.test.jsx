import React from "react";
import { shallow } from "enzyme";
import CartItem from './cart-item.component';

describe('CartItem component', () => {
    let wrapper, mockProps;

    beforeEach(() => {
        mockProps = {
            item: {
                imageUrl: 'https://i.ibb.co/bPmVXyP/black-converse.png',
                name: "Black Converse",
                price: 110,
                quantity: 1
            }
        }


        wrapper = shallow(<CartItem  {...mockProps} />);
    })

    it('render basic component', () => {
        expect(wrapper).toMatchSnapshot();
    })

})