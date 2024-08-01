import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, addItem, clearCart } from "../../slice/itemsSlice";
const Order = () => {
  const list = useSelector((item) => item.items.list);
  const totalPrice = useSelector((item) => item.items.price);
  const dispatch = useDispatch();

  const ClearShopCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    console.log(list);
    console.log(totalPrice);
  }, []);
  return (
    <div className={styles.cart}>
      <div className={styles.cartHeader}>
        <h2>Корзина</h2>
        <button onClick={() => ClearShopCart()} className={styles.clearCart}>
          Очистить корзину
        </button>
      </div>

      {list.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <img className={styles.itemImage} src={item.imageUrl} alt="#" />
          <div className={styles.columnFlex}>
            <div className={styles.itemDetails}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <div className={styles.rowFlex}>
              <div className={styles.itemPrice}>
                <span>{item.price} сум</span>
              </div>
              <div className={styles.itemQuantity}>
                <button className={styles.quantityBtn}>-</button>
                <span>1</span>
                <button className={styles.quantityBtn}>+</button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.cartSummary}>
        <div className={styles.summaryItem}>
          <span>Товары</span>
          <span>{totalPrice} сум</span>
        </div>
        <div className={styles.summaryItem}>
          <span>К оплате</span>
          <span>{totalPrice} сум</span>
        </div>
      </div>
      <button className={styles.checkoutBtn}>Оформить заказ</button>
    </div>
  );
};

export default Order;
