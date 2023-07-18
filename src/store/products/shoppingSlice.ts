import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductPrice } from "../../helper/getProductPrice";

export interface ShoppingState {
  gems: number;
  purchasedPotions: number[];
}

const initialState: ShoppingState = {
  gems: 3,
  purchasedPotions: [],
};

export const buyPotion = createAsyncThunk(
  "shopping/buyPotion",
  async (productId: number) => {
    const price = await getProductPrice(productId);
    return { productId, price };
  }
);

export const deletePotion = createAsyncThunk(
  "shopping/deletePotion",
  async (productId: number) => {
    const price = await getProductPrice(productId);
    return { productId, price };
  }
);

export const resetState = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(buyPotion.fulfilled, (state, action) => {
      const { productId, price } = action.payload;
      state.gems -= price;
      state.purchasedPotions.push(productId);
    });
    builder.addCase(deletePotion.fulfilled, (state, action) => {
      const { productId, price } = action.payload;
      state.purchasedPotions = state.purchasedPotions.filter(
        (id) => id !== productId
      );
      state.gems += price;
    });
  },
});

export const { reset } = resetState.actions;

export default resetState.reducer;
