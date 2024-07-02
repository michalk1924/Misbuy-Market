
const AccountAccessService = require('./services/AccountAccessService');
const clothesService = require('./services/clothesService');

// List of areas
const areas = ["Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beer Sheva", "Holon", "Bnei Brak", "Bat Yam", "Ramat Gan", "Ashkelon", "Herzliya", "Kfar Saba", "Modiin", "Nahariya", "Beit Shemesh", "Nazareth", "Tiberias", "Eilat", "Acre", "Lod", "Ra'anana", "Hadera", "Kiryat Gat", "Betar Illit", "Hod HaSharon", "Rosh HaAyin", "Qiryat Ata"];

async function insertUsers() {
    // Sample users with different values
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
  
  const userIds = [
    "6683f5867164dd96c9b79c99",
    "6683f5867164dd96c9b79c9d",
    "6683f5867164dd96c9b79c9f",
    "6683f5877164dd96c9b79ca1"
  ];
  
  function getRandomOption(options) {
    return options[Math.floor(Math.random() * options.length)];
  }
  
  function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
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
  
  // Run the insertClothes function
  //insertClothes();

module.exports = {insertUsers, insertClothes}
