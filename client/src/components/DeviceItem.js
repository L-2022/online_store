import { useHistory } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import BasketButton from "./UI/BasketButton";
import Reting from "./UI/Reting";
import styles from "./DeviceItem.module.css";

const DeviceItem = ({ device }) => {
  const history = useHistory();

  return (
    <div className={styles.menu}>
      <div className={styles.menu__wrapper}>
        <div className={styles.menu_list}>
          <img
            className={styles.listImagesDevices}
            onClick={() => history.push(DEVICE_ROUTE + "/" + device.id)}
            src={process.env.REACT_APP_API_URL + device.img}
            alt=""
          />
          <div className={styles.deviceDescribeInList}>
            <div className={styles.retingPriseBasket}>
              <Reting reting={device.reting} />
              <div className={styles.priceInList}>{device.price} grn</div>
            </div>
            <div className={styles.busketButton}>
              <BasketButton deviceId={device.id} />
            </div>
          </div>
          <div
            className={styles.deviceNameInList}
            onClick={() => history.push(DEVICE_ROUTE + "/" + device.id)}
            src={process.env.REACT_APP_API_URL + device.img}
          >
            {device.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceItem;
