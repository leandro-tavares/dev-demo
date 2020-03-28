import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/dev-logo.svg";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  const CODONG = localStorage.getItem("CODONG");
  const NAME = localStorage.getItem("NAME");

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          authorization: CODONG
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [CODONG]);

  async function handleDeleteIncident(id) {
    if (window.confirm(`Confirma a remoção do incidente ${id}?`)) {
      try {
        await api.delete(`incidents/${id}`, {
          headers: {
            authorization: CODONG
          }
        });
        setIncidents(incidents.filter(incident => incident.CODCASE !== id));
      } catch (err) {
        alert("Erro ao deletar o incidente.");
      }
    }
  }

  function handleLogout() {
    localStorage.removeItem("CODONG");
    localStorage.removeItem("NAME");
    history.push("/");
  }

  return (
    <div className="container profile-container">
      <header>
        <div className="logo">
          <img src={logoImg} alt="Logo" />
          <span>Dev-Demo</span>
        </div>
        <span>
          Bem-vindo, <strong>{NAME}</strong>
        </span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <div className="content">
        <h1>Casos cadastrados</h1>
        <ul>
          {incidents.map(incident => (
            <li key={incident.CODCASE}>
              <strong>CASO:</strong>
              <p>{incident.TITLE}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{incident.DESCRIPTION}</p>

              <strong>VALOR:</strong>
              <p>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(incident.VALUE)}
              </p>

              <button
                type="button"
                onClick={() => handleDeleteIncident(incident.CODCASE)}
              >
                <FiTrash2 size={18} color="#a8a8b3" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
