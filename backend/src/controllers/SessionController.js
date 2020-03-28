const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const { CODONG } = req.body;
    const ong = await connection("TBONGS001")
      .where("CODONG", CODONG)
      .select("NAME")
      .first();

    if (!ong) {
      return res.status(400).json({
        error: "No ONG found with this ID"
      });
    }

    return res.json(ong);
  }
};
