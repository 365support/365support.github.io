import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js'
import Product from './component/Product';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import ProductDetail from './component/ProductDetail';

function App() {

  let [shoes, setShoes] = useState(data);
  let [stock, SetStock] = useState([10,11,12])
  let navigate = useNavigate();
  
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand onClick={()=>{navigate('/')}}>Shop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
          <Nav.Link href="#features">Cart</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/detail/:id')}}>Pricing</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Product shoes={shoes} setShoes={setShoes  }/>}/>
        <Route path="/detail/:id" element={<ProductDetail stock={stock} SetStock={SetStock} shoes={shoes}/>}/>
        <Route path="*" element={<div>없는 페이지에요</div>}/>
      </Routes>
      

      
  </div>
  );
}

export default App;
