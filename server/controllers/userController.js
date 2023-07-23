const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  User,
  UserInfo,
  Basket,
  Device,
  BasketDevice,
  Reviews,
} = require("../models/models");
const sequelize = require("../db");
const models = require("../models/models");
let idUser = null;

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
let userInfo = {};

const getUserInfo = async (id) => {
  userInfo = await UserInfo.findOne({
    where: { id: id },
  });
  return userInfo;
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role, userName, city, roleUser } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });

    await Basket.create({ userId: user.id });
    await UserInfo.create({ userName, city, roleUser });

    const token = generateJwt(user.id, user.email, user.role);
    idUser = user.id;
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("User is not found"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Wrong password specified"));
    }

    getUserInfo(user.id);
    const token = generateJwt(user.id, user.email, user.role);
    idUser = user.id;
    return res.json({ token });
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    getUserInfo(req.user.id);
    return res.json({ token });
  }

  async logOut(req, res){
    const token = generateJwt();
    return res.json(idUser);
  }
  
  async getBasket(req, res) {
    try {
      const basket = await Device.findAndCountAll({
        include: {
          model: BasketDevice,
          where: { basketId: idUser },
        },
      });

      return res.json(basket.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getCheckBasket(req, res) {
    const { id } = req.params;
    const basket = await sequelize.query(
      `SELECT *
            FROM basket_devices
            where basket_devices."basketId" = :basketId 
            and basket_devices."deviceId" = :deviceId`,
      {
        replacements: { deviceId: id, basketId: idUser },
      }
    );
    return res.json(basket[0]);
  }

  async addBasket(req, res) {
    const { id } = req.params;
    const basket = await BasketDevice.create({
      basketId: idUser,
      deviceId: id,
    });
    return res.json(basket);
  }

  async dellBasket(req, res) {
    const { id } = req.params;
    const basket = await BasketDevice.destroy({
      where: {
        basketId: idUser,
        deviceId: id,
      },
    });
    return res.json(basket);
  }

  async getReview(req, res) {
    const { id } = req.params;
    const DevReview = await sequelize.query(
      `SELECT *
      FROM reviews
      LEFT JOIN user_infos ON reviews."userId" = user_infos.id
      Where reviews."deviceId" = :id`,
      {
        replacements: { id: id },
      }
    );
    return res.json(DevReview[0]);
  }

  async createReview(req, res, next) {
    const { review } = req.body;
    const { id } = req.params;
    const DevReview = await Reviews.create({
      review,
      userId: idUser,
      userInfoId: idUser,
      deviceId: id,
    });
    return res.json(DevReview);
  }

  async dellReview(req, res, next) {
    const { id } = req.params;
    const DevReview = await Reviews.destroy({
      where: {
        userId: idUser,
        deviceId: id,
      },
    });
    return res.json(DevReview);
  }

  async getUser(req, res) {
    try{
    userInfo.roleUser === "Admin"
      // ? (userInfo = await UserInfo.findAll({}))
      ? (userInfo = await UserInfo.findOne({
        where: { id: idUser },
      }))
      : (userInfo = await UserInfo.findOne({
          where: { id: idUser },
        }));
    return res.json(userInfo);
    }
    catch{
      
      console.log(getUserInfo(idUser), '1253')
    }

  }

  async getQuantityDevicesInBasket(req, res) {
    const QuantityDevicesInBasket = await BasketDevice.count({
      where: {
        basketId: idUser,
      },
    });
    return res.json(QuantityDevicesInBasket);
  }
}

module.exports = new UserController();
