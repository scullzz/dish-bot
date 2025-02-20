import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  increase,
  decrease,
  createOrder,
} from "../../slice/itemsSlice";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const tg = window.Telegram.WebApp;

  const nav = useNavigate();
  const [userData, setUserData] = useState({});
  const list = useSelector((item) => item.items.list);
  const totalPrice = useSelector((item) => item.items.price);
  const orderList = useSelector((item) => item.items.orderList);
  const dispatch = useDispatch();

  const getPhoneNumberById = async (id) => {
    try {
      const response = await fetch(
        `https://pluswibe.space/api/user_info/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        alert("Fuck Bot");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const data = tg.initDataUnsafe?.user;
    setUserData(data);
  }, []);

  const ClearShopCart = () => {
    dispatch(clearCart());
  };

  const Decrease = (item) => {
    dispatch(decrease(item));
  };

  const Increase = (item) => {
    dispatch(increase(item));
  };

  useEffect(() => {
    if (orderList.length > 0) {
      MakeOrder();
    }
  }, [orderList]);

  const GenerateOrder = () => {
    dispatch(createOrder());
  };

  const MakeOrder = async () => {
    try {
      const userPhone = await getPhoneNumberById(userData?.id);

      const orderData = {
        user_id: userData?.id,
        items: orderList,
        locationUrl: "blabla",
        phoneNumber: userPhone?.phoneNumber,
      };

      console.log("Sending order data:", orderData);

      const response = await fetch("https://pluswibe.space/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        ClearShopCart();
        tg.close();
      } else {
        const errorData = await response.json();
        console.error("Order creation failed:", errorData);
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cartHeader}>
        <div className={styles.flex}>
          <button
            className={styles.backButton}
            onClick={() => {
              nav("/");
            }}
          >
            <span className={styles.arrow}></span>
          </button>
          <h2>Корзина</h2>
        </div>
        <button onClick={() => ClearShopCart()} className={styles.clearCart}>
          Очистить корзину
        </button>
      </div>

      {list.map((item, index) => (
        <div key={index} className={styles.cartItem}>
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
                <button
                  onClick={() => Decrease(item)}
                  className={styles.quantityBtn}
                >
                  -
                </button>
                <span> {item.quantity} </span>
                <button
                  onClick={() => Increase(item)}
                  className={styles.quantityBtn}
                >
                  +
                </button>
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
      <button onClick={() => GenerateOrder()} className={styles.checkoutBtn}>
        Оформить заказ
      </button>
    </div>
  );
};

export default Order;
