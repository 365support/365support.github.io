import React from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount } from "../store.js";

function Cart() {
  // store에 요청보내주는 함수
  let dispatch = useDispatch();

  let cart = useSelector((state) => {
    return state.cart;
  });
  return (
    // tr 가로줄 행
    // th, td 세로줄 열
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, id) => (
            <tr key={id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(addCount(item.id));
                  }}
                >
                  +
                </button>
                {/* changeName 실행해달라고 store.js 에 부탁함 */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;

// 리덕스의 장점
// 많은 컴포넌트에서 하나의 state를 가져다 사용과 변경을 한다면
// 에러가 났을 때 어디서 수정을 했는지 찾아봐야 한다
// state 수정 함수를 미리 만들어 놓고 컴포넌트들이 수정 함수를 부르는 식으로 수정하게 되면
// 에러가 났을 때 store만 보면 돼서 에러 추적이 쉽다
