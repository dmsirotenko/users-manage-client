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
            <div class="users">
                <div class="container">
                    <sortable-table class-name="users-table" :columns="table.columns"
                                    :actions="table.actions" :data="users"
                                    @sort="handleTableSort"
                                    @row-edit="handleEditUser" @row-delete="handleDeleteUser"></sortable-table>
                </div>
            </div>
        </main>

        <user-modal ref="userModal"></user-modal>
    </div>
</template>

<script>
  import SortableTable from './common/SortableTable.vue';
  import UserModal from './users/UserModal.vue';

  import Users from '../api/users';

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
        }
      }
    },
    computed: {
      users() {
        return this.$store.state.users;
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
        console.log('delete', user);
      }
    },
    components: {
      SortableTable,
      UserModal
    }
  }
</script>
