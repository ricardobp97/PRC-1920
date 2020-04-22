<template>
  <v-card class="ma-2">
    <v-card-title class="indigo darken-4 white--text" dark
      >Lista de Atores na BD
      <v-spacer />
      <v-text-field
        v-model="filtrar"
        label="Filtrar"
        single-line
        hide-details
        dark
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="hatores"
        :items="atores"
        :footer-props="footer_props"
        :search="filtrar"
      >
        <template v-slot:no-data>
          <v-alert :value="true" color="warning" icon="warning">
            Ainda não foi possivel carregar os dados...
          </v-alert>
        </template>
        <template v-slot:item.ops="{ item }">
          <v-icon @click="mostraAtor(item)"> {{ verAtor }} </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import { mdiAccount } from "@mdi/js";
const lhost = require("@/config/global").lhost;

export default {
  name: "ListaFilmes",

  data: () => ({
    hatores: [
      {
        text: "Nome",
        sortable: true,
        value: "nome",
        class: "subtitle-1"
      },
      {
        text: "Sexo",
        sortable: true,
        value: "sexo",
        filterable: false,
        class: "subtitle-1"
      },
      {
        text: "Número de Filmes",
        sortable: true,
        value: "numFilmes",
        filterable: false,
        class: "subtitle-1"
      },
      { text: "Operações", value: "ops", class: "subtitle-1" }
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [10, 20, 50, 100, -1],
      "items-per-page-all-text": "Todos"
    },
    atores: [],
    filtrar: "",
    verAtor: mdiAccount
  }),

  created: async function() {
    try {
      let response = await axios.get(lhost + "/atores");
      this.atores = response.data;
    } catch (e) {
      return e;
    }
  },

  methods: {
    mostraAtor: function(item) {
      this.$router.push(`/atores/${item.id.split("_")[1]}`);
    }
  }
};
</script>
