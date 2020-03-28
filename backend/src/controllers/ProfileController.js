const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const CODONG = req.headers.authorization;

    const TBCASE001 = await connection("TBCASE001")
      .where("CODONG", CODONG)
      .select("*");

    return res.json(TBCASE001);
  }
};
