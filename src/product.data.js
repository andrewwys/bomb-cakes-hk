import vanillaCakeImage from './assets/images/product-vanilla-cake.jpg';
import chocolateCakeImage from './assets/images/product-chocolate-cake.jpg';
import chestnutCakeImage from './assets/images/product-chestnut-cake.jpg';
import optionStrawberry from './assets/images/option-strawberry.jpg';

const sampleText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

export const PRODUCT_DATA = [
  {
    id: 0,
    title1: 'Chocolate',
    title2: 'Delight',
    desc: sampleText,
    button: 'Order Now!',
    image: chocolateCakeImage,
    price: 488,
  },
  {
    id: 1,
    title1: 'Vanilla',
    title2: 'Dream',
    desc: sampleText,
    button: 'Order Now!',
    image: vanillaCakeImage,
    price: 588,
  },
  {
    id: 2,
    title1: 'Chestnut',
    title2: 'Fantasy',
    desc: sampleText,
    button: 'Order Now!',
    image: chestnutCakeImage,
    price: 688,
  },
];

//PRODUCT_OPTIONS are applicable to product menu page. They should have a 3-digit ID no.
// option category have an ID ends with 00 (e.g. 100, 200)
// option values ID starts with 101 and so on.
export const PRODUCT_OPTIONS = [
  {
    id: 100,
    optionName: 'Cake size',
    optionCode: 'cakeSize',
    limit: 1,
    optionValues: [
      {
        id: 101,
        name: '6 inches',
        extraCost: 0,
        image: optionStrawberry,
      },
      {
        id: 102,
        name: '8 inches',
        extraCost: 120,
        image: optionStrawberry,
      },
    ],
  },
  {
    id: 200,
    optionName: 'Design',
    optionCode: 'design',
    limit: 1,
    optionValues: [
      {
        id: 201,
        name: 'Bliss',
        extraCost: 0,
        image: optionStrawberry,
      },
      {
        id: 202,
        name: 'Smooth',
        extraCost: 0,
        image: optionStrawberry,
      },
      {
        id: 203,
        name: 'Straight comb',
        extraCost: 0,
        image: optionStrawberry,
      },
      {
        id: 204,
        name: 'Wavy comb',
        extraCost: 0,
        image: optionStrawberry,
      },
      {
        id: 205,
        name: 'Rosette',
        extraCost: 20,
        image: optionStrawberry,
      },
      {
        id: 206,
        name: 'Filigree',
        extraCost: 20,
        image: optionStrawberry,
      },
    ],
  },
  {
    id: 300,
    optionName: 'Optional Toppings',
    optionCode: 'toppings',
    limit: 1,
    optionValues: [
      {
        id: 301,
        name: 'No toppings',
        extraCost: 0,
        image: optionStrawberry,
      },
      {
        id: 302,
        name: 'Strawberries',
        extraCost: 30,
        image: optionStrawberry,
      },
      {
        id: 303,
        name: 'Oreo',
        extraCost: 10,
        image: optionStrawberry,
      },
    ],
  },
  {
    id: 400,
    optionName: 'Optional decorations',
    optionCode: 'decorations',
    limit: 100,
    optionValues: [
      {
        id: 401,
        name: 'Gold ribbon',
        extraCost: 0,
        image: optionStrawberry,
      },
      {
        id: 402,
        name: 'Silver ribbon',
        extraCost: 0,
        image: optionStrawberry,
      },
      {
        id: 403,
        name: 'Orange cutout flowers',
        extraCost: 0,
        image: optionStrawberry,
      },
      {
        id: 404,
        name: 'White cutout flowers',
        extraCost: 0,
        image: optionStrawberry,
      },
    ],
  },
];

// Order details are options applicable to checkout pages. They should have a 4-digit ID no.
export const ORDER_DETAILS = [
  {
    id: 1000,
    optionName: 'Accessories',
    optionCode: 'accessories',
    limit: 0,
    optionValues: [
      {
        id: 1001,
        name: 'Candles',
        extraCost: 0,
        image: optionStrawberry,
      },
      {
        id: 1002,
        name: 'Cutlery',
        extraCost: 0,
        image: optionStrawberry,
      },
    ],
  },
];
