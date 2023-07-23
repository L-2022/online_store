import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  USER_PROFILE,
} from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useHistory, NavLink } from "react-router-dom";
import { fetchquantityDevicesInBasket, fetcLogOut } from "../http/deviceAPI";
const NavBar = observer(() => {
  const { user } = useContext(Context);
  const [quantityDevicesInBasket, setQuantityDevicesInBasket] = useState(0);

  const history = useHistory();

  const logOut = () => {
    // user.setUser({});
    user.setIsAuth(false);
    fetcLogOut();
  };

  useEffect(() => {
    if (user.isAuth) {
      fetchquantityDevicesInBasket()
        .then((data) => {
          setQuantityDevicesInBasket(data);
          user.setBasketStatus(false);
        })
        .catch((error) => console.log(error.messge));
    }
  }, [user.isAuth, user.basketStatus]);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
          <span> Shop </span>
        </NavLink>

        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(USER_PROFILE)}
            >
              Your Profile:
            </Button>

            <Button
              className="position-relative"
              variant={"outline-light"}
              onClick={() => history.push(BASKET_ROUTE)}
            >
              Basket
              <span class="top-0 start-100 translate-middle badge rounded-pill bg-danger">
                <span class="visually-hidden">{quantityDevicesInBasket}</span>
              </span>
            </Button>

            {user.userRole === "Admin" || "Seller" ? (
              <Button
                variant={"outline-light"}
                onClick={() => history.push(ADMIN_ROUTE)}
              >
                Add device
              </Button>
            ) : (
              <></>
            )}

            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className="ml-2"
            >
              Out
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(LOGIN_ROUTE)}
            >
              Authorization
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
