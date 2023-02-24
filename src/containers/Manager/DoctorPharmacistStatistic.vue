<template>
    <div class="doctorPharmacistStatistic">
        <div class="doctorPharmacistStatistic__title StatisticTitle">Tư vấn của bác sĩ/dược sĩ</div>
        <DoctorPharmacistTable/>
    </div>
</template>

<script>
    import DoctorPharmacistTable from "./DoctorPharmacistTable.vue";
    export default {
        components:{
            DoctorPharmacistTable,
        }
    }
</script>
<style>
</style>