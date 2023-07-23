import {Container} from "react-bootstrap";
import DeviceListBasket from "../components/DeviceListBasket";
import Pages from "../components/Pages";

const Basket = () => {
  return (
    <Container>
          <DeviceListBasket />
          <Pages/>
    </Container>
  );
};

export default Basket;

