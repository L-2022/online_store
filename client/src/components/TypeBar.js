import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <ListGroup>
      {device.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === device.selectedType.id}
          onClick={() => device.setSelectedType(type)}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
      {device.selectedType.id ? (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          className="p-3 mb-2 bg-danger text-white"
          onClick={() => {
            device.setSelectedType("");
          }}
        >
          Clear type filter
        </ListGroup.Item>
      ) : (
        <></>
      )}
    </ListGroup>
  );
});

export default TypeBar;
