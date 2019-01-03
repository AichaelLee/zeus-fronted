<template>
  <div style="margin-top: 10px;padding-left:10px;">
        <menu-role></menu-role>
  </div>
</template>
<script>
  import MenuRole from './basic/MenuRole.vue'
  import JobTitleMana from './basic/JobTitleMana.vue'
  export default {
    data() {
      return {
        defaultTab: 'MenuRole'
      };
    },
    methods: {},
    components: {
      'menu-role': MenuRole,
    }
  };
</script>
