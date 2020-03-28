import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity, Linking } from "react-native";
import * as MailComposer from "expo-mail-composer";

import logoImg from "../../assets/dev-logo.png";
import globalstyles from "../globalstyles";
import styles from "./styles";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Olá, ${incident.NAME}. \nEstou entrando em contato pois gostaria de ajudar com o caso "${incident.TITLE}".\nComo devo proceder?\nGrato,`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `[Dev Demo] Ajude o caso ${incident.TITLE}`,
      recipients: [incident.EMAIL],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=55${incident.WHATSAPP}&text=${message}`
    );
  }

  return (
    <View style={globalstyles.container}>
      <View style={globalstyles.header}>
        <View style={globalstyles.header}>
          <Image source={logoImg} style={globalstyles.logo} />
          <View style={globalstyles.logoText}>
            <Text style={globalstyles.logoText}>Dev-Demo</Text>
          </View>
        </View>
        <TouchableOpacity onPress={navigateBack}>
          <Text style={styles.detailsButtonText}></Text>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>

      <View style={[globalstyles.incident, { marginTop: 32 }]}>
        <Text style={globalstyles.incidentProperty}>ONG:</Text>
        <Text style={globalstyles.incidentValue}>
          {incident.NAME} de {incident.CITY}/{incident.UF}
        </Text>

        <Text style={globalstyles.incidentProperty}>CASO:</Text>
        <Text style={[globalstyles.incidentValue, { marginBottom: 0 }]}>
          {incident.TITLE}
        </Text>
        <Text style={[globalstyles.incidentValue, { fontStyle: "italic" }]}>
          {incident.DESCRIPTION}
        </Text>

        <Text style={globalstyles.incidentProperty}>VALOR:</Text>
        <Text style={globalstyles.incidentValue}>
          {" "}
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(incident.VALUE)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.itemTitle}>Desenvolvedor!</Text>
        <Text style={styles.itemTitle}>Desenvolva este caso</Text>

        <Text style={styles.itemDescription}>Entre em contato: </Text>

        <View style={globalstyles.header}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
