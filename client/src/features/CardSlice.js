import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [
    {
      url: "/images/Card-image1.webp",
      name: "glasses",
    },
    { url: "/images/Card-image2.webp", name: "Watches" },
    {
      url: "/images/Card-image3.webp",
      name: "JACKETS",
    },
    {
      url: "/images/Card-image4.webp",
      name: "Clothes",
    },
  ],
};

const CardSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    print: (state, action) => {
      console.log(state);
    },
  },
});

// export const {} = CardSlice.actions
export const Images = (state) => state.CardSlice;

export default CardSlice.reducer;
