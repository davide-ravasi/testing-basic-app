import React from 'react';
import { shallow } from 'enzyme';
import { CollectionItem, mapDispatchToProps } from './collection-item.component';

describe('Collection-item component', () => {
    let wrapper, mockProps;

    beforeEach(() => {
        mockProps = {
            item: {
                imageUrl: 'https://i.ibb.co/bPmVXyP/black-converse.png',
                name: "Black Converse",
                price: 110,
                quantity: 1
            },
            addItem: jest.fn()
        }

        wrapper = shallow(<CollectionItem {...mockProps} />);
    })

    it('render collection item component', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('display the correct name', () => {
        const btn = wrapper.find('.item-name');

        expect(btn.text()).toMatch(mockProps.item.name);
    })

    it('display the correct price', () => {
        const btn = wrapper.find('.item-price');

        expect(btn.text()).toEqual(mockProps.item.price.toString());
    })

    it('display the correct imageURl', () => {
        const image = wrapper.find('.image');

        expect(image.props()["imageUrl"]).toBe(mockProps.item.imageUrl);
    });

    it('call  addItem action', () => {
        wrapper.find('.item-add').simulate('click');

        expect(mockProps.addItem).toHaveBeenCalled();
    })

    it('call dispatch when  addItem was called', () => {
        const dispatch = jest.fn();
        const props = mapDispatchToProps(dispatch);

        props.addItem();

        expect(dispatch).toHaveBeenCalled();
    })

})