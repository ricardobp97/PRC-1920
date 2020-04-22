<template>
  <div>
    <v-alert type="warning" v-if="!atorCarregado">
      A carregar informação...
    </v-alert>
    <v-card class="ma-4" v-else>
      <v-card-title class="indigo darken-4 white--text" dark>
        <span class="headline"
          >Pessoa: {{ ator.nome }} ({{ this.idAtor }})</span
        >
      </v-card-title>
      <v-card-text>
        <Atributo
          nome="Sexo"
          :valor="ator.sexo"
          v-if="ator.sexo && ator.sexo.length > 0"
        />
        <br />
        <v-card>
          <v-card-title class="info-label">
            Lista de Filmes em que Atuou
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="hfilmes"
              :items="ator.atuados"
              :footer-props="footer_props"
            >
              <template v-slot:item.ops="{ item }">
                <v-icon @click="mostraFilme(item)">
                  {{ verFilme }}
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <br />
        <v-card v-if="ator.realizados && ator.realizados.length > 0">
          <v-card-title class="info-label">
            Lista de Filmes que Realizou
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="hOutrosFilmes"
              :items="ator.realizados"
              :footer-props="footer_props"
            >
              <template v-slot:item.ops="{ item }">
                <v-icon @click="mostraFilme(item)">
                  {{ verFilme }}
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <br />
        <v-card v-if="ator.produzidos && ator.produzidos.length > 0">
          <v-card-title class="info-label">
            Lista de Filmes que Produziu
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="hOutrosFilmes"
              :items="ator.produzidos"
              :footer-props="footer_props"
            >
              <template v-slot:item.ops="{ item }">
                <v-icon @click="mostraFilme(item)">
                  {{ verFilme }}
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <br />
        <v-card v-if="ator.escritos && ator.escritos.length > 0">
          <v-card-title class="info-label">
            Lista de Filmes que Escreveu
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="hOutrosFilmes"
              :items="ator.escritos"
              :footer-props="footer_props"
            >
              <template v-slot:item.ops="{ item }">
                <v-icon @click="mostraFilme(item)">
                  {{ verFilme }}
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="$router.go(-1)">Voltar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import Atributo from "./Atributo";
import { mdiMovieOpen } from "@mdi/js";
const lhost = require("@/config/global").lhost;

export default {
  name: "ConsultaAtor",

  components: {
    Atributo
  },

  props: ["idAtor"],

  data: () => ({
    ator: {},
    atorCarregado: false,
    hfilmes: [
      {
        text: "Filme",
        sortable: true,
        value: "filme_nome",
        class: "subtitle-1"
      },
      {
        text: "Popularidade",
        sortable: true,
        value: "filme_popularidade",
        class: "subtitle-1"
      },
      {
        text: "Data de Lançamento",
        sortable: true,
        value: "filme_dataLancamento",
        class: "subtitle-1"
      },
      {
        text: "Personagem",
        sortable: true,
        value: "personagem_nome",
        class: "subtitle-1"
      },
      { text: "Operações", value: "ops", class: "subtitle-1" }
    ],
    hOutrosFilmes: [
      {
        text: "Filme",
        sortable: true,
        value: "nome",
        class: "subtitle-1"
      },
      {
        text: "Popularidade",
        sortable: true,
        value: "popularidade",
        class: "subtitle-1"
      },
      {
        text: "Data de Lançamento",
        sortable: true,
        value: "dataLancamento",
        class: "subtitle-1"
      },
      { text: "Operações", value: "ops", class: "subtitle-1" }
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [5, 10, -1],
      "items-per-page-all-text": "Todos"
    },
    verFilme: mdiMovieOpen
  }),

  created: async function() {
    try {
      let response = await axios.get(lhost + "/pessoas/" + this.idAtor);
      this.ator = response.data;
      this.atorCarregado = true;
    } catch (e) {
      return e;
    }
  },

  methods: {
    mostraFilme: function(item) {
      this.$router.push(`/filmes/${item.filme_id.split("_")[1]}`);
    }
  }
};
</script>

<style>
.info-label {
  color: indigo;
  padding: 5px;
  font-weight: 400;
  width: 100%;
  background-color: #e0f2f1;
  font-weight: bold;
}

.info-content {
  padding: 5px;
  width: 100%;
  border: 1px solid #1a237e;
}
</style>
