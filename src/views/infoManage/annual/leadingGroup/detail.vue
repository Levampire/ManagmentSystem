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
                "dailyId":1001,
                "secondaryId":1001,
                "cadreId":null,
                "unitId":1001,
                "groupExamine":1,
                "obsLevel":"70.0",
                "secondaryName":"党委中心学习情况",
                "weight":0.5
            },
            {
                "dailyId":1002,
                "secondaryId":1002,
                "cadreId":null,
                "unitId":1001,
                "groupExamine":1,
                "obsLevel":"80.0",
                "secondaryName":"政治学习情况",
                "weight":0.3
            },
            {
                "dailyId":1003,
                "secondaryId":1003,
                "cadreId":null,
                "unitId":1001,
                "groupExamine":1,
                "obsLevel":"90.0",
                "secondaryName":"学习培训情况",
                "weight":0.2
            },
            {
                "dailyId":1004,
                "secondaryId":1004,
                "cadreId":null,
                "unitId":1001,
                "groupExamine":1,
                "obsLevel":"99.0",
                "secondaryName":"执行党政联系会议制度情况",
                "weight":0.5
            },
            {
                "dailyId":1005,
                "secondaryId":1005,
                "cadreId":null,
                "unitId":1001,
                "groupExamine":1,
                "obsLevel":"80.0",
                "secondaryName":"执行教代会、职代会情况",
                "weight":0.5
            },
            {
                "dailyId":1006,
                "secondaryId":1006,
                "cadreId":null,
                "unitId":1001,
                "groupExamine":1,
                "obsLevel":"77.0",
                "secondaryName":"服务师生，主动帮助群众解决困难和问题等情况",
                "weight":0.5
            },
            {
                "dailyId":1007,
                "secondaryId":1007,
                "cadreId":null,
                "unitId":1001,
                "groupExamine":1,
                "obsLevel":"100.0",
                "secondaryName":"联系学生班级、党支部情况",
                "weight":0.3
            },
            {
                "dailyId":1008,
                "secondaryId":1008,
                "cadreId":null,
                "unitId":1001,
                "groupExamine":1,
                "obsLevel":"99.0",
                "secondaryName":"深入课堂一线听课情况",
                "weight":0.1
            },
            {
                "dailyId":1009,
                "secondaryId":1009,
                "cadreId":null,
                "unitId":1001,
                "groupExamine":1,
                "obsLevel":"88.0",
                "secondaryName":"交心交谈情况",
                "weight":0.1
            },
            {
                "dailyId":1010,
                "secondaryId":1010,
                "cadreId":null,
                "unitId":1001,
                "groupExamine":1,
                "obsLevel":"99.0",
                "secondaryName":"落实“两个责任”情况",
                "weight":0.5
            },
            {
                "dailyId":1011,
                "secondaryId":1011,
                "cadreId":null,
                "unitId":1001,
                "groupExamine":1,
                "obsLevel":"100.0",
                "secondaryName":"规范使用“三公”经费情况",
                "weight":0.3
            },
            {
                "dailyId":1012,
                "secondaryId":1012,
                "cadreId":null,
                "unitId":1001,
                "groupExamine":1,
                "obsLevel":"99.0",
                "secondaryName":"遵守中央“八项规定”精神情况",
                "weight":0.2
            },
            {
                "dailyId":1013,
                "secondaryId":1013,
                "cadreId":null,
                "unitId":1001,
                "groupExamine":1,
                "obsLevel":"100.0",
                "secondaryName":"学校下达目标任务完成情况",
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
