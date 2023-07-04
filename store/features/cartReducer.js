import { createSlice } from "@reduxjs/toolkit";
import { setCookie, deleteCookie, hasCookie, getCookie } from 'cookies-next';

const initialState = {
    cartItems: hasCookie('cartItems') ? JSON.parse(getCookie('cartItems')) : [],
};

const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addChangeItemCartHandler: (state, action) => { 
            const itemReq = action.payload;

            let cartItemsArr = state.cartItems;
            let findFlag = false;

            cartItemsArr.forEach((item, index, parentArr) => {
                let tempItem = JSON.parse(item);
                if(tempItem.itemId == itemReq.itemId && tempItem.size == itemReq.size && itemReq.type == "add"){
                    tempItem.qty = parseInt(itemReq.qty) + parseInt(tempItem.qty);
                    findFlag = true;
                    parentArr[index] = JSON.stringify(tempItem);
                }
                /*else if(tempItem.itemId == itemReq.itemId && tempItem.size == itemReq.size && itemReq.type == "change"){
                    tempItem.qty = parseInt(itemReq.qty);
                    findFlag = true;
                    parentArr[index] = JSON.stringify(tempItem);
                }*/
            })

            if(!findFlag){
                if(cartItemsArr.length == 0){
                    cartItemsArr = [JSON.stringify({itemId: itemReq.itemId, size: itemReq.size, qty: parseInt(itemReq.qty)})];
                }else{
                    cartItemsArr.push(JSON.stringify({itemId: itemReq.itemId, size: itemReq.size, qty: parseInt(itemReq.qty)}));
                }
            }

            state.cartItems = cartItemsArr;
            setCookie('cartItems', JSON.stringify(cartItemsArr));
        },
        removeItemCartHandler: (state, action) => {
            state.cartItems = state.cartItems.filter(item => {
                let tempItem = JSON.parse(item);
                return tempItem.itemId != action.payload.itemId && tempItem.size != action.payload.size
            });

            if (state.cartItems.length == 0) {
                deleteCookie('cartItems');
            } else {
                setCookie('cartItems', JSON.stringify(state.cartItems));
            }
        },
        clearCartHandler: (state, action) => {
            deleteCookie('cartItems');
        }
    }
});

export const { addChangeItemCartHandler, removeItemCartHandler, clearCartHandler } = cartReducer.actions;

//Export for the variable
export const cartItems = (state) => state.cartReducer.cartItems;

export default cartReducer.reducer;