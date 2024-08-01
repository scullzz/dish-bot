import React, { useEffect } from "react";
import { addItem } from "../../slice/itemsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const getDataAndStoreInRedux = async () => {
    const response = await fetch("http://185.189.167.220:6969/api/products/", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      data.forEach((item) => {
        if (item.id !== 1) {
          dispatch(addItem(item));
        }
      });
    }
  };

  useEffect(() => {
    getDataAndStoreInRedux();
  }, [dispatch]);

  return (
    <div>
      <button
        onClick={() => {
          nav("order");
        }}
      >
        Move
      </button>
    </div>
  );
};

export default Main;
