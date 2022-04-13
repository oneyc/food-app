import React, { useReducer } from "react";
import CartContext from './cart-context.js'

const defaultCartState = {
    items: [],
    totalAmount: 0
}

//reducer is pretty much the souls of the cartprovider
const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        const updatedAmounts = state.totalAmount + action.item.price * action.item.amount;

        //find same id
        const matchedItemIndexInCart = state.items.findIndex(
            item => item.id === action.item.id
        );

        const matchedItem = state.items[matchedItemIndexInCart]
        let newCartItems;

        if(matchedItem){
          //edit the amount here
          const matchedItemState = {...matchedItem, amount:matchedItem.amount + action.item.amount};
          newCartItems = [...state.items];
          newCartItems[matchedItemIndexInCart] = matchedItemState;
        }else{
            newCartItems = state.items.concat(action.item)
        }
        return{            
            items: newCartItems,
            totalAmount: updatedAmounts
    };
}
    if(action.type === 'REMOVE'){
        const matchedItemIndexInCart = state.items.findIndex(
            item => item.id === action.id
        );
        let newCartItems;
        const matchedItem = state.items[matchedItemIndexInCart];
        const updatedAmounts = state.totalAmount - matchedItem.price;

        //use filter to remove it
        if(matchedItem.amount === 1){
            newCartItems = state.items.filter(item => 
                item.id !== action.id
            );
        };
        if (matchedItem.amount > 1){
            //we change amount here
            const matchedItemState = {...matchedItem, amount: matchedItem.amount - 1}
            newCartItems = [...state.items]
            newCartItems[matchedItemIndexInCart] = matchedItemState
        };
        return{
            items: newCartItems,
            totalAmount: updatedAmounts
        };

    }
    return defaultCartState;
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    }
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id});
    }

    const cartContext ={
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;