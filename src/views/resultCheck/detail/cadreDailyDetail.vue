<template>
  <div class="app-container">
    <div class="Score">
      总得分: 88
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
                "firstId":1007,
                "name":"担当精神和执行力",
                "weight":0.1,
                "obsPointList":[
                    {
                        "secondaryId":1018,
                        "name":"履行岗位职责情况以及制度执行力",
                        "firstId":1007,
                        "weight":0.6,
                        "leadingId":1006,
                        "groupExamine":0,
                        "points1":"87.0",
                        "points2":52.199999999999996
                    },
                    {
                        "secondaryId":1019,
                        "name":"重大突发事件或遇到各种矛盾问题时的态度",
                        "firstId":1007,
                        "weight":0.4,
                        "leadingId":1006,
                        "groupExamine":0,
                        "points1":"86.0",
                        "points2":34.4
                    }
                ],
                "points":"86.0"
            },
            {
                "firstId":1014,
                "name":"参加会议情况",
                "weight":0.1,
                "obsPointList":[
                    {
                        "secondaryId":1029,
                        "name":"参加全校性会议出席签到情况",
                        "firstId":1014,
                        "weight":"1.0",
                        "leadingId":1011,
                        "groupExamine":0,
                        "points1":"86.0",
                        "points2":"86.0"
                    }
                ],
                "points":"86.0"
            },
            {
                "firstId":1013,
                "name":"个人有关事项报告、因私出国情况",
                "weight":0.1,
                "obsPointList":[
                    {
                        "secondaryId":1027,
                        "name":"是否报告个人有关事项情况",
                        "firstId":1013,
                        "weight":0.5,
                        "leadingId":1006,
                        "groupExamine":0,
                        "points1":"84.0",
                        "points2":"42.0"
                    },
                    {
                        "secondaryId":1028,
                        "name":"是否如实报告个人因私出国情况",
                        "firstId":1013,
                        "weight":0.5,
                        "leadingId":1006,
                        "groupExamine":0,
                        "points1":"85.0",
                        "points2":42.5
                    }
                ],
                "points":"85.0"
            },
            {
                "firstId":1008,
                "name":"工作表现和实绩",
                "weight":0.1,
                "obsPointList":[
                    {
                        "secondaryId":1020,
                        "name":"工作思想和工作态度",
                        "firstId":1008,
                        "weight":0.5,
                        "leadingId":1010,
                        "groupExamine":0,
                        "points1":"85.0",
                        "points2":42.5
                    },
                    {
                        "secondaryId":1021,
                        "name":"推动本单位或学校改革发展情况",
                        "firstId":1008,
                        "weight":0.5,
                        "leadingId":1010,
                        "groupExamine":0,
                        "points1":"84.0",
                        "points2":"42.0"
                    }
                ],
                "points":"85.0"
            },
            {
                "firstId":1012,
                "name":"请示报告制度情况",
                "weight":0.1,
                "obsPointList":[
                    {
                        "secondaryId":1026,
                        "name":"遵守相关销假制度、重大事项报告情况",
                        "firstId":1012,
                        "weight":"1.0",
                        "leadingId":1011,
                        "groupExamine":0,
                        "points1":"83.0",
                        "points2":"83.0"
                    }
                ],
                "points":"83.0"
            },
            {
                "firstId":1009,
                "name":"履行\\"一岗双责\\"情况",
                "weight":0.1,
                "obsPointList":[
                    {
                        "secondaryId":1022,
                        "name":"履行党风廉政建设工作责任制情况",
                        "firstId":1009,
                        "weight":0.5,
                        "leadingId":1008,
                        "groupExamine":0,
                        "points1":"83.0",
                        "points2":41.5
                    },
                    {
                        "secondaryId":1023,
                        "name":"主管或分管领域干部及工作人员的廉洁自律情况",
                        "firstId":1009,
                        "weight":0.5,
                        "leadingId":1008,
                        "groupExamine":0,
                        "points1":"82.0",
                        "points2":"41.0"
                    }
                ],
                "points":"83.0"
            },
            {
                "firstId":1011,
                "name":"领导干部社会兼职情况",
                "weight":0.1,
                "obsPointList":[
                    {
                        "secondaryId":1025,
                        "name":"遵守领导干部社会兼职情况",
                        "firstId":1011,
                        "weight":"1.0",
                        "leadingId":1006,
                        "groupExamine":0,
                        "points1":"82.0",
                        "points2":"82.0"
                    }
                ],
                "points":"82.0"
            },
            {
                "firstId":1010,
                "name":"执行中央\\"八项规定\\"精神情况",
                "weight":0.1,
                "obsPointList":[
                    {
                        "secondaryId":1024,
                        "name":"遵守中央“八项规定”精神情况",
                        "firstId":1010,
                        "weight":"1.0",
                        "leadingId":1009,
                        "groupExamine":0,
                        "points1":"81.0",
                        "points2":"81.0"
                    }
                ],
                "points":"81.0"
            },
            {
                "firstId":1006,
                "name":"政治态度",
                "weight":0.2,
                "obsPointList":[
                    {
                        "secondaryId":1014,
                        "name":"理想是否坚定，在政治立场、政治方向、政治原则、政治道路是否与中央保持高度一致",
                        "firstId":1006,
                        "weight":0.4,
                        "leadingId":1006,
                        "groupExamine":0,
                        "points1":"91.0",
                        "points2":36.4
                    },
                    {
                        "secondaryId":1015,
                        "name":"严守党的政治纪律和政治规矩情况",
                        "firstId":1006,
                        "weight":0.03,
                        "leadingId":1006,
                        "groupExamine":0,
                        "points1":"91.0",
                        "points2":2.73
                    },
                    {
                        "secondaryId":1016,
                        "name":"参加政治学习情况",
                        "firstId":1006,
                        "weight":0.2,
                        "leadingId":1006,
                        "groupExamine":0,
                        "points1":"89.0",
                        "points2":17.8
                    },
                    {
                        "secondaryId":1017,
                        "name":"执行民主集中制情况",
                        "firstId":1006,
                        "weight":0.1,
                        "leadingId":1006,
                        "groupExamine":0,
                        "points1":"88.0",
                        "points2":8.8
                    }
                ],
                "points":"66.0"
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

