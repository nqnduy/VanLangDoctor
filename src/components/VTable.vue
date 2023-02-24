<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="col in columns" :key="col">
                        <a>
                            {{ col.columnName }}
                            <i
                                class="fas fa-sort-down"
                                v-if="
                                    colValue === sortState.columnValue &&
                                    sortState.orderBy === 'Decsending'
                                "
                            ></i>
                            <i class="fas fa-sort-up" v-else></i>
                        </a>
                    </th>
                </tr>
            </thead>
            <tbody>
                {{
                    this.$children
                }}
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        columns: {
            type: [],
            required: true,
        },
        children: {
            type: Object,
            required: false,
        },
        page: {
            type: Object,
            required: true,
        },
        sortState: {
            type: Object,
            required: true,
        },
        handleSort: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            columns: this.props.columns,
            sortState: this.props.sortState,
        };
    },
};
</script>

<style scoped>
@import "https://use.fontawesome.com/releases/v5.15.4/css/all.css";
</style>
