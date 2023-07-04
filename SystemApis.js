import getConfig from 'next/config'

export const EndPoint = getConfig().publicRuntimeConfig.backend_url;

export const HomeBanner = "/home/banner";
export const HomeCategory = "/home/category";

export const Categories = "/categories";
export const ProductsList = "/products";
export const ProductsListByImage = "/products/search_image";
export const ProductDetail = "/products/";

export const SignUp = "/sign-up";
export const SignIn = "/sign-in";

export const UserProfile = "/user";
export const UserShippingAddress = "/user/shipping_address";
export const UserBalances = "/user/balance";

export const GetOrderList = "/user/order";

export const CartApi = "/cart";

export const ShippingPrice = "/shipping_price";

export const OrderApi = "/order";
export const GetOrderApi = "/orders";

export const TotalSales = "/sales";