<template>
  <div>
    <el-container class="home-container">
      <div>
  
    </div>
      <el-header height="100" class="home-header banner clearfix">
        <div class="banner clearfix">
            <div class="bannerLeft">
                <p class="G-paper">中国知网科研诚信部后台dms系统 </p>
            </div>
            <div class="middle"></div>
            <div class="bannerRight">
                 <div style="display: flex;align-items: center;margin-right: 7px" class="right_user_info">
                  <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center">
                    {{user.teacherName}} 欢迎使用本系统
                  </span>
                  <el-dropdown @command="handleCommand" style="margin-left:10px">
                          <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center">    
                                <i><img v-if="user.userface!=''" src="http://bpic.588ku.com/element_pic/01/40/00/64573ce2edc0728.jpg"
                                        style="width: 40px;height: 40px;margin-right: 5px;margin-left: 5px;border-radius: 40px"/></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人中心</el-dropdown-item>
                            <el-dropdown-item command="guide">指导</el-dropdown-item>
                            <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
                          </el-dropdown-menu>
                  </el-dropdown>
                </div>
            </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="210px" class="home-aside">
          <div style="display: flex;justify-content: flex-start;width: 210px;text-align: left;">
            <el-menu style="width: 210px; "  background-color="#2c3b42"  text-color="#fff" active-text-color="#c73625" unique-opened router>
             <div  style="height:39px; padding-top:17px; padding-left:42px; color: #c73625;background-color:#1f282d !important"> <i class="el-icon-info" style="color: #feffff; font-size:14px"></i>
             <span style="margin-left:3px;">{{role_zh}} </span></div>
              <!-- <el-submenu index="roleMenu">
                  <template slot="title">
                    <i class="el-icon-info" style="color: #feffff;width: 14px;"></i>
                    <span slot="title" style="margin-left:8px;">noasdnfod</span>
                  </template>
                  
                </el-submenu> -->
              <template v-for="(item,index) in this.routes" v-if="!item.hidden">
                 
                <el-submenu :key="index" :index="index+''">
                  <template slot="title">
                    <i :class="item.iconCls" style="color: #feffff;width: 14px;"></i>
                    <span slot="title" style="margin-left:8px;">{{item.name}}</span>
                  </template>
                  <el-menu-item width="210px" class="el-icon-arrow-right"
                                style="padding-left: 30px;padding-right:0px;margin-left: 0px;width: 170px;text-align: left"
                                v-for="child in item.children"
                                :index="child.path"
                                :key="child.path">
                               {{child.name}}
                  </el-menu-item>
                </el-submenu>
              </template>
            </el-menu>
          </div>
        </el-aside>
        
          <el-main class="mainClass">
            <!-- 面包屑导航 -->
            <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
            </el-breadcrumb> -->
          <tags-view style="text-align:left !important"></tags-view>

            <keep-alive>
              <router-view v-if="this.$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!this.$route.meta.keepAlive"></router-view>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {initMenu} from '../utils/utils'
import router from '../router'
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './account/defineSteps'
import { TagsView } from '../pages/layout'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
    mounted () {
      this.role_zh = this.$store.state.userInfo.user.roles[0].nameZh
      this.driver = new Driver()
    },
    components:{
      TagsView

    },
    methods: {

      // 帮助提示
      guide() {
          this.driver.defineSteps(steps)
          this.driver.start()
      },

      // 切换用户角色
      swtichRoles(){
          this.$router.push({
            path: '/role', 
            name: 'Role'
        })
      },

      // 用户头像dropdown下的操作
      handleCommand(cmd){
        var _this = this;
        if (cmd == 'logout') {
          this.$confirm('注销登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.getRequest("/logout");
            _this.$store.commit('logout');
            _this.$router.replace({path: '/'});
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '取消'
            });
          });
        }else if(cmd == 'guide'){
            this.driver.defineSteps(steps)
          this.driver.start()
        }
      }
    },


    data(){
      return {
        isDot: false,
        role_zh:'',
        disUsername:'',
        driver: null
      }
    },
    computed: {
          // 用户信息 TODO 改为课改项目后用户信息还未完全对应
      ...mapGetters([
      'user',
      'routes'
    ])
    }
  }
</script>
<style lang="scss">
/*banner*/
.banner {
    width: 100%;
    padding: 0 628px 0 628px;
    box-sizing: border-box;
    position: relative;
}

.banner .middle {
    width: 100%;
    height: 98px;
    float: left;
    background: url("../../static/img/middle.jpg");
}


    .banner .bannerLeft {
        position: relative;
        width: 628px;
        height: 98px;
        float: left;
        margin-left: -628px;
        background: url("../../static/img/bannerleft.gif") no-repeat;
    }
    .banner .bannerRight {
    width: 628px;
    height: 98px;
    position: absolute;
    right: 0;
    background: url("../../static/img/bannerleft.gif") no-repeat -879px 0;
    color: #f9f5f2;
    font-size: 15px;
    text-align: right;
}
.banner .bannerRight .right_user_info{
  position:absolute;
  top:35px;
  right:18px;
  height:33px;
}

.clearfix:before, .clearfix:after {
    /*清除浮动*/
    content: "";
    display: table;
}
.clearfix:after {
    clear: both;
}

/*第二行文字*/
.G-paper {
   // position: absolute;
    top: 53px;
    left: 105px;
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    font-family: "微软雅黑";
    text-shadow: 3px 3px 3px #000;
}

  .home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .home-header {
    background-color: #436bbd;
    height:100px;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    padding: 0px;
  }

  .home-aside {
    background-color: #2c3b42;
  }

  .home-main {
    background-color: #fff;
    color: #000;
    text-align: center;
    margin: 0px;
    padding: 0px;;
  }
  .mainClass {
    padding:0px !important;
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
    margin-left: 8px;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }

  .el-submenu .el-menu-item {
    width: 210px;
    min-width: 205px;
  }
  .el-submenu__title{
     color:#feffff;
  }
  .menuitem {
    color:#feffff;
  }

  .scrollbar-wrapper {
      overflow-x: hidden!important;
      .el-scrollbar__view {
        height: 100%;
      }
    }
    .el-scrollbar__bar.is-vertical{
      right: 0px;
    }
    .is-horizontal {
      display: none;
    }
    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }
    .svg-icon {
      margin-right: 16px;
    }
</style>
