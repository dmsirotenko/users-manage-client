<template>
    <span class="sort-icon">
        <font-awesome-icon :icon="icon"></font-awesome-icon>
    </span>
</template>

<script>
  import {
    faSort,
    faSortUp,
    faSortDown
  } from '@fortawesome/free-solid-svg-icons';

  export default {
    props: {
      direction: {
        type: Number
      }
    },
    computed: {
      icon() {
        if (!this.direction) {
          return faSort;
        }

        return (this.direction > 0) ? faSortUp : faSortDown;
      }
    }
  }
</script>
