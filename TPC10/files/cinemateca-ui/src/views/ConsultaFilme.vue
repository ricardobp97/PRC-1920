<template>
    <ConsultaFilme :idFilme="$route.params.idFilme" />
</template>

<script>
import ConsultaFilme from "../components/ConsultaFilme.vue";

export default {
    name: "Consulta Filme",
    components: {
        ConsultaFilme,
    },
};
</script>
