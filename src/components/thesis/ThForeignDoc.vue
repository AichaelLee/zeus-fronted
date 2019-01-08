<template>
  <div class="components-container" style="margin-top:20px">
    <div>
      <tinymce :height="500" v-model="content"/>
    </div>
    <div>{{content}}</div>
  </div>
</template>

<script>
import Tinymce from './Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content:
      `<h1 style="text-align: center;">测试多文本，目前此部分还未关联数据库!</h1><p style="text-align: center; font-size: 15px;"><ul>
        <li><a href="localhost:8080">我们的产品</a> 欢迎使用zeus后台管理系统</li><li>使用vue重构，体验更流畅</a>.</li>
      </ul>`
    }
  }
}
</script>

<style scoped>
.components-container {
  margin: 30px 50px;
  position: relative;
}
</style>

