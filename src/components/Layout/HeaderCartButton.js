import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

import CartContext from "../../store/cart-context.js"

const HeaderCartButton = (props) => {
  const[btnAnimation, setBtnAnimation] = useState(false)
  const cartCtx = useContext(CartContext)  

  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  
  const btnClasses = `${classes.button} ${btnAnimation? classes.bump : ''}`;

  useEffect(()=> {
    setBtnAnimation(true);
    const aniTimer = setTimeout(()=> {setBtnAnimation(false)}, 300);
    return(()=>{
      clearTimeout(aniTimer)
    })
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
