import React, { useEffect } from 'react';

function TabContent({tab, setCssSwitch}) {

  useEffect(()=>{
    setCssSwitch(true);
  })

  if (tab === 0){
    return <div>내용0</div>
  } else if (tab === 1){
    return <div>내용1</div>
  } else if (tab === 2){
    return <div>내용2</div>
  }
}

export default TabContent;