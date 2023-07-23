import { TiShoppingCart } from "react-icons/ti";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../index";
import {
  fetchChekBasket,
  addDeviceToBasket,
  dellDeviceToBasket,
} from "../../http/deviceAPI";
import styles from "../BasketButton.module.css";

const AddToBasketButton = ({ deviceId }) => {
  let { id } = useParams();
  const { user } = useContext(Context);
  const [statusBasket, setBasket] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);

  if (deviceId) {
    id = deviceId;
  }

  useEffect(() => {
    if (user.isAuth) {
      fetchChekBasket(id)
        .then((statusBasket) => {
          setButtonClicked(false);
          setBasket(statusBasket);
          user.setBasketStatus(true);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [buttonClicked]);

  const addToBasket = async () => {
    try {
      addDeviceToBasket(id).then(setButtonClicked(true));
    } catch (error) {
      console.error(
        "An error occurred while adding the product to the basket.",
        error
      );
    }
  };

  const dellToBasket = async () => {
    try {
      dellDeviceToBasket(id).then(setButtonClicked(true));
    } catch (error) {
      console.error(
        "An error occurred while removing the product to the cart.",
        error
      );
    }
  };

  if (!user.isAuth) {
    return <></>;
  }

  if (deviceId) {
    id = deviceId;
    return (
      <>
        {statusBasket && (
          <div>
            {!statusBasket.length ? (
              <button onClick={addToBasket}>
                <TiShoppingCart className={styles.buttonAddBasket} />
              </button>
            ) : (
              <button onClick={dellToBasket}>
                <TiShoppingCart className={styles.buttonDellBasket} />
              </button>
            )}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {statusBasket && (
        <div>
          {!statusBasket.length ? (
            <button onClick={addToBasket}>
              <TiShoppingCart className={styles.buttonAddBasket} />
            </button>
          ) : (
            <button onClick={dellToBasket}>
              <TiShoppingCart className={styles.buttonDellBasket} />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default AddToBasketButton;
