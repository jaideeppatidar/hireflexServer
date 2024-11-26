module.exports = {
  port: process.env.PORT || 3030,
  dbUri:
    process.env.DB_URI ||
    "mongodb+srv://jaideeppatidar3421:RYNg619hYOWp5ZGJ@hirflex.egmpw.mongodb.net/?retryWrites=true&w=majority&appName=hirflex",
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
};
