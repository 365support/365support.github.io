import { Navbar, Nav, Container } from "react-bootstrap";
import { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import ProductDetail from "./component/ProductDetail";
import data from "./data.js";
import Product from "./component/Product";
import Cart from "./component/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export let Context1 = createContext(); // 1. state 보관함 만들기

function App() {
  let [shoes, setShoes] = useState(data);
  let [stock, SetStock] = useState([10, 11, 12]);
  let navigate = useNavigate();

  let getServerData = useQuery("getName", () =>
    axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
      return a.data;
    })
  );
  // react query
  // 1. 성공, 실패 , 로딩중 쉽게 파악 가능
  // getServerData.data
  // getServerData.isLoading
  // getServerData.error
  // 2. 자동으로 재요청 해줌 (refetch)
  // 3. 실패시 retry 해줌
  // 4. state 공유하지 않아도 됨
  // 5. ajax 결과 캐싱 가능

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            Shop
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail/:id");
              }}
            >
              Pricing
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {getServerData.data && getServerData.data.name}
            {getServerData.error && "에러남"}
            {getServerData.isLoading && "로딩중"}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={<Product shoes={shoes} setShoes={setShoes} />}
        />
        <Route
          path="/detail/:id"
          element={
            // 2. 공유를 원하는 컴포넌트에 감싸기
            // 3. value 안에 공유할 state 넣기
            <Context1.Provider value={{ shoes, stock }}>
              <ProductDetail stock={stock} SetStock={SetStock} shoes={shoes} />
            </Context1.Provider>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>없는 페이지에요</div>} />
      </Routes>
    </div>
  );
}

export default App;
