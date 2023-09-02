"use client";

import styles from "./styles.module.css";
import { useParams } from 'next/navigation';

const Header = () => {
  const params = useParams();
  // const comparePrice = () => {
  //   fetch(`/api/binance/5m-check`)
  // }
  // return (
  //   <div>
  //     <button onClick={()=>comparePrice()}>Compare with current binsnce price</button>
  //     <div className={styles.container}>{params.currency}</div>
  //   </div>
  
  // );
  return <div className={styles.container}>{params.currency}</div>
};

export default Header;
