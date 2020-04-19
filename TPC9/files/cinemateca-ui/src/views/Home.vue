<template>
    <v-app>
        <v-content>
            <div class="home">
                <ListaFilmes />
            </div>
        </v-content>
    </v-app>
</template>

<script>
import ListaFilmes from "../components/ListaFilmes.vue";
export default {
    name: "Home",
    components: {
        ListaFilmes,
    },
};
</script>
