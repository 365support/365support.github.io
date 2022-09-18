import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import TabContent from "./TabContent";
import { addItem } from "../store.js";
// 4. 만들어둔 context import
import { Context1 } from "../App.js";
import "./ProductDetail.css";

function ProductDetail({ stock, SetStock }) {
  let { shoes } = useContext(Context1); // 5. state 보관함 해체 함수

  let dispatch = useDispatch();

  let [alert, setAlert] = useState(true);
  let [tab, setTap] = useState(0);
  let [cssSwitch, setCssSwitch] = useState(false);

  let { id } = useParams();
  let findProduct = shoes.find((x) => {
    return x.id == id;
  });

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // const handleOrderClick = () => {
  //   handleStockMinus();
  // };

  // let handleStockMinus = () => {
  //   let newStock = [...stock];
  //   if (newStock[findProduct.id] > 0) {
  //     newStock[findProduct.id] -= 1;
  //   }
  //   SetStock(newStock);
  // };

  let handleTabClick = (e) => {
    setTap(e);
    setCssSwitch(false);
  };

  useEffect(() => {
    let watchItem = localStorage.getItem("watched");
    watchItem = JSON.parse(watchItem);
    watchItem.push(findProduct.id);

    watchItem = new Set(watchItem);
    watchItem = Array.from(watchItem);
    localStorage.setItem("watched", JSON.stringify(watchItem));

    console.log(localStorage.getItem("watched"));
  }, []);

  return (
    <div className="container">
      {alert && <div>2초 이내 구매시 할인</div>}
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${
              findProduct.id + 1
            }.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findProduct.title}</h4>
          <p>{findProduct.content}</p>
          <p>{findProduct.price}원</p>
          <p>재고 : {stock[findProduct.id]}</p>
          <button
            onClick={() => {
              dispatch(
                addItem({
                  id: findProduct.id,
                  name: findProduct.content,
                  count: stock[findProduct.id],
                })
              );
            }}
            className="btn btn-danger"
          >
            주문하기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => handleTabClick(0)}>
            상품설명
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => handleTabClick(1)}>
            배송정보
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => handleTabClick(2)}>
            Option 3
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={cssSwitch} classNames="transition" timeout={500}>
        <TabContent tab={tab} setCssSwitch={setCssSwitch} />
      </CSSTransition>
    </div>
  );
}

export default ProductDetail;
