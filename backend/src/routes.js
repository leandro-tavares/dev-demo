const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const IndexController = require("./controllers/IndexController");
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.get("/", IndexController.index);

routes.post("/sessions", celebrate({
		[Segments.BODY]: Joi.object().keys({
			CODONG: Joi.string().required()
		})	
	}), SessionController.create);

routes.get("/ongs", OngController.index);

routes.post("/ongs", celebrate({
    [Segments.BODY]: Joi.object().keys({
      NAME: Joi.string().required(),
      EMAIL: Joi.string().required().email(),
			WHATSAPP: Joi.string().required().min(10).max(11),
			CITY: Joi.string().required(),
      UF: Joi.string().required().length(2)
    })
	}), OngController.create);

routes.get("/profile", celebrate({
		[Segments.HEADERS]: Joi.object({
			authorization: Joi.string().required()
		}).unknown()
	}), 
	ProfileController.index);

routes.get("/incidents", celebrate({
		[Segments.QUERY]: Joi.object().keys({
			page: Joi.number()
		})
	}),	IncidentController.index);

routes.post("/incidents", IncidentController.create);

routes.delete("/incidents/:id", celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.number().required()
		})
	}), IncidentController.delete);

module.exports = routes;