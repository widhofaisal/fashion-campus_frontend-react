import { createSlice } from "@reduxjs/toolkit";
import { setCookie, deleteCookie, hasCookie, getCookie } from 'cookies-next';

const initialStateWishlist = {
    wishItems: hasCookie('wishItems') ? getCookie('wishItems').split(",") : [],
};

const wishlistReducer = createSlice({
    name: "wishlist",
    initialState: initialStateWishlist,
    reducers: {
        addItemWishlistHandler: (state, action) => {
            let wishItemsArr = state.wishItems;
            if (wishItemsArr.length == 0) {
                wishItemsArr = [action.payload.itemId];
            } else {
                wishItemsArr.push(action.payload.itemId);
            }

            state.wishItems = wishItemsArr;
            setCookie('wishItems', wishItemsArr.join(","));
        },
        removeItemWishlistHandler: (state, action) => {
            let wishItemsArr = state.wishItems;
            state.wishItems = wishItemsArr.filter(item => { return item != action.payload.itemId; });

            if (state.wishItems.length == 0) {
                deleteCookie('wishItems');
            } else {
                setCookie('wishItems', state.wishItems.join(","));
            }
        }

    }
});

export const { addItemWishlistHandler, removeItemWishlistHandler } = wishlistReducer.actions;

//Export for the variable
export const wishlistItems = (state) => state.wishlistReducer.wishItems;

export default wishlistReducer.reducer;