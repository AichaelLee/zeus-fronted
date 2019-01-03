<template>
  <div style="margin-top: 10px">
    <el-tabs v-model="defaultTab" type="card">
      <el-tab-pane label="教师管理" name="jobTitleMana">
        <!-- <pos-mana state="jobtitle"></pos-mana> -->
      </el-tab-pane>
      <el-tab-pane label="权限组" name="menuRole">
        <menu-role></menu-role>
      </el-tab-pane>
    </el-tabs>
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
      'jobtitle-mana': JobTitleMana
    }
  };
</script>
