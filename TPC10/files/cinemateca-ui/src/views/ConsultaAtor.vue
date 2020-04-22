<template>
    <ConsultaAtor :idAtor="$route.params.idAtor" />
</template>

<script>
import ConsultaAtor from "../components/ConsultaAtor.vue";

export default {
    name: "Consulta Ator",
    components: {
        ConsultaAtor,
    },
};
</script>
