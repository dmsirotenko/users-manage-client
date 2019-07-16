<template>
    <table class="table table--sortable" :class="className">
        <thead>
            <tr>
                <th v-for="(column, key, index) in columns"
                    v-if="key !== 'actions'" :id="key" @click="handleColumnSort(key)">
                    {{ column }}
                    <sort-icon :direction="getColumnSort(key)"></sort-icon>
                </th>
                <th v-if="actions">{{ actionsName }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="entry in data">
                <td v-for="key in dataKeys" :headers="key" v-if="entry[key]">
                    {{ entry[key] }}
                </td>
                <td v-else-if="actions && key === 'actions'">
                    <div class="button-row">
                        <button class="button"
                                v-for="(action, key, index) in actions"
                                @click="handleActionClick(key, entry)">
                            {{ action }}
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
  import SortIcon from './SortIcon.vue';

  export default {
    props: {
      className: {
        type: String,
        required: false
      },
      columns: {
        type: Object,
        required: true
      },
      actions: {
        type: Object,
        required: false
      },
      data: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        sort: {}
      }
    },
    computed: {
      dataKeys() {
        return Object.keys(this.columns);
      },
      actionsName() {
        return this.columns.actions || '';
      }
    },
    methods: {
      handleActionClick(action, entry) {
        this.$emit(`row-${action}`, entry);
      },
      handleColumnSort(key) {
        let curr = this.sort[key];

        if (curr < 0) {
          this.$delete(this.sort, key);
        } else {
          this.$set(this.sort, key, (!curr) ? 1 : -1);
        }

        this.$emit('sort', this.sort);
      },
      getColumnSort(key) {
        return this.sort[key];
      }
    },
    components: {
      SortIcon
    }
  }
</script>
