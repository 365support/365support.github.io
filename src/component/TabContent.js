import React, { useEffect, useState } from "react";

function TabContent({ tab, setCssSwitch }) {
  let [fade, setFade] = useState("");

  // react 18 ver 이후 automatic batching 기능 추가
  // state 변경하는 함수들이 근처에 있으면 하나로 합쳐서 state를 변경한다
  // state를 변경하는 함수마다 재 렌더링이 되는 것이 아니라 state 변경이 다 되고 나서
  // 마지막에 재 렌더링을 해줌 setTimeout 대신 flushSync() 사용해도 가능

  useEffect(() => {
    setCssSwitch(true);

    let timer = setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
    // useEffect 실행 전에 실행됨
  }, [tab]);

  // if (tab === 0) {
  //   return <div>내용0</div>;
  // } else if (tab === 1) {
  //   return <div>내용1</div>;
  // } else if (tab === 2) {
  //   return <div>내용2</div>;
  // }

  // if문 없이 작성 가능
  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}

export default TabContent;
