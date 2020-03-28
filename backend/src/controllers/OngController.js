const generateUniqueId = require("../utils/generateUniqueId");
const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const TBONGS001 = await connection("TBONGS001").select("*");
    return res.json(TBONGS001);
  },

  async create(req, res) {
    const { NAME, EMAIL, WHATSAPP, CITY, UF } = req.body;
    const CODONG = generateUniqueId();

    await connection("TBONGS001").insert({
      CODONG,
      NAME,
      EMAIL,
      WHATSAPP,
      CITY,
      UF
    });

    return res.json({ CODONG });
  }
};
