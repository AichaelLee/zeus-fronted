<template>

  <div>
    <el-row>
      <el-col :span="3">
      
        <el-upload class='upload-demo' multiple  ref='upload' :action='updateurl' :on-success='handleSuccess' :auto-upload='true' :show-file-list='false'>
             <el-button type='primary' size="small">添加文件</el-button>
        </el-upload>
        <br>
      </el-col>
      <el-col :span="3">
        <!-- 下载数据库中所有的图片到本地 -->
        <el-button type="success" size="small" @click="downloadAll">下载文件</el-button>
      </el-col>
      <el-col :span="3">
        <!-- 下载数据库中所有的图片到压缩文件images.zip -->
        <el-button type="warning" size="small" @click="downloadRemote">下载文件压缩至file.zip</el-button>
      </el-col>
      <el-col :span="3">
        <!-- 删除数据库中所有的图片 -->
        <el-button type="danger" size="small" @click="deleteAll">删除文件</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in imgs" :key="item">
          <img :src="item">
        </el-carousel-item>
      </el-carousel>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  mounted() {
    // 页面首次加载的时候查询到文件
    //this.getImages()
  },
  data () {
    return {
      updateurl: '/updateurl',
      imgs: []
    }
  },
  methods: {
    handleSuccess: function () {
      this.getImages()
    },
    addAll: function () {
      axios
        .post('/addAll')
        .then(Response => {
          this.$alert(Response.data, '', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.getImages()
          })
        })
        .catch(() => {
          this.$alert('添加失败', '', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    downloadAll: function () {
      axios
        .get('/downloadAll')
        .then(Response => {
          this.$alert(Response.data, '', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.getImages()
          })
        })
        .catch(() => {
          this.$alert('下载失败', '', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    downloadRemote: function () {
      window.open('/downloadRemote')
    },
    deleteAll: function () {
      axios
        .delete('/deleteAll')
        .then(Response => {
          this.$alert(Response.data, '', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.getImages()
          })
        })
        .catch(() => {
          this.$alert('删除失败', '', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    // 查询图片的数量信息
    getImages: function () {
      axios
        .get('/getImage')
        .then(Response => {
          if (
            Response.data !== null &&
            Response.data !== undefined &&
            Response.data !== ''
          ) {
            this.imgs = Response.data
          }
        })
        .catch(() => {
          this.$alert('查询失败', '', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
