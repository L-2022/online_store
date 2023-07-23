import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";


const DeviceList = observer(() => {
  const [basketDevices, setBasketDevices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/basket/")
      .then((res) => res.json())
      .then((basketDevices) => {
        setBasketDevices(basketDevices);
      })
      .catch((error) => console.log(error.messge));
  }, []);

  return (
    <Row className="d-flex deviceList">
      {basketDevices && (
        <>
          {basketDevices.map((device) => (
            <DeviceItem key={device.id} device={device} />
          ))}
        </>
      )}
    </Row>
  );
});

export default DeviceList;
