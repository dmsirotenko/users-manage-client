<template>
    <transition name="modal">
        <section class="modal" :class="className" @click.self="$emit('modal-close')">
            <div class="modal-dialog">
                <div class="modal-dialog__header" v-if="hasHeader">
                    <slot name="header"></slot>
                </div>
                <div class="modal-dialog__body" v-if="hasBody">
                    <slot name="body"></slot>
                </div>
                <div class="modal-dialog__footer" v-if="hasFooter">
                    <slot name="footer"></slot>
                </div>
            </div>
        </section>
    </transition>
</template>

<script>
  import { disableScroll } from '../../helpers/document';

  export default {
    props: {
      className: {
        type: String
      }
    },
    mounted() {
      disableScroll(true);
    },
    destroyed() {
      disableScroll(false);
    },
    computed: {
      hasHeader() {
        return this.$slots.header;
      },
      hasBody() {
        return this.$slots.body;
      },
      hasFooter() {
        return this.$slots.footer;
      }
    }
  }
</script>
