<style lang="scss">
  #accountkankurin {
    .el-date-editor--daterange {
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
    }
    .el-select{
      width: 100%;
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
          <el-col :md="24" style="padding-top:15px">
            <el-row type="flex" justify="center" class="juzhong">
              <el-col :lg="5" class="text-center" style="text-align:center">
                <span style="font-size:16px"><i class="fa fa-key"></i> 账户一览</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 0002 -->
        <el-row :gutter="20" style="padding-top:20px">
          <el-col :lg="2" :md="4" :sm="6" :xs="12" style="min-width:175px">
            <el-form-item label="访问权限" content="选择用户角色">
              <el-select v-model="userForm.adminType" placeholder="" clearable size="mini" style="width:100%" class="form-control-own-border qulankuang">
                <el-option v-for="(item,index) in accesspermission" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="2" :md="4" :sm="6" :xs="12" style="min-width:200px">
            <el-form-item label="姓名" content="输入姓名。">
              <el-input v-model='userForm.name' size="mini" style="width:100%;" class="form-control-own-border"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="3" :md="6" :sm="9" :xs="12" style="min-width:200px">
            <el-form-item label="邮箱" content="请设定邮箱">
              <el-input v-model='userForm.email' size="mini" style="width:100%;ime-mode:inactive;" class="form-control-own-border"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="3" :md="6" :sm="9" :xs="12" style="min-width:175px">
            <el-form-item label="登录状态"  content="登录状态选择">
              <el-select v-model="userForm.loginStatus" clearable placeholder="" size="mini" style="width:100%" class="form-control-own-border">
                <el-option v-for="(item,index) in loginStatus" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="5" :md="8" :sm="12" :xs="24" style="min-width:320px">
            <el-form-item label="最后登陆时间" content="选择最后登陆时间">
              <el-date-picker v-model="userForm.daytime" type="daterange" style="width:100%;" size="mini" :picker-options="pickerOptions2" align="right">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!--     button       -->
        <el-row :gutter="20">
          <el-col :lg="9" style="min-width:250px;">
            <br>
            <el-button type="primary" plain @click="handleAdd" size="small"><i class="fa fa-magic "></i>添加用户</el-button>
            <el-button type="info" plain @click="reset" size="small"><i class="fa fa-refresh "></i> 重置</el-button>
            <!-- <button type="button" class="btn btn-outline-secondary btn-sm" @click="reset"><i class="fa fa-refresh "></i> クリア</button>
                                <button type="button" class="btn btn-outline-primary btn-sm" @click="handleAdd"><i class="fa fa-magic "></i>アカウント登録</button> -->
          </el-col>
        </el-row>
      </el-row>
    </el-form>
    <!-- 0001 -->
    <el-row style="padding-top:10px;">
      <el-col :lg="24">
        <el-table :fit="true" :border="true" v-loading="tableload" element-loading-text="数据载入中" element-loading-background="rgba(255, 255, 255, 0.6)" :data="tableDataView" style="width:1160px" size="mini" :default-sort="{prop: 'date', order: 'descending'} ">
          <el-table-column label="#" width="60" align="center">
            <template slot-scope="scope">
              <span>{{(scope.$index+1)+(pagenum-1)*pageSize}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="teacherName" label="姓名 " sortable width="120" align="center">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" sortable width="240" align="center">
          </el-table-column>
          <el-table-column  label="用户角色 " sortable  width="160" align="center" >
              <template slot-scope="scope">
<!--                  
                <el-select
                    v-model="scope.row.roles"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="所有角色">
                    <el-option
                      v-for="item in accesspermission"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select> -->
    
                 <div v-for="item in scope.row.roles" :key="item.id"><span>{{item.nameZh}}</span></div>
                 </template>
          </el-table-column>
          <el-table-column prop="loginStatus" label=" 登录状态 " sortable width="160" :formatter="formaterloginStatus" align="center">
          </el-table-column>
          <!-- <el-table-column prop="loginStatus" label="操作履歴 " sortable width="120">
                </el-table-column> -->
          <el-table-column prop="updatetime" label="最后登陆时间 " sortable :formatter="formaterlastLogin" width="220" align="center"
          >
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
<template slot-scope="scope">
  <el-button size="mini" type="primary" plain style="width:28px;height23px" @click="handleEdit(scope.$index, scope.row)">
    <i class="fa fa-edit"></i></el-button>
  <el-button size="mini" type="danger" plain style="width:28px;height23px" @click="handleDelete(scope.$index, scope.row)"><i class="fa fa-trash-o"></i></el-button>
  <el-button v-if="scope.row.loginStatus ==='10'" plain style="width:28px;height23px" size="mini" type="warning" @click="unlock(scope.$index, scope.row)"><i class="fa fa-lock"></i></el-button>
  <el-button v-else size="mini" type="warning" plain style="width:28px;height23px" @click="lock(scope.$index, scope.row)"><i class="fa fa-unlock"></i></el-button>
</template>
          </el-table-column>
        </el-table>
      </el-col>
       </el-row>
       <el-row  style="padding-top:20px;">
      <el-col :lg="19">
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
    <el-dialog v-if="dialogTableVisible" :visible.sync="dialogTableVisible" :lock-scroll="true" :close-on-click-modal="false" :center="true" width="500px">
      <div slot="title" 　style="font-size:16px">
        <i class='fa fa-key'></i>添加用户
      </div>
      <!-- <accountRegister v-on:closedialog="dialogVisible" ref="c1" :tochlidForm="tochlidForm" :toChlidbtn="toChlidbtn" ></accountRegister> -->
    </el-dialog>
  </el-main>
</template>
<script>
  import _ from 'lodash'
  import moment from 'moment'
  // import {
  //   seachUsers,
  //   deleteUser,
  //   unlockUser,
  //   lockUser
  // } from '@/api/getData'
  export default {
    name: 'SysAllUserManage',
  
    mounted() {
      this.searchAllUser()
    //  this.seach()
    },
    watch: {
      'userForm.adminType' () {
        this.seach()
      },
      'userForm.name' () {
        this.seachUser()
      },
      'userForm.email' () {
        this.seachUser()
      },
      'userForm.loginStatus' () {
        this.seach()
      },
      'userForm.daytime': {
        handler(val) {
          this.seach()
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

      searchAllUser(){
        this.getRequest("/system/basic/users").then(resp =>{
          this.tableData = resp.data.data
          
        })
      },
      // 改变每页条数
      handleSizeChange(val) {
        this.pageSize = val
      },
      // dialog显示不显示
      dialogVisible() {
        this.dialogTableVisible = false
        this.seach()
      },
      // 添加用户
      handleAdd() {
        this.dialogTableVisible = true
        this.toChlidbtn = true
        this.tochlidForm = {
          adminType: '',
          name: '',
          email: '',
          accontType: 1,
          loginStatus: '12'
        }
      },
      // table数据的编辑
      handleEdit(index, row) {
        this.pagenum = this.pagenum
        this.dialogTableVisible = true
        this.toChlidbtn = false
        let chlidForm = {
          adminType: row.adminType,
          name: row.name,
          email: row.email,
          accontType: 1,
          id: row.id,
          loginStatus: row.loginStatus
        }
        this.tochlidForm = chlidForm
      },
      unlock(index, row) {
        this.$confirm('将会给该用户解锁', '注意', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          // 解除
          unlockUser(row.id).then(response => {
            if (response.status === 200) {
              this.$message.success('账户解锁成功')
              this.seach()
            }
          }).catch(err => {
            this.$message.error('用户删除失败')
            console.log(err)
          })
        }).catch(() => {})
      },
      lock(index, row) {
        this.$confirm('是否锁定该账户', '注意', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          lockUser(row.id).then(response => {
            if (response.status === 200) {
              this.$message.success('该用户已经被锁定')
              this.seach()
            }
          }).catch(err => {
            this.$message.error('用户锁定失败')
            console.log(err)
          })
        }).catch(() => {})
      },
      // table数据的删除
      handleDelete(index, row) {
        this.$confirm('此条数据将会被彻底删除，是否继续？', '注意', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          // 删除
          deleteUser(row.id).then(response => {
            if (response.status === 200) {
              this.$message.success('用户删除成功')
              this.seach()
            }
          }).catch(err => {
            this.$message.error('用户删除失败')
            console.log(err)
          })
        }).catch(() => {})
      },
      // 计算开始数和结束的数
      handleCurrentChange(val) {
        this.pagenum = val
      },
      // 关闭添加页面前页面的form
      // beforeclose(done) {
      //   this.seach();
      //   done();
      // },
      reset() {
        this.$refs['userForm'].resetFields()
      },

      // 格式化table的时间
      formateradminType(row, column, cellValue) {
        if (cellValue) {
          let a = {}
          a = this.accesspermission.filter(o => cellValue === o.value)[0]
          return a ? a.label : ''
        } else {
          return ''
        }
      },
      formaterlastLogin(row, column, cellValue) {
        if (cellValue) {
          return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
        } else {
          return '没有数据'
        }
      },

      // 格式化权限，由code变成字
      formaterloginStatus(row, column, cellValue) {
        if (cellValue) {
          let a = {}
          a = this.loginStatus.filter(o => cellValue === o.value)[0]
          return a ? a.label : ''
        } else {
          return ''
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
        console.log(actions)
        seachUsers(actions).then(response => {
          if (response.status === 200) {
            this.tableData = response.data.datalist
            this.pagenum = 1
          }
          this.tableload = false
        }).catch(err => {
          this.tableload = false
          this.$message.error('账户检索失败')
          console.log(err)
        })
      },
      // 发送前的数据编辑
      editdata() {
        let actions = {}
        actions.adminType = this.userForm.adminType
        actions.name = this.userForm.name
        actions.email = this.userForm.email
        actions.loginStatus = this.userForm.loginStatus
        if (this.userForm.daytime && (this.userForm.daytime.length > 1)) {
          actions.lastLoginstart = moment(this.userForm.daytime[0]).format('YYYY-MM-DD 00:00:00')
          actions.lastLoginend = moment(this.userForm.daytime[1]).format('YYYY-MM-DD 23:59:59')
        }
        return actions
      }
    },
    data() {
      return {
        // 更新数据传给子组建的
        toChlidbtn: true,
        tochlidForm: {
          adminType: '',
          name: '',
          email: '',
          accontType: 1
        },
        rolesArray:'',
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
        loginStatus: [{
          value: '1',
          label: '正常登陆'
        }, {
          value: '2',
          label: '密码错误'
        }, {
          value: '3',
          label: '密码重置中'
        }],
        userForm: {
          adminType: '',
          name: '',
          email: '',
          loginStatus: '',
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
          value: 1,
          label: '开发人员'
        }, {
          value: 2,
          label: '客服人员'
        },
        {
          value: 3,
          label: '研发经理'
        }, {
          value: 4,
          label: '部门经理'
        }],
        rules: {
          //访问权限
          adminType: [{
            pattern: /.*/,
            trigger: 'blur,change'
          }],
          // 名
          name: [{
            trigger: 'blur,change'
          }],
          email: [{
            trigger: 'blur,change'
          }],
          loginStatus: [{
            pattern: /.*/,
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

