<template>
    <div>
        <DoctorManagement :active="3" />
    </div>
</template>
<script>
import DoctorManagement from "../../containers/DoctorPharmacist/DoctorManagement.vue";
export default {
    components: {
        DoctorManagement,
    },
};
</script>
