import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: 'books',
    initialState: { books: []},
    reducers: {
        updateBookState(state, action){
            state.books=action.payload.books;
        },
        addtoCart: (state, action) => {
            state.cartData.push(action.payload);
          },
    }
});
export const bookActions = bookSlice.actions;
export default bookSlice.reducer;