const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection("TBCASE001").count("CODCASE", {
      as: "total"
    });

    const TBCASE001 = await connection("TBCASE001")
      .join("TBONGS001", "TBONGS001.CODONG", "=", "TBCASE001.CODONG")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "TBCASE001.*",
        "TBONGS001.NAME",
        "TBONGS001.EMAIL",
        "TBONGS001.WHATSAPP",
        "TBONGS001.CITY",
        "TBONGS001.UF"
      ])
      .orderBy("CODCASE");

    res.header("X-Total-Count", count.total);

    return res.json(TBCASE001);
  },

  async create(req, res) {
    const { TITLE, DESCRIPTION, VALUE } = req.body;
    const CODONG = req.headers.authorization;

    const [CODCASE] = await connection("TBCASE001")
      .insert({
        CODONG,
        TITLE,
        DESCRIPTION,
        VALUE
      })
      .returning("CODCASE");

    return res.json({ CODCASE });
  },

  async delete(req, res) {
    const { id: CODCASE } = req.params;
    const CODONG = req.headers.authorization;

    const incident = await connection("TBCASE001")
      .where("CODCASE", CODCASE)
      .select("CODONG")
      .first();

    if (incident.CODONG !== CODONG) {
      return res.status(401).json({ error: "Operation not permitted." });
    }

    await connection("TBCASE001")
      .where("CODCASE", CODCASE)
      .where("CODONG", CODONG)
      .delete();

    return res.status(204).send();
  }
};
