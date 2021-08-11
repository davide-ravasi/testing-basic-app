import React from "react";
import { shallow } from "enzyme";

import { CartDropdown } from "./cart-dropdown.component";
import CartItem from "../cart-item/cart-item.component";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

describe("CartDropdown component", () => {
    let wrapper;
    let mockHistory;
    let mockDispatch;
    const mockCartItems = [{ id: 1 }, { id: 2 }, { id: 3 }];

    beforeEach(() => {
        mockHistory = {
            push: jest.fn(),
        };

        mockDispatch = jest.fn();

        const mockProps = {
            cartItems: mockCartItems,
            history: mockHistory,
            dispatch: mockDispatch,
        };

        wrapper = shallow(<CartDropdown {...mockProps} />);
    });

    it("should render CartDropdown component", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should render the exact nmbr of items as the mock cart items", () => {
        expect(wrapper.find(CartItem).length).toEqual(mockCartItems.length);
    })

    it("should call history and dispatch when click CartDropdownButton", () => {
        wrapper.find('CartDropdownButton').simulate('click');
        expect(mockHistory.push).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalled();
    })

    it("should render EmptyMessageContainer when cart empty", () => {
        const mockProps2 = {
            cartItems: [],
            history: mockHistory,
            dispatch: mockDispatch,
        };

        const newWrapper = shallow(<CartDropdown {...mockProps2} />);
        expect(newWrapper.exists('EmptyMessageContainer')).toBe(true);
    });
});
