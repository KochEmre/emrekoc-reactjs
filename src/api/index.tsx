import axios from "axios";
import { IProduct } from "../components/product-list";
import { DEVELOPER_EMAIL, API_ENDPOINT } from "../utils/constants";

// For custom config
// const instance = axios.create({
//   baseURL: "https://some-domain.com/api/",
//   timeout: 1000,
//   headers: { "X-Custom-Header": "foobar" },
// });


export const getProducts = async () => await axios.get(API_ENDPOINT + "products");

export const getProduct = async (id: string) =>
  await axios.get(API_ENDPOINT + "products/" + id);

export const addProduct = async (data: IProduct) =>
  await axios.post(API_ENDPOINT + "products/", {
    name: data.name,
    price: data.price,
    category: data.category,
    description: data.description,
    avatar: data.avatar,
    developerEmail: DEVELOPER_EMAIL,
  } as IProduct);

  export const getCategories = async () =>
    await axios.get(API_ENDPOINT + "categories");

  export const getCategory = async (id: string) =>
    await axios.get(API_ENDPOINT + "categories/" + id);
