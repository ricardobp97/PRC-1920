<template>
    <v-card class="ma-2">
        <v-card-title>Lista dos Filmes na BD</v-card-title>
        <v-card-text>
            <v-data-table
                :headers="hfilmes"
                :items="filmes"
                :items-per-page="15"
                class="elevation-1"
                @click:row="rowClicked"
            >
                <template v-slot:no-data>
                    <v-alert :value="true" color="warning" icon="warning">
                        Ainda não foi possivel carregar os dados...
                    </v-alert>
                </template>
                <v-template v-slot:items="props">
                    <tr @click="rowClicked(props.item)">
                        <td>{{ props.item.titulo }}</td>
                        <td>{{ props.item.dataLancamento }}</td>
                        <td>{{ props.item.linguaOriginal }}</td>
                        <td>{{ props.item.duracao }}</td>
                        <td>{{ props.item.popularidade }}</td>
                    </tr>
                </v-template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
import axios from "axios";
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
                class: "subtitle-1",
            },
            {
                text: "Popularidade",
                sortable: true,
                value: "popularidade",
                class: "subtitle-1",
            },
        ],
        filmes: [],
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
        rowClicked(filme) {
            const id = filme.idFilme.split("_")[1];
            console.log(id);
            this.$router.push({
                name: "Filme",
                params: { idFilme: id },
            });
        },
    },
};
</script>
