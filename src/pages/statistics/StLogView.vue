<style lang="scss">
  #accountkankurin {
    .el-date-editor--daterange {
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
    }
    .el-form-item__label {
      height: 20px !important;
      font-size: 12px;
      line-height: 22px;
      color: black;
    }
    .qulankuang {
      outline: none;
    } // .el-table_1_column_5 .caret-wrapper {
    //   margin-top: 6px;
    // }
    .el-table__body-wrapper .el-table__row .cell {
      white-space: nowrap;
    }
    .el-pagination .el-pagination__sizes .el-select .el-input--suffix {
      width: 110px;
    }
    .el-table__header .has-gutter {
      th {
        padding-top: 0;
        padding-bottom: 0;
      }
      .cell {
        background-color: #c73625;
        color: white;
        height: 34px;
      }
    }
    .el-table__header .has-gutter {
      .is-center {
        .cell {
          padding-top: 4px;
        }
      }
    }
    @media screen and (min-width: 1460px) {
      .juzhong {
        width: 1160px
      }
    }
  }
</style>

<template>
  <el-main id="accountkankurin" style="padding-top:5px;">
    <el-form :model="userForm" :rules="rules" ref="userForm" size="mini">
      <el-row style="padding-left:10px;padding-right:10px">
        <!-- 0001 -->
        <el-row>
          <el-col :md="24"  style="padding-top:15px">
            <el-row type="flex" justify="center" class="juzhong">
              <el-col :lg="5" class="text-center" style="text-align:center">
                <span style="font-size:16px"><i class="el-icon-edit"></i> 查看操作日志</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 0002 -->
        <el-row :gutter="20" style="padding-top:20px">
          <el-col :lg="2" :md="4" :sm="6" :xs="12" style="min-width:175px">
            <el-form-item label="日志类型" content="请选择日志类型">
              <el-select v-model="userForm.logType" placeholder="" clearable size="mini" style="width:100%" class="form-control-own-border qulankuang">
                <el-option v-for="(item,index) in accesspermission" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="2" :md="4" :sm="6" :xs="12" style="min-width:200px">
            <el-form-item label="操作人" content="请输入操作人姓名。">
              <el-input v-model='userForm.name' size="mini" style="width:100%;" class="form-control-own-border" clearable ></el-input>
            </el-form-item>
          </el-col>
         
          <el-col :lg="5" :md="8" :sm="12" :xs="24" style="min-width:320px">
            <el-form-item label="操作时间" content="请选择操作时间">
              <el-date-picker v-model="userForm.daytime" type="daterange" style="width:100%;" size="mini" :picker-options="pickerOptions2" align="right">
              </el-date-picker>
            </el-form-item>
          </el-col>
           <!-- <el-col :lg="5" :md="8" :sm="12" :xs="24" style="min-width:320px">
            <el-button type="info" plain @click="reset" size="small"><i class="fa fa-refresh "></i> 重置</el-button>
          </el-col> -->
        </el-row>

      </el-row>
    </el-form>
    <!-- 0001 -->
    <el-row style="padding-top:10px;">
      <el-col :lg="18">
        <el-table :fit="true" :border="true" v-loading="tableload" element-loading-text="数据载入中" element-loading-background="rgba(255, 255, 255, 0.6)" :data="tableDataView" style="width:942px" size="mini" :default-sort="{prop: 'date', order: 'descending'} ">
          <el-table-column label="#" width="60" align="center">
            <template slot-scope="scope">
              <span>{{(scope.$index+1)+(pagenum-1)*pageSize}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="operator" label="操作人 " sortable width="120" align="center">
          </el-table-column>
          <el-table-column prop="logType" label="操作类型" sortable width="240" align="center">
          </el-table-column>
          <el-table-column prop="operatorRole"  label="操作人角色角色 " sortable  width="160" align="center" >
          </el-table-column>
          <el-table-column prop="logContent" label=" 操作内容 " sortable width="160" align="center">
          </el-table-column>
          <el-table-column label="操作时间" width="200" prop="operationTime" align="center" :formatter="formatTime">
          </el-table-column>
        </el-table>
      </el-col>
       </el-row>
       <el-row  style="padding-top:20px;">
      <el-col :lg="14">
        <el-pagination background  @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[5,10,15,20,25]"
          :page-size="pageSize"
          :layout="pagelayout"
          :total="tableSize">
        </el-pagination>
        <!-- <el-pagination background @current-change="handleCurrentChange" :current-page.sync="pagenum" :page-size="pageSize" layout="prev, pager, next" :total="tableSize">
        </el-pagination> -->
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
  import _ from 'lodash'
  import moment from 'moment'
  export default {
    name: 'StLogView',
  
    mounted() {
      this.SearchAllLogs()
    },
    watch: {
      'userForm.logType' () {
        this.seachUser()
      },
      'userForm.name' () {
        this.seachUser()
      },
      'userForm.daytime': {
        handler(val) {
          this.seachUser()
        },
        deep: true
      }
    },
    computed: {
      // 页数小于2的时候去掉jumper
      pagelayout: function() {
        let sumpagenum = (this.tableSize / this.pageSize) + 1
        if ((this.tableSize % this.pageSize) === 0) {
          sumpagenum = (this.tableSize / this.pageSize)
        }
        if (sumpagenum < 2) {
          return 'total, sizes, prev, pager, next'
        } else {
          return 'total, sizes, prev, pager, next, jumper'
        }
      },
      // 数据的大小
      tableSize: function() {
        return this.tableData.length
      },
      // 分页的筛选
      tableDataView: function() {
        return this.tableData.slice((this.pagenum - 1) * this.pageSize, this.pagenum * this.pageSize)
      }
    },
    methods: {

      SearchAllLogs(){
        this.getRequest("/system/basic/logs").then(resp =>{
          this.tableData = resp.data.data
          
        })
      },
      // 改变每页条数
      handleSizeChange(val) {
        this.pageSize = val
      },
            // 计算开始数和结束的数
      handleCurrentChange(val) {
        this.pagenum = val
      },
      reset() {
        this.$refs['userForm'].resetFields()
      },
      formatTime(row, column, cellValue) {
        if (cellValue) {
          return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
        } else {
          return '没有数据'
        }
      },
 
      // 延迟检索
      seachUser: _.debounce(
        function() {
          this.seach()
        },
        // 这是我们为判定用户停止输入等待的毫秒数
        500
      ),
      // 检索
      seach() {
        this.tableload = true
        let actions = this.editdata()
        this.testHis("/system/basic/logs",actions).then(resp =>{
          this.tableData = resp.data.data
          this.pagenum = 1
           this.tableload = false
          
        })
        // seachUsers(actions).then(response => {
        //   if (response.status === 200) {
        //     this.tableData = response.data.datalist
        //     this.pagenum = 1
        //   }
        //   this.tableload = false
        // }).catch(err => {
        //   this.tableload = false
        //   this.$message.error('日志检索失败')
        //   console.log(err)
        // })
      },
      // 发送前的数据编辑
      editdata() {
        let actions = {}
        actions.logType = this.userForm.logType
        actions.operator = this.userForm.name
        if (this.userForm.daytime && (this.userForm.daytime.length > 1)) {
          actions.startTime = moment(this.userForm.daytime[0]).format('YYYY-MM-DD 00:00:00')
          actions.endTime = moment(this.userForm.daytime[1]).format('YYYY-MM-DD 23:59:59')
        }
        return actions
      }
    },
    data() {
      return {
        // 更新数据传给子组建的
        toChlidbtn: true,
        // 当前第几页
        pagenum: 1,
        // 每页条数
        pageSize: 15,
        // 是否打开子页面
        dialogTableVisible: false,
        // 返回的table数据
        tableData: [],
        // 是否打开tableload
        tableload: false,
        userForm: {
          logType: '',
          name: '',
          daytime: []
        },
        pickerOptions2: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24)
              end.setTime(end.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近30天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '本月',
            onClick(picker) {
              const month = moment().month()
              const daysInMonth = moment().daysInMonth()
              const end = moment().month(month).date(daysInMonth)
              const start = moment().month(month).date(1)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '上一个月',
            onClick(picker) {
              const month = moment().month()
              const exmonthfstday = moment().month(month - 1).date(1).subtract(0, 'days')
              const exmonthlastday = moment().month(month).date(1).subtract(1, 'days')
              picker.$emit('pick', [exmonthfstday, exmonthlastday])
            }
          }]
        },
        accesspermission: [{
          value: '流程操作',
          label: '流程操作'
        }, {
          value: '审计操作',
          label: '审计操作'
        },
        {
          value: '登录操作',
          label: '登录操作'
        }, {
          value: '系统开通',
          label: '系统开通'
        }],
        rules: {
          //访问权限
          logType: [{
            pattern: /.*/,
            trigger: 'blur,change'
          }],
          // 名
          name: [{
            trigger: 'blur,change'
          }],
          daytime: [{
            pattern: /.*/,
            trigger: 'blur,change'
          }]
        }
      }
    }
  }
</script>

