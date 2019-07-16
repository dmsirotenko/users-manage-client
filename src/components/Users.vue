<template>
    <div class="wrapper">
        <header class="header">
            <h1 class="header__title">Пользователи</h1>
            <div class="header__actions">
                <div class="button-row">
                    <button class="button button--outline" @click="handleFilters">Фильтры</button>
                    <button class="button button--primary" @click="handleCreateUser">Добавить</button>
                </div>
            </div>
        </header>

        <main class="main">
            <div class="filters" v-if="filters.shown">
                <div class="container">
                    <div class="filters__list" @input="handleFiltersChange">
                        <div class="filters__item">
                            <div class="form-group">
                                <label for="filter-id" class="label">Id</label>
                                <input type="number" step="1" min="1" class="input" id="filter-id" v-model="filtersParams.id">
                            </div>
                        </div>
                        <div class="filters__item">
                            <div class="form-group">
                                <label for="filter-name" class="label">Имя</label>
                                <input type="text" class="input" id="filter-name" v-model="filtersParams.name">
                            </div>
                        </div>
                        <div class="filters__item">
                            <div class="form-group">
                                <label for="filter-age" class="label">Возраст</label>
                                <input type="number" step="1" min="0" class="input" id="filter-age" v-model="filtersParams.age">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="users">
                <div class="container">
                    <sortable-table class-name="users-table"
                                    :columns="table.columns" :actions="table.actions"
                                    :data="usersTableData" :sort-disabled="!!filters.results" @sort="handleTableSort"
                                    @row-edit="handleEditUser" @row-delete="handleDeleteUser"></sortable-table>
                </div>
            </div>
        </main>

        <user-modal ref="userModal"></user-modal>

        <drag-drop-overflow @files-drop="handleFilesDrop"></drag-drop-overflow>
    </div>
</template>

<script>
  import SortableTable from './common/SortableTable.vue';
  import DragDropOverflow from './common/DragDropOverflow.vue';
  import UserModal from './users/UserModal.vue';

  import Users from '../api/users';

  import { typeValid } from '../config/import';

  function filtersParamsInitialData() {
    return {
      id: null,
      name: '',
      age: null
    };
  }

  export default {
    mounted() {
      this.loadUsers();
    },
    data() {
      return {
        table: {
          columns: {
            id: 'Id',
            name: 'Имя',
            age: 'Возраст',
            actions: 'Действия'
          },
          actions: {
            edit: 'Изменить',
            delete: 'Удалить'
          }
        },
        filters: {
          shown: false,
          params: filtersParamsInitialData(),
          results: null,
          pendingRequest: null
        }
      }
    },
    watch: {
      filtersParams() {
        this.handleFiltersChange();
      }
    },
    computed: {
      users() {
        return this.$store.state.users;
      },
      usersTableData() {
        let {
          results
        } = this.filters;

        if (Array.isArray(results)) {
          return results;
        }

        return this.users;
      },
      filtersParams() {
        return this.filters.params;
      }
    },
    methods: {
      loadUsers(sortParams) {
        Users.list(sortParams).then(response => {
          let {
            data: users
          } = response;

          if (!Array.isArray(users)) {
            return;
          }

          this.$store.commit('users', users);
        });
      },
      handleFilters() {
        let {
          shown
        } = this.filters;

        this.$set(this.filters, 'shown', !shown);
      },
      handleFiltersChange() {
        let {
          params,
          pendingRequest
        } = this.filters;

        clearTimeout(pendingRequest);

        let searchParams = Object.entries(params)
          .reduce((acc, [param, value]) => {
            if (!value) {
              return acc;
            }

            acc[param] = value;

            return acc;
          }, {});

        if (!Object.values(searchParams).length) {
          this.$set(this.filters, 'results', null);

          return;
        }

        this.filters.pendingRequest =
          setTimeout(() => this.searchUsers(searchParams), 500);
      },
      searchUsers(searchParams) {
        return Users.search(searchParams)
          .then(response => {
            let {
              data: results
            } = response;

            this.$set(this.filters, 'results', results);
          });
      },
      handleTableSort(sort) {
        let sortParams = Object.entries(sort)
          .reduce((acc, [key, direction]) => {
            if (!direction) {
              return acc;
            }

            acc[key] = (direction > 0) ? 'asc' : 'desc';

            return acc;
          }, {});

        this.loadUsers(sortParams);
      },
      handleCreateUser() {
        this.$refs.userModal.show();
      },
      handleEditUser(user) {
        this.$refs.userModal.show(user);
      },
      handleDeleteUser(user) {
        let {
          id,
          name
        } = user;

        if (!confirm(`Удалить ${name}?`)) {
          return;
        }

        Users.delete(id)
          .then(response => {
            this.$store.dispatch('deleteUser', id);

            let {
              results
            } = this.filters;

            if (results) {
              let index = results.findIndex(user => user.id === id);

              results.splice(index, 1);
            }
          });
      },
      handleFilesDrop(files) {
        let file = files[0];

        if (!typeValid(file)) {
          alert('Данный тип файла не поддерживается');

          return;
        }

        Users.import(files[0]).then(response => {
          let {
            data: users
          } = response;

          this.resetFilters();

          return this.$store.dispatch('addUsers', users);
        });
      },
      resetFilters() {
        this.$set(this.filters, 'params', filtersParamsInitialData());
      }
    },
    components: {
      SortableTable,
      UserModal,
      DragDropOverflow
    }
  }
</script>
