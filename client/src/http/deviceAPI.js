import { $authHost, $host } from "./index";

export const fetcLogOut = async () => {
  const { data } = await $authHost.get("api/user/logout");
  return data;
};

export const fetchUserInfo = async () => {
  const { data } = await $authHost.get("api/user/profile");
  return data;
};

export const fetchquantityDevicesInBasket = async () => {
  const { data } = await $authHost.get("api/user/getQuantityDevicesInBasket");
  return data;
};

export const fetchChekBasket = async (id) => {
  const { data } = await $host.get("api/basket/chekbasket/" + id);
  return data;
};

export const addDeviceToBasket = async (id) => {
  const { data } = await $host.post("api/basket/add/" + id);
  return data;
};

export const dellDeviceToBasket = async (id) => {
  const { data } = await $host.delete("api/basket/dell/" + id);
  return data;
};
export const createReview = async ({ id, review }) => {
  const { data } = await $authHost.post("api/review/add/" + id, { review });
  return data;
};

export const fetchReviews = async (id) => {
  const { data } = await $host.get("api/review/getreview/" + id);
  return data;
};

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const fetchDevices = async (typeId, brandId, page = 10, limit = 10) => {
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};
