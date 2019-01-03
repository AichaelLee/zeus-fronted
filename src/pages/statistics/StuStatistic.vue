<template>
  <div class="dashboard-editor-container">
    <el-row>
      <panel-group @handleSetLineChartData="handleSetLineChartData"/>
    </el-row>
    <el-row>
      <el-col :span="24" class="chart-wrapper">
        <ve-line :data="chartData"></ve-line>
      </el-col>
      
    </el-row>
      <el-row>
        <el-col :span="12" class="chart-wrapper">
          <ve-histogram :data="chartData" :theme-name="asdfasdf"></ve-histogram>
        </el-col>
        <el-col :offset="1" :span="11" class="chart-wrapper"> 
          <ve-pie :data="pieChartData"></ve-pie>        
        </el-col>
      </el-row>
    </div>
</template>
<script>
import PanelGroup from '@/components/dashboard/PanelGroup'
import VeHistogram from 'v-charts/lib/histogram.common'
import VePie from 'v-charts/lib/pie.common'
import VeLine from 'v-charts/lib/line.common'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name:'StuStatistic',
   components: {
   PanelGroup,
   VeHistogram,
   VePie,
   VeLine
  },
  data(){
    return {
      asdfasdf:'asdfasdf',
      chartData: {
          columns: ['学院', '课题总数', '审批通过', '通过率'],
          rows: [
            { '学院': '计算机学院', '课题总数': 1393, '审批通过': 1093, '通过率': 0.78 },
            { '学院': '信息学院', '课题总数': 3530, '审批通过': 3530, '通过率': 0.78 },
            { '学院': '传媒学院', '课题总数': 2923, '审批通过': 2623, '通过率': 0.76 },
            { '学院': '数信学院', '课题总数': 1723, '审批通过': 1423, '通过率': 0.49 },
            { '学院': '文学院', '课题总数': 3792, '审批通过': 3792, '通过率': 0.323 },
            { '学院': '经济学院', '课题总数': 4593, '审批通过': 4293, '通过率': 0.78 }
          ]
       },
       pieChartData: {
          columns: ['学院', '课题数量'],
          rows: [
            { '学院': '计算机学院', '课题数量': 1393 },
            { '学院': '信息安全学院', '课题数量': 3530 },
            { '学院': '广告与传媒学院', '课题数量': 2923 },
            { '学院': '数信学院', '课题数量': 1723 },
            { '学院': '文学院', '课题数量': 3792 },
            { '学院': '现代经济学院', '课题数量': 4593 }
          ]
        }
    }
  },
  methods:{
        handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    
  }
  
}
</script>
<style lang="scss">
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>


