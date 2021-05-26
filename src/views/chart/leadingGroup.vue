
<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from '@/layout/components/Charts/mixins/resize.js'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    }
  },
  data() {
    return {
      height: 'calc(100vh - 50px)',
      width: '100%',
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const xData = (function() {
        return ['优秀', '良好','合格',  '不及格']
      }())
      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: '领导班子考核统计',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          },
          // "{b} <br/>{a0} : {c0} 辆<br/>{a1} : {c1} 人"
          formatter: function(p) {
            let title = ''
            let str = ''
            p.forEach(function(value) {
              title = value.axisValue
              str += '<br>' + value.marker + value.seriesName + ':' + value.value
            })
            if (title === '优秀') {
              str += `<br>计算机科学学院<br>石油与天然气工程学院<br>电气信息学院<br>`
            } else if (title === '良好') {
              str += `<br>外国语学院<br>`
            } else if (title === '不合格') {
              str += `<br>宣传部<br>`
            }else if (title === '合格') {
              str += `<br>马克思主义学院<br>`
            }
            return title + str
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: xData
        }],
        yAxis: [{
          name: '达标人数',
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }, { // 第二个y轴在右侧
          name: '平均分数',
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: '人数',
          type: 'bar',
          stack: 'total',
          barMaxWidth: 80,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            80,
            90,
            20,
            5
          ],
          yAxisIndex: '0'
        }
        ]
      })
    }
  }
}
</script>
