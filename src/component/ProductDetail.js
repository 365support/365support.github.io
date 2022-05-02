import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail({shoes, stock, SetStock}) {
  let {id} = useParams();
  let findProduct = shoes.find((x) => {
    return x.id == id;
  });

  let [alert, setAlert] = useState(true);

  useEffect(()=>{
    let timer = setTimeout(()=>{ setAlert(false) },2000);
    return()=>{
      clearTimeout(timer);
    }
  },[])

  let handleStockMinus = () => {
    let newStock = [...stock]
    if(newStock[findProduct.id] > 0){
      newStock[findProduct.id] -= 1
    }
    SetStock(newStock)
  }

  return (
    <div className="container">
      {alert && <div>2초 이내 구매시 할인</div>}
      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${findProduct.id+1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findProduct.title}</h4>
          <p>{findProduct.content}</p>
          <p>{findProduct.price}원</p>
          <p>재고 : {stock[findProduct.id]}</p>
          <button onClick={()=>handleStockMinus()} className="btn btn-danger">주문하기</button> 
        </div>
      </div>
    </div> 
  );
}

export default ProductDetail;