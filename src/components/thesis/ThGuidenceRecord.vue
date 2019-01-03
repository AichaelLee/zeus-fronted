<template>
  <div class="app-container">

    <div>
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <el-button  :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document" @click="handleDownload">导出文件</el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
       
      <el-table-column label="年龄" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>

       <el-table-column label="性别" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.gender }}</el-tag>
        </template>
      </el-table-column>

       <el-table-column label="院系" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.aca }}
        </template>
      </el-table-column>

       <el-table-column label="指导教师" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.tea }}
        </template>
      </el-table-column>

      <el-table-column label="课题" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.sub }}
        </template>
      </el-table-column>
      
  
     

        <el-table-column label="总成绩" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.sumScore }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="Readings" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="日期" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.timestamp}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'

// options components
import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'

export default {
  name: 'ExportExcel',
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
      list: [{ id: 1, name:'张三',aca:'计算机技术学院',tea:'王老师',sub:'论冯诺依曼计算机体系',age: '24', gender: '男', sumScore:'80' ,timestamp: '2016-05-04'},
        { id: 2,name:'李四',aca:'计算机技术学院',tea:'刘老师',sub:'TCP/IP协议的再论述', age: '24', gender: '女', sumScore:'90', timestamp: '2016-05-04' }],
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  created() {
    this.fetchData()
  },
  filters: {
  parseTimef: function (value) {
    return parseTime(value)
  }
},
  methods: {
    test(){
      alert("test!")
    },
    fetchData() {
      this.listLoading = true
      this.listLoading = false
     
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', '年龄', '性别', '总成绩','日期']
        const filterVal = ['id', 'age', 'gender','sumScore', 'timestamp']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>

