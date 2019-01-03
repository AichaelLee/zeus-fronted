<template>
  <div style="display:inline-block;">
    <label class="radio-label">是否自动调整宽度: </label>
    <el-radio-group v-model="autoWidth">
      <el-radio :label="true" border>是</el-radio>
      <el-radio :label="false" border>否</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    autoWidth: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
