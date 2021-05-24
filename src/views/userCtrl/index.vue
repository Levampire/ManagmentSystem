<template>
  <div class="app-container">
    <!--检索-->
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="用户昵称"
        style="width: 200px; padding: 0 5px 0 5px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.title"
        placeholder="用户姓名"
        style="width: 200px;padding: 0 5px 0 5px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.title"
        placeholder="用户编码"
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
        添加用户
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
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-input v-model="scope.row.userName" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-input v-model="scope.row.realName" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.realName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户编码" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-input v-model="scope.row.code" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="身份权限" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
          <span v-else>{{ scope.row.roleName }}</span>
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
        <el-form-item label="用户昵称" width="200" prop="name">
          <el-input v-model="addForm.name" />
        </el-form-item>
        <el-form-item label="用户姓名" prop="unitId">
          <el-input v-model="addForm.unitId" />
        </el-form-item>
        <el-form-item label="用户ID" prop="cadreCode">
          <el-input v-model="addForm.cadreCode" />
        </el-form-item>
        <el-form-item label="用户编码" prop="phone">
          <el-input v-model="addForm.phone" />
        </el-form-item>
        <el-form-item label="用户权限" prop="unitName">
          <template >
            <el-select v-model="addValue" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
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
      options: [{
        value: '1001',
        label: '普通用户'
      }, {
        value: '1002',
        label: '管理员用户'
      }, {
        value: '1003',
        label: '超级管理员用户'
      }],
      value: '',
      addValue: '',
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
        const data = `{
    "code": 1,
    "msg": "操作成功...",
    "map": {
        "list": [
            {
                "userId": 1001,
                "userName": "james1001",
                "realName": "james",
                "password": "12345",
                "code": "james1001",
                "roleId": 1001,
                "roleName": "普通用户"
            },
            {
                "userId": 1002,
                "userName": "harden",
                "realName": "harden",
                "password": "123456",
                "code": "harden123456",
                "roleId": 1002,
                "roleName": "管理员用户"
            },
            {
                "userId": 1003,
                "userName": "love",
                "realName": "love",
                "password": "12345",
                "code": "love123",
                "roleId": 1003,
                "roleName": "超级管理员用户"
            }
        ]
    }
}`
        const items = JSON.parse(data).map.list
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
