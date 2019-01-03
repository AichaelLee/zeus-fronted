<template>
  <div style="display:inline-block;">
 
    <label class="radio-label" style="padding-left:0;">导出文件名: </label>
    <el-input placeholder="excel-list" v-model="filename" style="width:340px;" prefix-icon="el-icon-document"/>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    filename: {
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
