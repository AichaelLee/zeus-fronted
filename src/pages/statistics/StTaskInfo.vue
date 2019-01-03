<template>
  <div>
        <el-form ref="userForm" size="mini">
      <el-row style="padding-left:10px;padding-right:10px">
        <!-- 0001 -->
        <el-row>
          <el-col :span="19" class="text-center" style="padding-top:15px;">
            <span style="font-size:16px"><i class="fa fa-key"></i>个人信息 </span>
          </el-col>
        </el-row>
        <!-- 0002 -->
        <el-row :gutter="20" style="padding-top:40px;">
          <el-col :lg="5" v-if='imgflg' style="min-width:400px " >
            <el-row>
            <img  :src="photo ? 'data:image/jpeg|png|jpg;base64,'+photo : 'static/img/2.jpg'" height="100" width="100" class="img-avatar" alt="アバターの読み込みに失敗しました">
            </el-row>
            <el-row>
               <el-button type="primary" size="mini" @click="reUpload">重新上传</el-button>
            </el-row>


          </el-col>
          <el-col v-if="displayUpload" :lg="5" style="min-width:90px">
            <el-form-Item prop="daytime" >
              <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              <!-- <el-upload
                  class="upload-demo"
                  ref="upload" 
                  drag
                  :action="upAvatar"
                  :multiple="false" :limit="1"
                  accept='image/jpg,image/png,image/jpeg'>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload> -->
            </el-form-Item>
          </el-col>

          <!-- 个人基本信息： -->
          <el-col :lg="6">
          <el-form :model="userInfoForm" :rules="rules" ref="userForm" label-width="100px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="userInfoForm.name"></el-input>
            </el-form-item>
             <el-form-item label="院系" prop="name">
              <el-input v-model="userInfoForm.school"></el-input>
            </el-form-item>
            <el-form-item label="最终学位" prop="name">
              <el-input v-model="userInfoForm.postition"></el-input>
            </el-form-item>

          </el-form>
          </el-col>
        </el-row>
        <hr>
      </el-row>
        </el-form>

      <div v-if="theRole === 'ROLE_teacher' && !submitStatus">

        <el-row>
          <el-col :span="12" :offset="6">
              <el-steps :active="currentActive" finish-status="success" simple style="margin-top: 20px">
                <el-step title="项目概述" ></el-step>
                <el-step title="教学简历" ></el-step>
                <el-step title="项目成员" ></el-step>
              </el-steps>
          </el-col>
        </el-row>
          
          <br><br>
        <el-row>
          <el-col :span="6" :offset="6" v-if="stage1Display">
              <el-form ref="form" label-width="100px" label-position="left">
                  <el-form-item label="项目名称">
                    <el-input
                    placeholder="请输入项目名称"
                    v-model="stuName"
                    clearable>
                  </el-input>
                  </el-form-item>
                  
                  <el-form-item label="项目类别">
                      <!-- <el-input
                          placeholder="请输入项目类别"
                          v-model="stuName"
                          clearable>
                        </el-input> -->

                     <el-select v-model="projectInfo.category" placeholder="请选择">
                        <el-option
                          v-for="item in categoryList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  <el-form-item label="是否“课程思政”专项" label-width="150">
                    
                      <el-radio-group v-model="projectInfo.isSizheng">
                          <el-radio :label="0">是</el-radio>
                          <el-radio :label="1">否</el-radio>
                        </el-radio-group>
                  
                  </el-form-item>

                   <el-form-item label="起止时间" content="请选择起止时间">
              <el-date-picker v-model="projectInfo.daytime" type="daterange" style="width:100%;" size="mini" :picker-options="pickerOptions2" align="right">
              </el-date-picker>
            </el-form-item>

                 
              </el-form>
          </el-col>

          <!-- // stage 2第二阶段需要填写的信息 -->
            <el-col :span="6" :offset="6" v-if="stage2Display">
              <el-form ref="form" label-width="100px" label-position="left">

                 <el-form-item label="时间" content="请选择起止时间">
              <el-date-picker v-model="teachExperience.daytime" type="daterange" style="width:100%;" size="mini" :picker-options="pickerOptions2" align="right">
              </el-date-picker>
            </el-form-item>
                  <el-form-item label="课程名称">
                    <el-input
                    placeholder="请输入课程名称"
                    v-model="teachExperience.courseName"
                    clearable>
                  </el-input>
                  </el-form-item>
                  
                  <el-form-item label="授课对象">
                   
                      <el-input
                        placeholder="请输入授课对象"
                        v-model="teachExperience.teachObject"
                        clearable>
                      </el-input>
                  </el-form-item>
                  
                  <el-form-item label="所在单位">
                   
                      <el-input
                        placeholder="请输入所在单位"
                        v-model="teachExperience.school"
                        clearable>
                      </el-input>
                  </el-form-item>
                  <div> todo 上传附件</div>
                 
              </el-form>
          </el-col>

          <!-- 第三阶段需要填写的信息 -->
            <el-col :span="6" :offset="6" v-if="stage3Display">
              <el-form ref="form" label-width="100px" label-position="left">
                  <el-form-item label="姓名">
                    <el-input
                    placeholder="请输入姓名"
                    v-model="stuName"
                    clearable>
                  </el-input>
                  </el-form-item>
                  
                  <el-form-item label="性别">
                      <!-- <el-input
                          placeholder="请输入项目类别"
                          v-model="stuName"
                          clearable>
                        </el-input> -->

                     <el-select v-model="projectInfo.category" placeholder="请选择">
                        <el-option
                          v-for="item in categoryList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>

                   <el-form-item label="出生年月" content="请选择出生年月">
                      <el-date-picker v-model="projectInfo.daytime" type="date" style="width:100%;" size="mini" :picker-options="pickerOptions2" align="right">
                      </el-date-picker>
                    </el-form-item>


                  <el-form-item label="专业技术职务">
                      <el-input
                      placeholder="请输入专业技术职务"
                      v-model="stuName"
                      clearable>
                    </el-input>
                  </el-form-item>


                  <el-form-item label="工作单位">
                        <el-input
                        placeholder="请输入工作单位"
                        v-model="stuName"
                        clearable>
                      </el-input>
                  </el-form-item>

                  <el-form-item label="项目中的分工">
                          <el-input
                          placeholder="请输入分工"
                          v-model="stuName"
                          clearable>
                        </el-input>
                  </el-form-item>
                 
              </el-form>
          </el-col>


        </el-row>
        <br>


         <el-button type="primary" @click="StepOComplete">完成</el-button>
         <el-button type="primary" @click="beginInstance">修改</el-button>
             <el-button type="primary" @click="startProcessInstance">提交课题申请</el-button>
             <el-button type="primary" @click="completeTask">完成任务</el-button>
         <el-button type="primary" @click="nextStage" v-if="!stage3Display">下一步</el-button>

<!--          
          <el-button type="primary" @click="beginInstance">开始审批流程</el-button>
          <el-button type="primary" @click="studentClaim">提交</el-button>
          <el-button type="primary" @click="showProgress">查看审批流程</el-button> -->


      </div>
      <div v-else-if="submitStatus">
         论文提交已成功，您可以随时查看审批情况
        <el-steps :active="progresDisplay" finish-status="success" simple style="margin-top: 20px">
            <el-step title="提交论文" ></el-step>
            <el-step title="教师审批" ></el-step>
            <el-step title="院长审批" ></el-step>
      </el-steps>

      
       
      </div>
      <div v-else>当前角色h还未指派此流程中的任务</div>
      
  </div>
</template>
<script>
export default {
  data(){
    return {
         // taskId todo
      taskId:'',
      // 教师申请审批时的流程ID
      processInstanceIdapi:'',
      processInstanceId:'',
      // 进度情况
      progressInfo:'',
      // 
      imgflg: true,
      //是否重新上传头像
      displayUpload:false,
      photo:'',
      stuName:'',
      stuNo:'',
      article:'',
      report:'',
      title:'',
      content:'',
      processInfo:'',
      qualityEst:'',
      stuAttitude:'',
      qa:'',
      checkResult:'',
      stuInfo:'',
      teacherEvaluation:'',
      submitStatus:false,
      approvItem:'',
      itemTableData:'',
      score:'',
      value4:'',
      // 当前阶段
      currentActive:1,
      stage1Display:true,
      stage2Display:false,
      stage3Display:false,
      userInfoForm:{
        name:'',
        school:'',
        position:''
      },
      // 第一阶段：项目信息
      projectInfo:{
        daytime:'',
        category:'',
        isSizheng:1
      },
      // 第二阶段：教学经历
      teachExperience:{
        daytime:'',
        courseName:'',
        teachObject:'',
        school:''

      },
   
      categoryList: [{
          value: '1',
          label: '重点'
        }, {
          value: '2',
          label: '一般'
        }],
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
       rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
    }
   
  },
  mounted(){
    // 根据自己的id去task表中查找指定人为本人的任务
    this.getOwnerTask()
    // this.getstatus()
    //this.stuInfo  = this.$route.params.taskData.variables
  },
  computed:{
    theRole(){
      return this.$store.state.userInfo.user.roles[0].name
    },
    progresDisplay(){
      return this.progressInfo.length-1;
    }
  },
  watch:{
    currentActive(val){
      if(val === 1){
        // 阶段一
        this.stage1Display = true
        this.stage2Display = false
        this.stage3Display = false

      }else if(val ===2){
        // 阶段二
        this.stage1Display = false
        this.stage2Display = true
        this.stage3Display = false
      }else {
        // 阶段三
        this.stage1Display = false
        this.stage2Display = false
        this.stage3Display = true

      }

    }
  },
  methods:{
    reUpload(){
      this.imgflg = false
      this.displayUpload=true
    },
    showProgress(){
      this.submitStatus = true;
    },
    getstatus(){
      this.getRequest("/system/basic/taskStatus").then(resp=>{
        this.progressInfo = resp.data
      }).cath(reson=>{
        alert("error!")
      })
    },
    beginInstance(){
             this.getRequest("/system/basic/startProcess").then(resp=> {
                if (resp && resp.status == 200) {
                  // 得到此次的流程ID
                  this.processInstanceId = resp.data
                 
                }
              }).catch(reson=>{
                alert("reget menu error"+reson)
              })
      
    },
     
    studentClaim(){
       this.postRequest('/system/basic/claim/'+this.processInstanceId, {
          'stuName': this.stuName,
          'stuNo': this.stuNo,
          'article': this.article,
          'report': this.report,
          'title': this.title,
          'content': this.content
        }).then(resp=> {
                if (resp && resp.status == 200) {
                  this.$message({
                    message: '论文提交成功！',
                    type:'success'
                  });
                  this.submitStatus = true
              
             
                }
              }).catch(reson=>{
                alert("reget menu error"+reson)
              })
    },
    StepOComplete(){
      this.$message(
        {
          message:'项目详细已成功保存！',
          type:'success'
        }
      )
    },
    nextStage(){
      if(this.currentActive<4){
        this.currentActive+=1;
      }else{
        this.$message({
          message:'已经到底了！',
          type:'error'
        })
      }
    },
    startProcessInstance(){
      this.postjsonRequest('/runtime/process-instances',{
         "processDefinitionKey": 'subject_reform',
         "variables": [
            {
              "name":"initiator",
              "value":"lizhizhong"
            }
         ]
      }).then(resp=>
      {
       this.processInstanceIdapi = resp.data.id;
        alert(this.processInstanceIdapi)
      }).catch(reson=>{
        alert('eror and reson is'+reson)
      })
    },
    getOwnerTask(){
       this.postjsonRequest('/query/tasks',{
               assignee: "lizhizhong"
            }).then(resp=>{ 
              
            if(resp.data.total>0){
              this.taskId = resp.data.data[0].id
              console.log("获得任务成功"+Object.entries(resp.data.data[0]))
            }
              
            }).catch(reson=>{
              alert('eror and reson is'+reson)
            })
    },
    // 完成任务
    completeTask(){
            this.postjsonRequest('/runtime/tasks/'+this.taskId,{
                      "action" : "complete",
                      "variables" : [{
                        name: '课题名称',
                        value:'this.teachExperience.courseName'
                      },{
                        name:'教师职称',
                        value:'this.teachExperience.Object'
                      }

                      ]
              }).then(resp=>
              {
              
                this.$message({
                  message:'课改申请信息已经成功提交，正在等待专家评审！',
                  type:'success'
                })
              }).catch(reson=>{
                alert('eror and reson is'+reson)
              })
    }
  }
}
</script>
<style lang="css">
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-select {
    display: inherit
  }

</style>
