<template>
  <div class="app-container">
    <div class="Score">
      总得分: 98
    </div>
    <el-input v-model="filterText" placeholder="关键字" style="margin-bottom:30px;" />
    <el-tree
      class="filter-tree"
      :props="defaultProps"
      :filter-node-method="filterNode"
      ref="tree"
      :data="nodeData"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span slot-scope="{ node, data }" class="custom-tree-node" style="width: 100%">
        <span style="float: left;height: 30px;line-height: 30px" @click="thisnode(node)">{{ node.label }}</span>
        <span style="float: right;display: flex;justify-content:start">
          <span v-if="node.data.points" style="color: #20a0ff; float: left;height: 30px;line-height: 30px;margin-right: 20px" >(此栏得分: {{ parseFloat(node.data.points).toFixed(2) }})</span>
          <span v-if="node.data.points1" style="float: left;height: 30px;line-height: 30px;margin-right: 20px" >单项得分:{{ parseFloat(node.data.points1).toFixed(2) }}</span>
          <span v-if="node.data.points2" style="float: left;height: 30px;line-height: 30px;margin-right: 20px" >权重后得分:{{ parseFloat(node.data.points2).toFixed(2) }}</span>
          <span  style="color:#FB6781;float: left;height: 30px;line-height: 30px;margin-right: 20px" >(权重: {{ parseFloat(node.data.weight).toFixed(2) }})</span>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {

  data() {
    const nodeData = []
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      nodeData: JSON.parse(JSON.stringify(nodeData))
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    let data = `{
    "code":1,
    "msg":"操作成功...",
    "map":{
        "all":[
            {
                "firstId":1005,
                "name":"重点任务完成情况",
                "weight":0.1,
                "obsPointList":[
                    {
                        "secondaryId":1013,
                        "name":"学校下达目标任务完成情况",
                        "firstId":1005,
                        "weight":"1.0",
                        "leadingId":1010,
                        "groupExamine":1,
                        "points1":"100.0",
                        "points2":"100.0"
                    }
                ],
                "points":"100.0"
            },
            {
                "firstId":1004,
                "name":"党风廉政建设情况和执行中央“八项规定”执行情况",
                "weight":0.2,
                "obsPointList":[
                    {
                        "secondaryId":1010,
                        "name":"落实“两个责任”情况",
                        "firstId":1004,
                        "weight":0.5,
                        "leadingId":1008,
                        "groupExamine":1,
                        "points1":"99.0",
                        "points2":49.5
                    },
                    {
                        "secondaryId":1011,
                        "name":"规范使用“三公”经费情况",
                        "firstId":1004,
                        "weight":0.3,
                        "leadingId":1008,
                        "groupExamine":1,
                        "points1":"100.0",
                        "points2":"30.0"
                    },
                    {
                        "secondaryId":1012,
                        "name":"遵守中央“八项规定”精神情况",
                        "firstId":1004,
                        "weight":0.2,
                        "leadingId":1008,
                        "groupExamine":1,
                        "points1":"99.0",
                        "points2":19.8
                    }
                ],
                "points":"100.0"
            },
            {
                "firstId":1002,
                "name":"贯彻执行民主执行情况",
                "weight":0.2,
                "obsPointList":[
                    {
                        "secondaryId":1004,
                        "name":"执行党政联系会议制度情况",
                        "firstId":1002,
                        "weight":0.5,
                        "leadingId":1006,
                        "groupExamine":1,
                        "points1":"99.0",
                        "points2":49.5
                    },
                    {
                        "secondaryId":1005,
                        "name":"执行教代会、职代会情况",
                        "firstId":1002,
                        "weight":0.5,
                        "leadingId":1007,
                        "groupExamine":1,
                        "points1":"80.0",
                        "points2":"40.0"
                    }
                ],
                "points":"90.0"
            },
            {
                "firstId":1003,
                "name":"执行党的群众路线情况",
                "weight":0.2,
                "obsPointList":[
                    {
                        "secondaryId":1006,
                        "name":"服务师生，主动帮助群众解决困难和问题等情况",
                        "firstId":1003,
                        "weight":0.5,
                        "leadingId":1006,
                        "groupExamine":1,
                        "points1":"77.0",
                        "points2":38.5
                    },
                    {
                        "secondaryId":1007,
                        "name":"联系学生班级、党支部情况",
                        "firstId":1003,
                        "weight":0.3,
                        "leadingId":1006,
                        "groupExamine":1,
                        "points1":"100.0",
                        "points2":"30.0"
                    },
                    {
                        "secondaryId":1008,
                        "name":"深入课堂一线听课情况",
                        "firstId":1003,
                        "weight":0.1,
                        "leadingId":1006,
                        "groupExamine":1,
                        "points1":"99.0",
                        "points2":9.9
                    },
                    {
                        "secondaryId":1009,
                        "name":"交心交谈情况",
                        "firstId":1003,
                        "weight":0.1,
                        "leadingId":1006,
                        "groupExamine":1,
                        "points1":"88.0",
                        "points2":8.8
                    }
                ],
                "points":"88.0"
            },
            {
                "firstId":1001,
                "name":"思想政治建设情况",
                "weight":0.3,
                "obsPointList":[
                    {
                        "secondaryId":1001,
                        "name":"党委中心学习情况",
                        "firstId":1001,
                        "weight":0.5,
                        "leadingId":1005,
                        "groupExamine":1,
                        "points1":"70.0",
                        "points2":"35.0"
                    },
                    {
                        "secondaryId":1002,
                        "name":"政治学习情况",
                        "firstId":1001,
                        "weight":0.3,
                        "leadingId":1005,
                        "groupExamine":1,
                        "points1":"80.0",
                        "points2":"24.0"
                    },
                    {
                        "secondaryId":1003,
                        "name":"学习培训情况",
                        "firstId":1001,
                        "weight":0.2,
                        "leadingId":1006,
                        "groupExamine":1,
                        "points1":"90.0",
                        "points2":"18.0"
                    }
                ],
                "points":"77.0"
            }
        ]
    }
}
`
    console.log(JSON.parse(data))
    data = JSON.parse(data)
    const childData = []
    data.map.all.forEach(value => {
      console.log(value)
      value.obsPointList.forEach(value => {
        childData.push({ id: value.secondaryId,
          label: value.name,
          groupExamine: value.groupExamine,
          leadingId: value.leadingId,
          points1: value.points1,
          points2: value.points2,
          secondaryId: value.secondaryId,
          weight: value.weight })
      })
      this.nodeData.push({ id: value.firstId, label: value.name, children: childData, points: value.points, weight: value.weight })
    })
  },
  methods: {
    thisnode(n){
      console.log(n);
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1)
    }
  }
}
</script>
<style scoped>
.Score{
  margin-left: 30px;
  font-weight: bolder;
  font-size: 20pt;
  height: 50px;
  color: #304156;
}
</style>

