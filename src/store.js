import { configureStore, createSlice } from "@reduxjs/toolkit";

// useState 역할
// state 하나를 slice라고 부름
// 1. createSlice 만들기
createSlice({
  name: "state이름",
  initialState: "값",
});

let user = createSlice({
  name: "user",
  initialState: "kim",
  // 1. state 수정해주는 함수 만들기
  reducers: {
    changeName(state) {
      // state 는 기존 state
      return "john kim";
    },
    changeName1() {
      return "hi";
    },
  },
});

// 2. 만든 함수 export
export let { changeName, changeName1 } = user.actions;

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let cart = createSlice({
  name: "stock",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      let currentNumber = state.findIndex((data) => {
        return data.id === action.payload;
      });
      state[currentNumber].count++;
    },
    addItem(state, action) {
      console.log(action.payload);
      state.push(action.payload);
    },
  },
});

export let { addCount, addItem } = cart.actions;

// 2. 등록해야 사용 가능
export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
