<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
         <i class="el-icon-document card-panel-icon"> </i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">申请课题总数</div>
          <count-to :start-val="0" :end-val="12400" :duration="2000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <!-- <svg-icon icon-class="message" class-name="card-panel-icon" /> -->
          <i class="el-icon-circle-check card-panel-icon"> </i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">通过审批总数</div>
          <count-to :start-val="0" :end-val="8112" :duration="300" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
           <i class="el-icon-circle-close card-panel-icon"> </i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">驳回总数</div>
         
          <count-to :start-val="0" :end-val="980" :duration="320" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
         <i class="el-icon-message card-panel-icon"> </i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">我的审批</div>
          <count-to :start-val="0" :end-val="3600" :duration="1800" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import SvgIcon from '@/components/SvgIcon/index'// svg组件

export default {
  components: {
    CountTo,
    SvgIcon
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #34bfa3;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background:  #36a3f7;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #34bfa3;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #36a3f7
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
