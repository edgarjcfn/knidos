var configs = {};

configs.mongodb_url = process.env.MONGODB_DB_URL || "mongodb://localhost/knidos";

module.exports = configs;
