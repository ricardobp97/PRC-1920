<template>
  <div>
    <v-alert type="warning" v-if="!filmeCarregado">
      A carregar informação...
    </v-alert>
    <v-card class="ma-4" v-else>
      <v-card-title class="indigo darken-4 white--text" dark>
        <span class="headline">Filme: {{ filme.titulo }} ({{ idFilme }})</span>
      </v-card-title>
      <v-card-text>
        <Atributo
          nome="Título Original"
          :valor="filme.tituloOriginal"
          v-if="filme.tituloOriginal && filme.tituloOriginal.length > 0"
        />
        <Atributo
          nome="Resumo"
          :valor="filme.resumo"
          v-if="filme.resumo && filme.resumo.length > 0"
        />
        <Atributo
          nome="Data de Lançamento"
          :valor="filme.dataLancamento"
          v-if="filme.dataLancamento && filme.dataLancamento.length > 0"
        />
        <Atributo
          nome="Língua Original"
          :valor="filme.linguaOriginal"
          v-if="filme.linguaOriginal && filme.linguaOriginal.length > 0"
        />
        <Atributo
          nome="Duração (minutos)"
          :valor="filme.duracao"
          v-if="filme.duracao && filme.duracao.length > 0"
        />
        <Atributo
          nome="Índice de Popularidade"
          :valor="filme.popularidade"
          v-if="filme.popularidade && filme.popularidade.length > 0"
        />
        <Lista
          :lista="filme.generos"
          nome="Géneros"
          v-if="filme.generos && filme.generos.length > 0"
        />
        <Lista
          :lista="filme.paises"
          nome="Países de Produção"
          v-if="filme.paises && filme.paises.length > 0"
        />
        <Lista
          :lista="filme.linguas"
          nome="Línguas"
          v-if="filme.linguas && filme.linguas.length > 0"
        />
        <br />
        <v-card
          v-if="filme.atores_personagens && filme.atores_personagens.length > 0"
        >
          <v-card-title class="info-label">
            Lista de Atores e Personagens
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="hatores"
              :items="filme.atores_personagens"
              :footer-props="footer_props"
            >
              <template v-slot:item.ops="{ item }">
                <v-icon @click="mostraAtor(item)">
                  {{ verAtor }}
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <br />
        <Lista
          :lista="filme.realizadores"
          nome="Realizadores"
          v-if="filme.realizadores && filme.realizadores.length > 0"
        />
        <Lista
          :lista="filme.produtores"
          nome="Produtores"
          v-if="filme.produtores && filme.produtores.length > 0"
        />
        <Lista
          :lista="filme.escritores"
          nome="Escritores"
          v-if="filme.escritores && filme.escritores.length > 0"
        />
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
import Lista from "./Lista.vue";
import Atributo from "./Atributo.vue";
import { mdiAccount } from "@mdi/js";
const lhost = require("@/config/global").lhost;

export default {
  name: "ConsultaFilme",

  components: {
    Lista,
    Atributo
  },

  props: ["idFilme"],

  data: () => ({
    filme: {},
    filmeCarregado: false,
    hatores: [
      {
        text: "Ator",
        sortable: true,
        value: "ator_nome",
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
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [5, 10, -1],
      "items-per-page-all-text": "Todos"
    },
    verAtor: mdiAccount
  }),

  created: async function() {
    try {
      let response = await axios.get(lhost + "/filmes/" + this.idFilme);
      this.filme = response.data;
      this.filme.atores_personagens.sort((a, b) =>
        a.ator_nome > b.ator_nome ? 1 : -1
      );
      this.filmeCarregado = true;
    } catch (e) {
      return e;
    }
  },

  methods: {
    mostraAtor: function(item) {
      this.$router.push(`/atores/${item.ator_id.split("_")[1]}`);
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
