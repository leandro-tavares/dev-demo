import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";

import logoImg from "../../assets/dev-logo.png";
import globalstyles from "../globalstyles";
import styles from "./styles";

import api from "../../services/api";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (parseInt(total) > 0 && parseInt(total) === parseInt(incidents.length)) {
      return;
    }

    setLoading(true);

    const response = await api.get("incidents", {
      params: { page }
    });
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={globalstyles.container}>
      <View style={globalstyles.header}>
        <View style={globalstyles.header}>
          <Image source={logoImg} style={globalstyles.logo} />
          <View style={globalstyles.logoText}>
            <Text style={globalstyles.logoText}>Dev-Demo</Text>
          </View>
        </View>
        <Text style={globalstyles.headerText}>
          Total de{" "}
          <Text style={globalstyles.headerTextBold}>{total} casos.</Text>.{"\n"}
          exibindo {incidents.length} casos.
        </Text>
      </View>

      <Text style={globalstyles.title}>Bem-vindo!</Text>
      <Text style={globalstyles.description}>
        Escolha um dos casos abaixo e clique para ver os detalhes e ajudar o
        mesmo.
      </Text>

      <FlatList
        style={globalstyles.incidentList}
        data={incidents}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        keyExtractor={incident => String(incident.CODCASE)}
        renderItem={({ item: incident }) => (
          <View style={globalstyles.incident}>
            <Text style={globalstyles.incidentProperty}>ONG:</Text>
            <Text style={globalstyles.incidentValue}>{incident.NAME}</Text>

            <Text style={globalstyles.incidentProperty}>
              CASO:{" "}
              <Text style={{ fontWeight: "normal" }}>({incident.CODCASE})</Text>
            </Text>
            <Text style={globalstyles.incidentValue}>{incident.TITLE}</Text>

            <Text style={globalstyles.incidentProperty}>VALOR:</Text>
            <Text style={globalstyles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.VALUE)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />

      {loading ? (
        <View
          style={[
            globalstyles.header,
            {
              marginTop: 30,
              marginBottom: 30,
              flexDirection: "row",
              justifyContent: "center",
              padding: 10
            }
          ]}
        >
          <ActivityIndicator size="small" color="#e02041" />
          <Text style={{ marginLeft: 10 }}>Carregando...</Text>
        </View>
      ) : null}
    </View>
  );
}
