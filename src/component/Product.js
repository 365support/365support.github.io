import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';


function Product({shoes, setShoes}) {
  const navigate = useNavigate();
  let [count, setCount] = useState(2)

  let handleDetailClick = (i) => {
    navigate(`/detail/${i}`)
  }

  let handleGetData = () => {
    axios.get(`https://codingapple1.github.io/shop/data${count}.json`)
    .then((data)=>{
      if(data.status === 200){
        let copy = [...shoes, ...data.data]
        setShoes(copy)
        setCount(count + 1)
      }
    }).catch(()=>{
      console.log('err')
    })
  }

  return (
    <div>
      <div className="main-bg"></div>
      <Container>
        <Row>
          {shoes.map((li, i)=>{
            return(
              <Col md={4} key={i}>
                <img onClick={()=>handleDetailClick(li.id)} src={`https://codingapple1.github.io/shop/shoes${li.id+1}.jpg`} width="80%"/>
                <h4>{li.title}</h4>
                <p>{li.content}</p>
              </Col>
            )}
          )}
        </Row>
      </Container>
      <Button onClick={handleGetData} className={count>3 ? 'hide' : null} variant="primary">더보기</Button>{' '}
    </div>
  );
}

export default Product;