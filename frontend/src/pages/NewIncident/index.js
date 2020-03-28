import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/dev-logo.svg";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();
  const CODONG = localStorage.getItem("CODONG");

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      TITLE: title,
      DESCRIPTION: description,
      VALUE: value
    };

    try {
      await api.post("incidents", data, {
        headers: {
          authorization: CODONG
        }
      });
      history.push("/profile");
    } catch (err) {
      alert("Erro ao cadastrar um novo incidente.");
    }
  }

  return (
    <dir className="container new-incident-container">
      <div className="content">
        <section>
          <div className="logo">
            <img src={logoImg} alt="Logo" />
            <span>Dev-Demo</span>
          </div>
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva detalhadamente para encontrar um desenvolvedor para
            resolver isto.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do Caso"
            maxLength="50"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            maxLength="100"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor"
            maxLength="20"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </dir>
  );
}
