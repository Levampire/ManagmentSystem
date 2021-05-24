<template>
  <div class="app-container">
    <!--检索-->
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="姓名"
        style="width: 200px; padding: 0 5px 0 5px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.title"
        placeholder="单位"
        style="width: 200px;padding: 0 5px 0 5px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.title"
        placeholder="职位"
        style="width: 200px;padding: 0 5px 0 5px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.title"
        placeholder="电话"
        style="width: 200px;padding: 0 5px 0 5px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="filter-item"
        style="margin-left: 10px;float: right"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加干部
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="float: right"
        @click="handleFilter"
      >
        搜索
      </el-button>
    </div>
    <!--表格-->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="干部编码" width="95">
        <template slot-scope="scope">
          {{ scope.row.cadreCode }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-input v-model="scope.row.name" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位名称" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-input v-model="scope.row.unitName" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.unitName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" align="center" width="150">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-input v-model="scope.row.position" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="电话" width="200" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-input v-model="scope.row.phone" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="200" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-input v-model="scope.row.email" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
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
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <!--添加考核弹窗-->
    <el-dialog :title="textMap.title" :visible.sync="dialogFormVisible">
      <el-form ref="addForm" :model="addForm" label-width="80px" :rules="rules">
        <el-form-item label="姓名" width="200" prop="name">
          <el-input v-model="addForm.name" />
        </el-form-item>
        <el-form-item label="单位ID" prop="unitId">
          <el-input v-model="addForm.unitId" />
        </el-form-item>
        <el-form-item label="干部编号" prop="cadreCode">
          <el-input v-model="addForm.cadreCode" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" />
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="addForm.position" />
        </el-form-item>
        <el-form-item label="单位名称" prop="unitName">
          <el-input v-model="addForm.unitName" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="confirmData">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'
// import { getCadreIndex } from ' @/api/request '
export default {
  components: { Pagination },
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
        console.log(response)
        const data = `{   "code":1,"msg":"操作成功...", "map":{ "pageInfo":{"pageNum":1,"pageSize":10,  "size":10,"startRow":1,  "endRow":10,  "total":33,  "pages":4,
            "list":[
                {
                    "cadreId":1001,
                    "name":"Luke",
                    "unitId":1001,
                    "cadreCode":"Luke1001",
                    "phone":"10086",
                    "email":"10086@qq.com",
                    "gender":null,
                    "birthday":null,
                    "position":"院长",
                    "leaderId":null,
                    "unitName":"计算机科学学院",
                    "points":"0.0",
                    "level":null
                },
                {
                    "cadreId":1002,
                    "name":"Holly",
                    "unitId":1001,
                    "cadreCode":"Holly1002",
                    "phone":"10086",
                    "email":"10086@qq.com",
                    "gender":null,
                    "birthday":null,
                    "position":"副院长",
                    "leaderId":null,
                    "unitName":"计算机科学学院",
                    "points":"0.0",
                    "level":null
                },
                {
                    "cadreId":1003,
                    "name":"Eli",
                    "unitId":1001,
                    "cadreCode":"Eli1003",
                    "phone":"1008611",
                    "email":"1008611@qq.com",
                    "gender":null,
                    "birthday":null,
                    "position":"办公室主任",
                    "leaderId":null,
                    "unitName":"计算机科学学院",
                    "points":"0.0",
                    "level":null
                },
                {
                    "cadreId":1004,
                    "name":"Wood",
                    "unitId":1002,
                    "cadreCode":"Wood1004",
                    "phone":"10010",
                    "email":"10010@163.com",
                    "gender":null,
                    "birthday":null,
                    "position":"院长",
                    "leaderId":null,
                    "unitName":"电气信息学院",
                    "points":"0.0",
                    "level":null
                },
                {
                    "cadreId":1005,
                    "name":"Rex",
                    "unitId":1002,
                    "cadreCode":"Rex1005",
                    "phone":"10010",
                    "email":"10010@163.com",
                    "gender":null,
                    "birthday":null,
                    "position":"副院长",
                    "leaderId":null,
                    "unitName":"电气信息学院",
                    "points":"0.0",
                    "level":null
                },
                {
                    "cadreId":1006,
                    "name":"Drew",
                    "unitId":1002,
                    "cadreCode":"Drew1006",
                    "phone":"10011",
                    "email":"10011@163.com",
                    "gender":null,
                    "birthday":null,
                    "position":"办公室主任",
                    "leaderId":null,
                    "unitName":"电气信息学院",
                    "points":"0.0",
                    "level":null
                },
                {
                    "cadreId":1007,
                    "name":"Black",
                    "unitId":1003,
                    "cadreCode":"Black1007",
                    "phone":"10000",
                    "email":"10000@qq.com",
                    "gender":null,
                    "birthday":null,
                    "position":"院长",
                    "leaderId":null,
                    "unitName":"化学化工学院",
                    "points":"0.0",
                    "level":null
                },
                {
                    "cadreId":1008,
                    "name":"Leo",
                    "unitId":1003,
                    "cadreCode":"Leo1008",
                    "phone":"1008",
                    "email":"1008@qq.com",
                    "gender":null,
                    "birthday":null,
                    "position":"副院长",
                    "leaderId":null,
                    "unitName":"化学化工学院",
                    "points":"0.0",
                    "level":null
                },
                {
                    "cadreId":1009,
                    "name":"Egan",
                    "unitId":1003,
                    "cadreCode":"Egan1009",
                    "phone":"1009",
                    "email":"1009@qq.com",
                    "gender":null,
                    "birthday":null,
                    "position":"办公室主任",
                    "leaderId":null,
                    "unitName":"化学化工学院",
                    "points":"0.0",
                    "level":null
                },
                {
                    "cadreId":1010,
                    "name":"Zoe",
                    "unitId":1004,
                    "cadreCode":"Zoe1010",
                    "phone":"1010",
                    "email":"1010@qq.com",
                    "gender":null,
                    "birthday":null,
                    "position":"院长",
                    "leaderId":null,
                    "unitName":"石油与天然气工程学院",
                    "points":"0.0",
                    "level":null
                }
            ],
            "prePage":0,
            "nextPage":2,
            "isFirstPage":true,
            "isLastPage":false,
            "hasPreviousPage":false,
            "hasNextPage":true,
            "navigatePages":3,
            "navigatepageNums":[
                1,
                2,
                3
            ],
            "navigateFirstPage":1,
            "navigateLastPage":3,
            "lastPage":3,
            "firstPage":1
        }
    }
}`
        this.total = JSON.parse(data).map.pageInfo.total
        const items = JSON.parse(data).map.pageInfo.list
        this.list = items.map(v => {
          this.$set(v, 'editing', false) // 深度反应 https://vuejs.org/v2/guide/reactivity.html
          v.originalCadreCode = v.cadreCode //  取消编辑还原数据
          v.originalName = v.name //  取消编辑还原数据
          v.originalUnitName = v.unitName //  取消编辑还原数据
          v.originalPosition = v.position //  取消编辑还原数据
          v.originalPhone = v.phone //  取消编辑还原数据
          v.originalEmail = v.email //  取消编辑还原数据
          return v
        })
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
    confirmEdit() {
      // 修改校验
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
