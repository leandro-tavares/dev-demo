import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/dev-logo.svg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsApp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      NAME: name,
      EMAIL: email,
      WHATSAPP: whatsapp,
      CITY: city,
      UF: uf
    };

    try {
      const response = await api.post("ongs", data);
      alert(`Seu ID de acesso é: ${response.data.CODONG}`);
      history.push("/");
    } catch (err) {
      alert("Erro no cadastro, tente novamente");
      console.log(err);
    }
  }

  return (
    <dir className="container register-container">
      <div className="content">
        <section>
          <div className="logo">
            <img src={logoImg} alt="Logo" />
            <span>Dev-Demo</span>
          </div>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude desenvolvedores</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Principal
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            maxLength="50"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            maxLength="100"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp"
            maxLength="20"
            value={whatsapp}
            onChange={e => setWhatsApp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              maxLength="50"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              maxLength="2"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </dir>
  );
}
