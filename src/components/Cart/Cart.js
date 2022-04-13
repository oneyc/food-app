import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';
import CartItem from './CartItem'

//Cart module refers to the overlay module that shows up when we click on Cart button in header

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  //toFixed to limit the total amount to 2 decimals
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const addItemToCartHandler = (item) => {
    cartCtx.addItem({...item, amount: 1})
    console.log(cartCtx.items)
  };

  const removeItemFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={addItemToCartHandler.bind(null, item)}
            onRemove={removeItemFromCartHandler.bind(null, item.id)}
          />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
