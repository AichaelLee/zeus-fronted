<style lang="scss">
.form-body {
      border: 1px solid #ebebeb;
      border-radius: 3px; 
      transition: .2s;
      padding-top:30px;
      padding-left:80px;

}
.form-body >.el-form {
    width: 360px;
}
.el-select {
  width:280px;
}
</style>

<template>
 <el-main>
  <el-row>
    <el-col :span="12">
      <div class="form-body">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="学位">
              <el-select v-model="form.academicDegree" placeholder="请选择学位">
                <el-option label="学士" value="branch"></el-option>
                <el-option label="硕士" value="gradu"></el-option>
                 <el-option label="博士" value="master"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="职称">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
             <el-form-item label="毕业学校">
              <el-input v-model="form.graduatedUniversity"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">修改</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
          </div>
    </el-col>
  </el-row>

 </el-main>
</template>
<script>
 export default {
  data() {
      return {
        form: {
          name: this.$store.state.userInfo.user.teacherName,
          academicDegree: this.$store.state.userInfo.user.academicDegree,
          title: this.$store.state.userInfo.user.title,
          graduatedUniversity: this.$store.state.userInfo.user.graduatedUniversity
        }
      }
    },
    // data() {
    //   return {
    //     user:this.$store.state.userInfo.user,
    //     form: {
    //       name: this.user.username,
    //       academicDegree: this.user.academicDegree,
    //       title: this.user.title,
    //       graduatedUniversity: this.user.graduatedUniversity
       
    //     }
    //   }
    // },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    mounted(){
      //this.user = this.$store.state.userInfo.user
     
    },
   
  }
</script>

