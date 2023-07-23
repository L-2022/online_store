import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex">
      {device.brands.map((brand) => (
        <Card
          style={{ cursor: "pointer" }}
          key={brand.id}
          className="p-3"
          onClick={() => device.setSelectedBrand(brand)}
          border={
            brand.id === device.selectedBrand.id
              ? "p-3 mb-2 bg-info text-white"
              : "light"
          }
        >
          {brand.name}
        </Card>
      ))}
      {device.selectedBrand.id ? (
        <Card
          style={{ cursor: "pointer" }}
          className="p-3 mb-2 bg-danger text-white"
          onClick={() => device.setSelectedBrand("")}
        >
          Clear brend filter
        </Card>
      ) : (
        <></>
      )}
    </Row>
  );
});

export default BrandBar;
