
const ShoesService = require('./services/ShoesService');
const AccountAccessService = require('./services/AccountAccessService');
const clothesService = require('./services/clothesService');
const accessoriesService = require('./services/AccessoriesService');

const areas = ["Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beer Sheva", "Holon", "Bnei Brak", "Bat Yam", "Ramat Gan", "Ashkelon", "Herzliya", "Kfar Saba", "Modiin", "Nahariya", "Beit Shemesh", "Nazareth", "Tiberias", "Eilat", "Acre", "Lod", "Ra'anana", "Hadera", "Kiryat Gat", "Betar Illit", "Hod HaSharon", "Rosh HaAyin", "Qiryat Ata"];

async function insertUsers() {
  const users = [
    {
      email: "michalk195265546@gmail.com",
      password: "1234",
      name: "Michal Kastner",
      phone: "0556721924",
      verifyPassword: "1234",
      area: areas[Math.floor(Math.random() * areas.length)]
    },
    {
      email: "john.doe@example.com",
      password: "abcd",
      name: "John Doe",
      phone: "0543210987",
      verifyPassword: "abcd",
      area: areas[Math.floor(Math.random() * areas.length)]
    },
    {
      email: "jane.smith@example.com",
      password: "5678",
      name: "Jane Smith",
      phone: "0523456789",
      verifyPassword: "5678",
      area: areas[Math.floor(Math.random() * areas.length)]
    },
    {
      email: "alex.jones@example.com",
      password: "efgh",
      name: "Alex Jones",
      phone: "0551234567",
      verifyPassword: "efgh",
      area: areas[Math.floor(Math.random() * areas.length)]
    },
    {
      email: "emily.brown@example.com",
      password: "ijkl",
      name: "Emily Brown",
      phone: "0509876543",
      verifyPassword: "ijkl",
      area: areas[Math.floor(Math.random() * areas.length)]
    }
  ];
  try {
    for (let user of users) {
      await AccountAccessService.signUp(user);
    }
    console.log('Users have been inserted successfully.');
  }
  catch (err) {
    console.error('Error inserting users:', err);
  }
}

const clothesSelectors = [
  { title: "type", options: ["t-shirt", "shirt", "blouse", "tank top", "sweater", "hoodie", "jacket", "coat", "dress", "skirt", "jeans", "trousers", "shorts", "leggings", "suit", "tie", "scarf", "gloves", "hat", "socks", "swimsuit", "robe", "pajamas"] },
  { title: "color", options: ["black", "blue", "red", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "white"] },
  { title: "size", options: ["XS", "S", "M", "L", "XL", "XXL"] }
];

const shoesSelectors = [
  { title: "type", options: ["sneakers", "boots", "sandals", "loafers", "heels", "flats", "oxfords", "slippers", "espadrilles", "flip-flops", "wedges", "moccasins", "athletic shoes", "pumps", "platforms", "mary janes"] },
  { title: "color", options: ["black", "blue", "red", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "white"] },
  { title: "size", options: ["19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48"] }
];

const accessoriesSelectors = [
  { title: "type", options: ["necklace", "bracelet", "ring", "earrings", "watch", "belt", "scarf", "hat", "sunglasses", "gloves", "handbag", "backpack", "wallet", "tie", "bow tie", "hairpin", "headband", "umbrella"] },
  { title: "color", options: ["black", "blue", "red", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "white"] }
];

const userIds = [
  "6684446b248034cbfa0e28f3",
  "6684446b248034cbfa0e28f5",
  "6684446b248034cbfa0e28f7",
  "6684446c248034cbfa0e28f9",
  "6684446c248034cbfa0e28fb"
];

function getRandomOption(options) {
  return options[Math.floor(Math.random() * options.length)];
}

function getRandomPrice(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function getRandomDescription() {
  const descriptions = [
    "Stylish and comfortable.",
    "Perfect for any occasion.",
    "Made from high-quality materials.",
    "A must-have for your wardrobe.",
    "Trendy and fashionable.",
    "Great for casual wear.",
    "Elegant and chic.",
    "Durable and long-lasting.",
    "Soft and cozy.",
    "Available in various colors."
  ];
  return getRandomOption(descriptions);
}

function getRandomTitle() {
  const titles = [
    "Stylish and comfortable.",
    "Perfect for any occasion.",
    "Made from high-quality materials.",
    "A must-have for your wardrobe.",
    "Trendy and fashionable.",
    "Great for casual wear.",
    "Elegant and chic.",
    "Durable and long-lasting.",
    "Soft and cozy.",
    "Available in various colors."
  ];
  return getRandomOption(titles);
}

async function insertClothes() {
  for (let i = 38; i <= 45; i++) {
    const product = {
      category: "clothes",
      type: getRandomOption(clothesSelectors.find(selector => selector.title === "type").options),
      color: getRandomOption(clothesSelectors.find(selector => selector.title === "color").options),
      size: getRandomOption(clothesSelectors.find(selector => selector.title === "size").options),
      price: getRandomPrice(10, 200),
      title: getRandomTitle(),
      description: getRandomDescription(),
      userId: userIds[Math.floor(Math.random() * userIds.length)],
      imageUrl: `./images/${i}.png`
    };

    await clothesService.insert(product);
  }

  console.log('7 clothes items have been inserted successfully.');
}

async function insertShoes() {
  for (let i = 1; i <= 18; i++) {
    const product = {
      category: "shoes",
      type: getRandomOption(shoesSelectors.find(selector => selector.title === "type").options),
      color: getRandomOption(shoesSelectors.find(selector => selector.title === "color").options),
      size: getRandomOption(shoesSelectors.find(selector => selector.title === "size").options),
      price: getRandomPrice(10, 200),
      title: getRandomTitle(),
      description: getRandomDescription(),
      userId: userIds[Math.floor(Math.random() * userIds.length)],
      imageUrl: `./images/${i}.png`
    };

    await ShoesService.insert(product);
  }

  console.log('shoes items have been inserted successfully.');

}

async function insertAccessories() {
  for (let i = 19; i <= 38; i++) {
    const product = {
      category: "accessories",
      type: getRandomOption(accessoriesSelectors.find(selector => selector.title === "type").options),
      color: getRandomOption(accessoriesSelectors.find(selector => selector.title === "color").options),
      price: getRandomPrice(10, 200),
      title: getRandomTitle(),
      description: getRandomDescription(),
      userId: userIds[Math.floor(Math.random() * userIds.length)],
      imageUrl: `./images/${i}.png`
    };

    await accessoriesService.insert(product);
  }

  console.log('Accessories items have been inserted successfully.');
}

async function initDB() {
  await insertUsers();
  await insertClothes();
  await insertShoes();
  await insertAccessories();
}

module.exports = { insertUsers, insertClothes, insertShoes, insertAccessories, initDB }
