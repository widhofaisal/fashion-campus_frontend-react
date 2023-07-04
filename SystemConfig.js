import {
  HomeOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  PoweroffOutlined,
  FundOutlined
} from "@ant-design/icons";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

//Import and configure API

//Accounts
export const AUser = "StartupCampus";
export const APass = "7djIRiCF9O";

//Misc
export const shippingMethods = [
  {name: "Regular", id: "regular"},
  {name: "Next Day", id: "tomorrow"}
];

//MENU
export const menubarItems = [
  getItem("Homepage", "home", <HomeOutlined />),
  getItem("Orders", "orders", <FundOutlined />),
  getItem("Product", "products", <ShoppingCartOutlined />),
  getItem("Product Categories", "productCategories", <AppstoreOutlined />),
  getItem("Logout", "logout", <PoweroffOutlined />),
];

export const profileMenuItems = [
  getItem("My Account", "myAccount"),
  getItem("My Orders", "myOrders"),
  getItem("My Balances", "myBalances"),
  getItem("Logout", "logout"),
]

//FORM
export const productFormStructure = [
  ["Name", "name", "text", [
    {
      required: true,
      message: 'Please input product name!',
    },
  ]],
  ["Description", "description", "multilineText", "none"],
  ["Price", "price", "number", [
    {
      required: true,
      message: 'Please input product price!',
    }
  ]],
  ["Category", "category", "selectBox", [
    {
      required: true,
      message: 'Please choose products category!',
    },
  ], []],
  ["Condition", "condition", "selectBox", [
    {
      required: true,
      message: 'Please choose products condition!',
    },
  ], ["new", "used"]],
  ["Image", "image", "uploadImage"]
];

export const shippingFormStructure = [
  ["Name", "name", "text", [
    {
      required: true,
      message: 'Please input shipping name!',
    },
  ]],
  ["Phone", "phone", "text", [
    {
      required: true,
      message: 'Please input shipping phone!',
    },
  ]],
  ["Address", "address", "multilineText", [
    {
      required: true,
      message: 'Please input shipping address!',
    },
  ]],
  ["City", "city", "text", [
    {
      required: true,
      message: 'Please input shipping city!',
    },
  ]],
]

export const productCategoryFormStructure = [
  ["Title", "title", "text", [
    {
      required: true,
      message: 'Please input product category title!',
    },
  ]],
];