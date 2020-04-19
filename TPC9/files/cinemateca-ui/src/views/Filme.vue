<template>
    <v-card class="ma-2">
        <v-card-title>{{ filme.titulo }}</v-card-title>
        <v-card-text>
            <div id="info">
                <ul>
                    <li>Título Original: {{ filme.tituloOriginal }}</li>
                    <li>Língua Original: {{ filme.linguaOriginal }}</li>
                    <li>Data Lançamento: {{ filme.dataLancamento }}</li>
                    <li>Popularidade: {{ filme.popularidade }}</li>
                    <li>Duração(min): {{ filme.duracao }}</li>
                    <li>Resumo: {{ filme.resumo }}</li>
                </ul>
            </div>
            <div id="generos">
                <v-data-table
                    :headers="hgeneros"
                    :items="generos"
                    :items-per-page="5"
                    class="elevation-1"
                >
                    <template v-slot:no-data>
                        <v-alert :value="true" color="warning" icon="warning">
                            Ainda não foi possivel carregar os dados do filme
                            {{ filme.titulo }}...
                        </v-alert>
                    </template>
                    <v-template v-slot:items="props">
                        <tr>
                            <td>{{ props.item }}</td>
                        </tr>
                    </v-template>
                </v-data-table>
            </div>
            <div id="atores">
                <v-data-table
                    :headers="hatores"
                    :items="atoresPersonagens"
                    :items-per-page="5"
                    class="elevation-1"
                >
                    <template v-slot:no-data>
                        <v-alert :value="true" color="warning" icon="warning">
                            Ainda não foi possivel carregar os dados do filme
                            {{ filme.titulo }}...
                        </v-alert>
                    </template>
                    <v-template v-slot:items="props">
                        <tr>
                            <td>{{ props.item.anome }}</td>
                        </tr>
                    </v-template>
                </v-data-table>
            </div>
            <div id="paises">
                <v-data-table
                    :headers="hpaises"
                    :items="paises"
                    :items-per-page="5"
                    class="elevation-1"
                >
                    <template v-slot:no-data>
                        <v-alert :value="true" color="warning" icon="warning">
                            Ainda não foi possivel carregar os dados do filme
                            {{ filme.titulo }}...
                        </v-alert>
                    </template>
                    <v-template v-slot:items="props">
                        <tr>
                            <td>{{ props.item.anome }}</td>
                        </tr>
                    </v-template>
                </v-data-table>
            </div>
            <div id="produtores">
                <v-data-table
                    :headers="hprodutores"
                    :items="produtores"
                    :items-per-page="5"
                    class="elevation-1"
                >
                    <template v-slot:no-data>
                        <v-alert :value="true" color="warning" icon="warning">
                            Ainda não foi possivel carregar os dados do filme
                            {{ filme.titulo }}...
                        </v-alert>
                    </template>
                    <v-template v-slot:items="props">
                        <tr>
                            <td>{{ props.item.anome }}</td>
                        </tr>
                    </v-template>
                </v-data-table>
            </div>
            <div id="realizadores">
                <v-data-table
                    :headers="hrealizadores"
                    :items="realizadores"
                    :items-per-page="5"
                    class="elevation-1"
                >
                    <template v-slot:no-data>
                        <v-alert :value="true" color="warning" icon="warning">
                            Ainda não foi possivel carregar os dados do filme
                            {{ filme.titulo }}...
                        </v-alert>
                    </template>
                    <v-template v-slot:items="props">
                        <tr>
                            <td>{{ props.item.anome }}</td>
                        </tr>
                    </v-template>
                </v-data-table>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
const lhost = require("@/config/global").lhost;
import axios from "axios";

export default {
    name: "Filme",
    props: ["idFilme"],
    data: () => ({
        filme: {},
        hgeneros: [
            {
                text: "Géneros",
                sortable: true,
                value: "genero",
                class: "subtitle-1",
            },
        ],
        generos: [],
        hatores: [
            {
                text: "Atores",
                sortable: true,
                value: "ator",
                class: "subtitle-1",
            },
            {
                text: "Personagens",
                sortable: true,
                value: "personagem",
                class: "subtitle-1",
            },
        ],
        atoresPersonagens: [],
        hpaises: [
            {
                text: "Países",
                sortable: true,
                value: "pais",
                class: "subtitle-1",
            },
        ],
        paises: [],
        hprodutores: [
            {
                text: "Produtores",
                sortable: true,
                value: "produtor",
                class: "subtitle-1",
            },
        ],
        produtores: [],
        hrealizadores: [
            {
                text: "Realizadores",
                sortable: true,
                value: "realizador",
                class: "subtitle-1",
            },
        ],
        realizadores: [],
    }),
    created: async function() {
        try {
            const response = await axios.get(`${lhost}/filmes/${this.idFilme}`);
            console.log(response.data);
            this.filme = response.data;
            this.generos = response.data.generos.map((g) => {
                return { genero: g.nome };
            });
            this.atoresPersonagens = response.data.atores_personagens.map(
                (i) => {
                    return { ator: i.ator_nome, personagem: i.personagem_nome };
                }
            );
            this.paises = response.data.paises.map((p) => {
                return { pais: p.nome };
            });
            this.produtores = response.data.produtores.map((p) => {
                return { produtor: p.nome };
            });
            this.realizadores = response.data.realizadores.map((r) => {
                return { realizador: r.nome };
            });
        } catch (error) {
            console.log(error);
        }
    },
};
</script>
