import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import BasketButton from "../components/UI/BasketButton";
import Reviews from "../components/UI/Reviews";
import Reting from "../components/UI/Reting";
import styles from "./DevicePage.module.css";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  return (
    <div className={styles.deviceBody}>
      <h2 className={styles.deviceName}>{device.name}</h2>
      <div className={styles.deviceBlok}>
        <img
          className={styles.deviceImage}
          src={process.env.REACT_APP_API_URL + device.img}
          alt=""
        />
        <div>
          <h4>Price : {device.price} grn</h4>
          <div className={styles.BuyBasketBlok}>
            <button className={styles.buttonBuy}>Buy</button>
            <BasketButton />
          </div>
          <Reting reting={device.reting} />
        </div>
      </div>
      <h1>Product description</h1>
      <div className={styles.infoDevice}>{device.aboutDevice}</div>

      <h1>Characteristics</h1>
      <div className={styles.infoDevice}>
        {!device.info ? (
          <>Without characteristicsі</>
        ) : (
          device.info.map((info, index) => (
            <div
              className={styles.listParam}
              key={info.id}
              style={{
                background: index % 2 === 0 ? "lightgray" : "transparent",
                padding: 10,
              }}
            >
              {info.title}: {info.description}
            </div>
          ))
        )}
      </div>
      <h1>Reviews</h1>
      <Reviews />
    </div>
  );
};

export default DevicePage;

//     {/* <div className={styles.rating_area}>
//    <input type="radio" id="star-5" name="rating" onClick={chooseRating()}></input>
//    <label for="star-5" title="Оценка «5»"></label>
//    <input type="radio" id="star-4" name="rating" value="4"></input>
//    <label for="star-4" title="Оценка «4»"></label>
//    <input type="radio" id="star-3" name="rating" value="3"></input>
//    <label for="star-3" title="Оценка «3»"></label>
//    <input type="radio" id="star-2" name="rating" value="2"></input>
//    <label for="star-2" title="Оценка «2»"></label>
//    <input type="radio" id="star-1" name="rating" value="1"></input>
//    <label for="star-1" title="Оценка «1»"></label>
// </div> */}

//     {/* <h3 className="starReting">
//       Rating:
//       <div
//         className="d-flex align-items-center justify-content-center"
//         style={{
//           background: `url(${bigStar}) no-repeat center center`,
//           width: 40,
//           height: 40,
//           backgroundSize: "cover",
//           fontSize: 25,
//         }}
//       >
//         {device.rating}
//       </div>
//     </h3> */}
