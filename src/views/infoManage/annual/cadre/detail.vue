<template>
  <div class="app-container">

    <!--表格-->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="项目ID" width="95">
        <template  slot-scope="scope">
          {{ scope.row.secondaryId }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.secondaryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权重" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.weight }}
        </template>
      </el-table-column>
      <el-table-column label="得分" width="110" align="center">
        <template  slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-input v-model="scope.row.obsLevel" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.obsLevel }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="操作" align="center" width="200">
        <template slot-scope="{row,$index}">
          <el-button
            v-if="row.editing"
            class="cancel-btn"
            size="small"
            icon="el-icon-refresh"
            type="warning"
            @click="handleCancelEdit(row)"
          >
            取消
          </el-button>
          <el-button
            v-if="row.editing"
            type="success"
            size="small"
            @click="confirmEdit()"
          >
            Ok
          </el-button>
          <el-button v-if="!row.editing" type="primary" size="mini" @click="row.editing=!row.editing">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
// import { getCadreIndex } from ' @/api/request '
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      editing: false,
      editRow: {
        name: 'nishi'
      },
      total: 0,
      listQuery: {
        pageNumber: 1
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        title: '添加干部'
      },
      addForm: {
        name: '', // 姓名
        unitId: '', // 单位id
        cadreCode: '', // 编号
        phone: '', // 电话
        email: '', // 邮箱
        // gender: '',
        // birthday: '',
        position: '', // 职位
        // leaderId: '',
        unitName: '' // 单位名称

      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        unitId: [
          { required: true, message: '请输入单位ID', trigger: 'change' }
        ],
        cadreCode: [
          { required: true, message: '请输入编号', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'change' }
        ],
        email: [
          { type: 'email', required: true, message: '请输入邮箱', trigger: 'change' }
        ],
        position: [
          { required: true, message: '请输入职位', trigger: 'change' }
        ],
        unitName: [
          { required: true, message: '请输入单位名称', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // getCadreIndex(this.listQuery).then(response => {
      //   console.log(response)
      // this.list = response.map.list
      // this.total = response.map.total
      // this.listLoading = false
      // })
      getList().then(response => {
        const data = `{
    "code":1,
    "msg":"操作成功...",
    "map":{
        "list":[
            {
                "dailyId":1066,
                "secondaryId":1014,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"91.0",
                "secondaryName":"理想是否坚定，在政治立场、政治方向、政治原则、政治道路是否与中央保持高度一致",
                "weight":0.4
            },
            {
                "dailyId":1067,
                "secondaryId":1015,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"91.0",
                "secondaryName":"严守党的政治纪律和政治规矩情况",
                "weight":0.03
            },
            {
                "dailyId":1068,
                "secondaryId":1016,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"89.0",
                "secondaryName":"参加政治学习情况",
                "weight":0.2
            },
            {
                "dailyId":1069,
                "secondaryId":1017,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"88.0",
                "secondaryName":"执行民主集中制情况",
                "weight":0.1
            },
            {
                "dailyId":1070,
                "secondaryId":1018,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"87.0",
                "secondaryName":"履行岗位职责情况以及制度执行力",
                "weight":0.6
            },
            {
                "dailyId":1071,
                "secondaryId":1019,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"86.0",
                "secondaryName":"重大突发事件或遇到各种矛盾问题时的态度",
                "weight":0.4
            },
            {
                "dailyId":1072,
                "secondaryId":1020,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"85.0",
                "secondaryName":"工作思想和工作态度",
                "weight":0.5
            },
            {
                "dailyId":1073,
                "secondaryId":1021,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"84.0",
                "secondaryName":"推动本单位或学校改革发展情况",
                "weight":0.5
            },
            {
                "dailyId":1074,
                "secondaryId":1022,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"83.0",
                "secondaryName":"履行党风廉政建设工作责任制情况",
                "weight":0.5
            },
            {
                "dailyId":1075,
                "secondaryId":1023,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"82.0",
                "secondaryName":"主管或分管领域干部及工作人员的廉洁自律情况",
                "weight":0.5
            },
            {
                "dailyId":1076,
                "secondaryId":1024,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"81.0",
                "secondaryName":"遵守中央“八项规定”精神情况",
                "weight":"1.0"
            },
            {
                "dailyId":1077,
                "secondaryId":1025,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"82.0",
                "secondaryName":"遵守领导干部社会兼职情况",
                "weight":"1.0"
            },
            {
                "dailyId":1078,
                "secondaryId":1026,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"83.0",
                "secondaryName":"遵守相关销假制度、重大事项报告情况",
                "weight":"1.0"
            },
            {
                "dailyId":1079,
                "secondaryId":1027,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"84.0",
                "secondaryName":"是否报告个人有关事项情况",
                "weight":0.5
            },
            {
                "dailyId":1080,
                "secondaryId":1028,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"85.0",
                "secondaryName":"是否如实报告个人因私出国情况",
                "weight":0.5
            },
            {
                "dailyId":1081,
                "secondaryId":1029,
                "cadreId":1001,
                "unitId":null,
                "groupExamine":0,
                "obsLevel":"86.0",
                "secondaryName":"参加全校性会议出席签到情况",
                "weight":"1.0"
            }
        ]
    }
}`
        console.log(response)
        const items = JSON.parse(data).map.list
        this.list = items.map(v => {
          this.$set(v, 'editing', false) // 深度反应 https://vuejs.org/v2/guide/reactivity.html
          v.originalobsLevel = v.obsLevel //  取消编辑还原数据
          return v
        })
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // getList() {
    //   this.listLoading = true
    //   fetchList(this.listQuery).then(response => {
    //     this.list = response.data.items
    //     this.total = response.data.total
    //
    //     // Just to simulate the time of the request
    //     setTimeout(() => {
    //       this.listLoading = false
    //     }, 1.5 * 1000)
    //   })
    // },
    handleCancelEdit(row) {
      row.name = row.originalName
      row.editing = false
    },
    confirmEdit(){
      //修改校验
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['addForm'].clearValidate()
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    confirmData() {
      // 提交校验
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          // 数据提交
          this.$notify({
            title: '成功',
            message: '添加干部成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: '添加干部失败',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.filter-container {
  padding-bottom: 10px;

  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
}

.pagination {
  background-color: #20a0ff;
  height: 80px;
  width: 100%;
}

</style>
