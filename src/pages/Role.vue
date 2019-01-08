<template>
          
<el-row>
  <el-col :xs="8" :sm="8" :md="8" :lg="8" :offset="8">

          <el-card class="box-card">
              <div slot="header" class="clearfix" style="height:80px">
                <h3>选择角色</h3>
                <el-col >
                  学年：
                  <el-select v-model="value" placeholder="请选择" @change="changePlans">
                      <el-option
                        v-for="item in plans"
                        :key="item.id"
                        :label="item.schoolYear"
                        :value="item.schoolYear">
                      </el-option>
                </el-select>
              </el-col>
              </div>
              <div class="text item">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo" v-for="(item,index) in roles" :key="index">
                <el-menu-item index="2" @click="chooseRole(item.name)">
                  <i class="el-icon-menu" ></i>
                  <span slot="title">{{item.nameZh}}</span>
                </el-menu-item>
              </el-menu>
               
              </div>
         </el-card>
  </el-col>
</el-row>
             
</template>
<script>
import router from '../router'
import store from '../store'
import {initMenu} from '../utils/utils'
import {formatRoutes} from '../utils/utils'
  export default {
    mounted: function () {
      this.loadAllRoles()
      this.loadAllPlans()
    },
    methods: {
      chooseRole(value){
           var path = this.$route.query.redirect;
         //alert(path)
        // this.$router
        //       .push({path: path == '/' || path == undefined ? '/home' : path, params: {role: "value"}});
       // this.$router.push({name: '/home', params: {role: value}})

       this.postRequest("/system/basic/chooseRole",{
         choosedRole:value
       }).then(resp=> {
        
          if (resp && resp.status == 200) {
            this.$store.commit('login', resp.data.obj);
            
            // 根据所选角色重新初始化菜单项
            //initMenu(router, store);
              this.getRequest("/config/regetMenu").then(resp=> {
                if (resp && resp.status == 200) {
                  var fmtRoutes = formatRoutes(resp.data);
                  router.addRoutes(fmtRoutes);
                  // console.log(fmtRoutes)
                  store.commit('initMenu', fmtRoutes);
                
                }
              }).catch(reson=>{
                alert("reget menu error"+reson)
              })

            this.$router.push({
            path: '/', 
            name: '主页',
            params: { 
                role: value, 
                dataObj: "this.msg"
            }
        })

          }
        }).catch(reson=>{
          alert("change role error"+reson)
        })



        // this.getRequest("/system/basic/getSwitchAuth").then(resp=> {
        
        //   if (resp && resp.status == 200) {
        //     this.$store.commit('login', resp.data.obj);
        //     alert(Object.entries(resp.data.obj.roles))

        //     this.$router.push({
        //     path: '/', 
        //     name: '主页',
        //     params: { 
        //         role: value, 
        //         dataObj: "this.msg"
        //     }
        // })

        //   }
        // })


      },
      clicks(){
        // alert("saf")
      },
      changePlans(){

      },
      changeRole(){
         var path = this.$route.query.redirect;
         //alert(path)
        // this.$router
        //       .push({path: path == '/' || path == undefined ? '/home' : path, params: {role: "value"}});
       // this.$router.push({name: '/home', params: {role: value}})
        this.$router.push({
            path: '/', 
            name: '主页',
            params: { 
                role: 'ro', 
                dataObj: "this.msg"
            }
        })
      },
      
      loadAllRoles(){
                this.getRequest("/system/basic/userRoles").then(resp=> {
        
          if (resp && resp.status == 200) {
             this.roles = resp.data;
          }
        })
      },
      loadAllPlans(){
          this.getRequest("/system/basic/getPlans").then(resp=> {
          if (resp && resp.status == 200) {
             this.plans = resp.data.obj;
          }
        })

      }
    },
    data(){
      return {
        roles:'',
        isDot: false,
        plans:[],
        value: '2016-2017',
        lists:[
          {name:'角色1',cn:'adf'},
           {name:'角色2',cn:'adf2'},
            {name:'角色3',cn:'adf3'}
        ]
      }
    },
    computed: {
    
    }
  }
</script>
<style>
</style>
