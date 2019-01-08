
<template>
<el-main>
  <el-row>
    <el-col :span="6">
        <el-tree :data="treeData" 
        :props="defaultProps"
        current-node-key = "2"
        :default-expanded-keys="[1]"
        node-key="id" @node-click="handleNodeClick"></el-tree>
    </el-col>
    <el-col :span="12" :offset="2">
      <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="父级节点">
            <el-input v-model="form.parentId"></el-input>
          </el-form-item>
            <el-form-item label="节点ID">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
           <el-form-item label="菜单名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
           <el-form-item label="前端地址">
            <el-input v-model="form.path"></el-input>
          </el-form-item>
           <el-form-item label="类型">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
             <el-form-item label="排序">
            <el-input v-model="form.sort"></el-input>
          </el-form-item>
           <el-form-item label="组件名称">
            <el-input v-model="form.component"></el-input>
          </el-form-item>
           <el-form-item label="图标样式">
            <el-input v-model="form.iconCls"></el-input>
          </el-form-item>
          <el-form-item label="路由缓冲">
            <el-input v-model="form.meta.keepAlive"></el-input>
          </el-form-item>
           <el-form-item label="是否可用">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
    </el-col>
  </el-row>
 
</el-main>
 
</template>
<script>
   export default {
    data() {
      return {
        defaultKeys:['2','7'],
        treeData:[],
        checkedKeys:[],
       
        defaultProps: {
         label: 'name',
          children: 'children'
        },
        form: {
          parentId:'',
          id:'',
          name: '',
          type:'菜单/按钮',
          sort:1,
          path: '',
          component:'',
          iconCls:'',
          meta:{
            keepAlive:''
          }
        }
      };
    },
    mounted(){
      this.getMenuTree()
    },
    methods: {
      handleNodeClick(data) {
        if(data.id!==1){
          this.getSingleMenuDetail(data.id)
        }
        
        console.log(data.id);
      },
      onSubmit() {
        console.log('submit!');
      },
      getMenuTree(){
        let _this = this
          this.getRequest("/system/basic/menuTree/" + 1).then(resp=> {
              if (resp && resp.status == 200) {
                var data = resp.data;
                _this.treeData = data.menus;
                _this.checkedKeys = data.mids;
              }
          })
      },
      // 根据菜单id(也就是页面上的节点id)获得该菜单的详细数据
      getSingleMenuDetail(mid){
        let _this = this
          this.getRequest("/system/basic/menu/" + mid).then(resp=> {
              if (resp && resp.data.status == 0) {
                this.form = resp.data.data
                console.log(resp.data.data);
             
              }
          })
      }
    }
  };
</script>

