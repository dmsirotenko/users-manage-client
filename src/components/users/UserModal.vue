<template>
    <modal class-name="user-modal" v-if="shown" @modal-close="close">
        <h3 slot="header">Пользователь</h3>
        <form slot="body">
            <div class="form-group">
                <label for="user-name" class="label">Имя</label>
                <input type="text" class="input" id="user-name" v-model="user.name">
            </div>
            <div class="form-group">
                <label for="user-age" class="label">Возраст</label>
                <input type="number" step="1" min="0" class="input" id="user-age" v-model="user.age">
            </div>
        </form>
        <div class="modal-buttons" slot="footer">
            <div class="button-row">
                <button class="button button--outline" @click="close">Отмена</button>
                <button class="button button--primary" @click="handleSubmit">Сохранить</button>
            </div>
        </div>
    </modal>
</template>

<script>
  import Modal from '../common/Modal.vue';
  import Users from "../../api/users";

  function initialData() {
    return {
      shown: false,
      user: {
        id: null,
        name: '',
        age: null
      }
    };
  }

  export default {
    data() {
      return initialData();
    },
    methods: {
      show(user) {
        if (user) {
          let {
            id,
            name,
            age
          } = user;

          this.$set(this.$data, 'user', { id, name, age });
        }

        this.shown = true;
      },
      handleSubmit() {
        let {
          id,
          name,
          age
        } = this.user;

        let data = { name, age };

        let request = (!id) ?
          this.createUser(data) :
          this.updateUser(id, data);

        request.then(() => this.close());
      },
      createUser(user) {
        return Users.create(user)
          .then(response => {
            let {
              data: user
            } = response;

            return this.$store.dispatch('addUsers', [user]);
          });
      },
      updateUser(id, user) {
        return Users.update(id, user)
          .then(response => {
            let {
              data: user
            } = response;

            let existing = this.$store.getters.getUserById(id);

            Object.assign(existing, user);
          });
      },
      close() {
        Object.assign(this.$data, initialData());
      }
    },
    components: {
      Modal
    }
  }
</script>
