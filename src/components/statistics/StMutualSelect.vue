<template>
  <div>
    <h1>
      
      查看当前正在进行中的流程
       <el-table
    :data="taskInfo"
    style="width: 100%">
    <el-table-column
      label="流程名称"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.processDefinationName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="申请人"
      width="120">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: 学生A</p>
          <p>题目: 瞎闹着玩呗</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">学生A</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
      <el-table-column
      label="申请时间"
      width="150">
      <template slot-scope="scope">
       
       {{ scope.row.createTime | parseTime}}
      </template>
    </el-table-column>
      <el-table-column
      label="开始时间"
      width="150">
      <template slot-scope="scope">
       
      {{ scope.row.createTime | parseTime}}
      </template>
    </el-table-column>
      <el-table-column
      label="结束时间"
      width="150">
      <template slot-scope="scope">
      {{ scope.row.createTime | parseTime }}
      </template>
    </el-table-column>
      <el-table-column
      label="当前节点"
      width="180">
      <template slot-scope="scope">
       {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column label="办理">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="approval(scope.row)">审核</el-button>
      </template>
    </el-table-column>
  </el-table>

    </h1>
  </div>
</template>
<script>
export default {
  data(){
    return {
      instanceData:'',
      taskInfo:''
    }
  },
  mounted(){
    this.getProcessInstance();
    this.getTaskInfo();
  },
  filters:{
    parseTime(time){
      let  date = new Date(time)
      return date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()
    }
   
  },
  methods:{
    getProcessInstance(){
      // get all process-instance 
    this.postRequest('/system/basic/query/process-instances', {
          deploymentKey: 'thesisapproval'
          
        }).then(resp=> {
          if (resp && resp.status == 200) {
            //this.instanceData = resp.data;
          //  alert("success")
          
           
          }
        });
    },
    getTaskInfo(){
      this.getRequest('/system/basic/taskInfo').then(resp=>{
        if(resp && resp.status===200){
          
           this.taskInfo = resp.data;
        
        }
      }).catch(reson=>{
        alert("error and reson is"`${reson}`)
      })
    },
    approval(data){
        this.$router.push({
            path: '/sta/all', 
            name: '查看课题信息',
            params: { 
                taskData:data
            }
        })
 

    }
  }
}
</script>

