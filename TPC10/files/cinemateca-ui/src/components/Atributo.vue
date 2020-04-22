<template>
    <v-row>
        <v-col cols="2">
            <div class="info-label">{{ this.nome }}</div>
        </v-col>
        <v-col>
            <div class="info-content">
                {{ this.valor }}
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "Atributo",
    props: ["nome", "valor"],
};
</script>
