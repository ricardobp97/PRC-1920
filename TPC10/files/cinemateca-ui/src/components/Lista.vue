<template>
    <v-row>
        <v-col cols="2">
            <div class="info-label">{{ this.nome }}</div>
        </v-col>
        <v-col>
            <div class="info-content">
                <ul>
                    <li v-for="item in lista" :key="item.id">
                        {{ item.nome }}
                    </li>
                </ul>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "Lista",
    props: ["lista", "nome"],
};
</script>
