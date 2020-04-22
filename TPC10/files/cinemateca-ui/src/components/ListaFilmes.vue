<template>
    <v-card class="ma-2">
        <v-card-title class="indigo darken-4 white--text" dark
            >Cinemateca de PRC2020: Lista dos Filmes na BD
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
                :headers="hfilmes"
                :items="filmes"
                :footer-props="footer_props"
                :search="filtrar"
            >
                <template v-slot:no-data>
                    <v-alert :value="true" color="warning" icon="warning">
                        Ainda não foi possivel carregar os dados...
                    </v-alert>
                </template>
                <template v-slot:item.ops="{ item }">
                    <v-icon @click="mostraFilme(item)"> {{ verFilme }} </v-icon>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
import axios from "axios";
import { mdiMovieOpen } from "@mdi/js";
const lhost = require("@/config/global").lhost;

export default {
    name: "ListaFilmes",

    data: () => ({
        hfilmes: [
            {
                text: "Título",
                sortable: true,
                value: "titulo",
                class: "subtitle-1",
            },
            {
                text: "Data",
                sortable: true,
                value: "dataLancamento",
                class: "subtitle-1",
            },
            {
                text: "Língua",
                sortable: true,
                value: "lingua",
                class: "subtitle-1",
            },
            {
                text: "Duração",
                sortable: true,
                value: "duracao",
                filterable: false,
                class: "subtitle-1",
            },
            {
                text: "Popularidade",
                sortable: true,
                value: "popularidade",
                filterable: false,
                class: "subtitle-1",
            },
            { text: "Operações", value: "ops", class: "subtitle-1" },
        ],
        footer_props: {
            "items-per-page-text": "Mostrar",
            "items-per-page-options": [10, 20, 50, 100, -1],
            "items-per-page-all-text": "Todos",
        },
        filmes: [],
        filtrar: "",
        verFilme: mdiMovieOpen,
    }),

    created: async function() {
        try {
            let response = await axios.get(lhost + "/filmes");
            this.filmes = response.data;
        } catch (e) {
            return e;
        }
    },

    methods: {
        mostraFilme: function(item) {
            this.$router.push(`/filmes/${item.idFilme.split("_")[1]}`);
        },
    },
};
</script>
