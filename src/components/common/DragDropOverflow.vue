<template>
    <transition name="drag-drop" v-if="overflowShown">
        <div class="drag-drop-overflow" @dragleave="handleDragLeave" @drop="handleDrop">
            <div class="drag-drop-overflow__title" @dragleave="preventEvent">Перетащите файл для импорта</div>
        </div>
    </transition>
</template>

<script>
  import { disableScroll } from '../../helpers/document';

  const events = {
    prevent: [
      'drag',
      'dragstart',
      'dragend',
      'dragover',
      'dragenter',
      'dragleave',
      'drop'
    ],
    enter: [
      'dragover',
      'dragenter'
    ],
    leave: [
      'dragleave',
      'drop'
    ]
  };

  export default {
    created() {
      events.prevent
        .forEach(event => this.addEvent(event, this.preventEvent));

      events.enter
        .forEach(event => this.addEvent(event, this.handleDragEnter));
    },
    beforeDestroy() {
      events.prevent
        .forEach(event => this.removeEvent(event, this.preventEvent));

      events.enter
        .forEach(event => this.removeEvent(event, this.handleDragEnter));
    },
    watch: {
      overflowShown(shown) {
        disableScroll(shown);
      }
    },
    data() {
      return {
        overflowShown: false
      }
    },
    methods: {
      addEvent(event, handler) {
        document.addEventListener(event, handler);
      },
      removeEvent(event, handler) {
        document.removeEventListener(event, handler);
      },
      preventEvent(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      handleDragEnter(e) {
        this.showOverflow();
      },
      handleDragLeave(e) {
        this.hideOverflow();
      },
      handleDrop(e) {
        this.hideOverflow();

        this.$emit('files-drop', e.dataTransfer.files);
      },
      showOverflow() {
        this.overflowShown = true;
      },
      hideOverflow() {
        this.overflowShown = false;
      }
    }
  }
</script>
