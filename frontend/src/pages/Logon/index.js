import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/dev-logo.svg";
import devsImg from "../../assets/devs.png";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { CODONG: id });

      localStorage.setItem("CODONG", id);
      localStorage.setItem("NAME", response.data.NAME);

      history.push("/profile");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  }

  return (
    <div className="container logon-container">
      <section className="form">
        <div className="logo">
          <img src={logoImg} alt="Logo" />
          <span>Dev-Demo</span>
        </div>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img
        src={devsImg}
        alt="Heroes"
        style={{ marginLeft: 50, maxHeight: "60%" }}
      />
    </div>
  );
}
