<template>
    <div class="wrapper">
        <header class="header">
            <h1 class="header__title">Пользователи</h1>
            <div class="header__actions">
                <div class="button-row">
                    <button class="button" @click="handleFilters">Фильтры</button>
                    <button class="button button--primary" @click="handleCreateUser">Добавить</button>
                </div>
            </div>
        </header>

        <main class="main">
            <div class="container">
                <div v-for="user in users">
                    {{ user.name }}
                    {{ user.age }}
                </div>
            </div>
        </main>

        <user-modal ref="userModal"></user-modal>
    </div>
</template>

<script>
  import UserModal from './users/UserModal.vue';

  import Users from '../api/users';

  export default {
    mounted() {
      this.loadUsers();
    },
    data() {
      return {}
    },
    computed: {
      users() {
        return this.$store.state.users;
      }
    },
    methods: {
      loadUsers() {
        Users.list().then(response => {
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
      handleCreateUser() {
        this.$refs.userModal.show();
      }
    },
    components: {
      UserModal
    }
  }
</script>
