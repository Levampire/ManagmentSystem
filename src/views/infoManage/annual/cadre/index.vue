<template>
  <div class="app-container">
    <!--检索-->
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="干部编号"
        style="width: 200px; padding: 0 5px 0 5px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.title"
        placeholder="干部编码"
        style="width: 200px;padding: 0 5px 0 5px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.title"
        placeholder="姓名"
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
      <el-table-column align="center" label="干部编号">
        <template v-if="!editing" slot-scope="scope">
          {{ scope.row.cadreId }}
        </template>
      </el-table-column>
      <el-table-column label="干部编码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cadreCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="详情" width="200" align="center">
        <router-link :to="'/infoMaintain/daily/dailyCadreDetail'" class="link-type">
          <span>查看详情</span>
        </router-link>
      </el-table-column>
      <el-table-column label="删除" align="center" width="280">
        <template slot-scope="{row,$index}">
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
    <!--添加干部弹窗-->
    <el-dialog :title="textMap.title" :visible.sync="dialogFormVisible">
      <div class="id">员工ID: 10001</div>
      <el-form ref="addForm" :model="addForm" label-width="750px" :rules="rules" label-position="left">
        <el-form-item label="理想是否坚定:" prop="name">
          <el-input v-model="addForm.name" type="number" maxlength="3" />
        </el-form-item>
        <el-form-item label="严守党的政治纪律:" prop="unitId">
          <el-input v-model="addForm.unitId" type="number" maxlength="3" />
        </el-form-item>
        <el-form-item label="参加政治学习:" prop="cadreCode">
          <el-input v-model="addForm.cadreCode" type="number" maxlength="3" />
        </el-form-item>
        <el-form-item label="执行民主集中制度:" prop="phone">
          <el-input v-model="addForm.phone" type="number" maxlength="3" />
        </el-form-item>
        <el-form-item label="履行岗位职责情况:" prop="email">
          <el-input v-model="addForm.email" type="number" maxlength="3" />
        </el-form-item>
        <el-form-item label="重大事件态度:" prop="position">
          <el-input v-model="addForm.position" type="number" maxlength="3" />
        </el-form-item>
        <el-form-item label="推动本单位学校改革:" prop="unitName">
          <el-input v-model="addForm.unitName" type="number" maxlength="3" />
        </el-form-item>
        <el-form-item label="履行党风建设:" prop="unitName">
          <el-input v-model="addForm.unitName" type="number" maxlength="3" />
        </el-form-item>
        <el-form-item label="主管领域干部廉洁:" prop="unitName">
          <el-input v-model="addForm.unitName" type="number" maxlength="3" />
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
  </div></template>

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
    const validatePass = (rule, value, callback) => {
      if (value > 100) {
        callback(new Error(' '))
      }
    }
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
        title: '添加干部考核'
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
          { required: true, message: ' ', trigger: 'change' },
          { min: 1, max: 3, message: ' ', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        unitId: [
          { required: true, message: ' ', trigger: 'change' },
          { min: 1, max: 3, message: ' ', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        cadreCode: [
          { required: true, message: ' ', trigger: 'change' },
          { min: 1, max: 3, message: ' ', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: ' ', trigger: 'change' },
          { min: 1, max: 3, message: ' ', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        email: [
          { required: true, message: ' ', trigger: 'change' },
          { min: 1, max: 3, message: ' ', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        position: [
          { required: true, message: ' ', trigger: 'change' },
          { min: 1, max: 3, message: ' ', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        unitName: [
          { required: true, message: ' ', trigger: 'change' },
          { min: 1, max: 3, message: ' ', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
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
    "code":1,
    "msg":"操作成功...",
    "map":{
        "pageInfo":{
            "pageNum":1,
            "pageSize":10,
            "size":10,
            "startRow":1,
            "endRow":10,
            "total":33,
            "pages":4,
            "list":[
                {
                    "cadreId":1001,
                    "name":"Luke",
                    "unitId":1001,
                    "cadreCode":"Luke1001",
                    "phone":"10086",
                    "email":"10086@qq.com",
                    "gender":true,
                    "birthday":"1990-01-01",
                    "position":"院长",
                    "leaderId":null,
                    "unitName":null,
                    "points":null,
                    "level":null
                },
                {
                    "cadreId":1002,
                    "name":"Holly",
                    "unitId":1001,
                    "cadreCode":"Holly1002",
                    "phone":"10086",
                    "email":"10086@qq.com",
                    "gender":false,
                    "birthday":"1991-01-01",
                    "position":"副院长",
                    "leaderId":1001,
                    "unitName":null,
                    "points":null,
                    "level":null
                },
                {
                    "cadreId":1003,
                    "name":"Eli",
                    "unitId":1001,
                    "cadreCode":"Eli1003",
                    "phone":"1008611",
                    "email":"1008611@qq.com",
                    "gender":true,
                    "birthday":"1990-02-11",
                    "position":"办公室主任",
                    "leaderId":1001,
                    "unitName":null,
                    "points":null,
                    "level":null
                },
                {
                    "cadreId":1004,
                    "name":"Wood",
                    "unitId":1002,
                    "cadreCode":"Wood1004",
                    "phone":"10010",
                    "email":"10010@163.com",
                    "gender":true,
                    "birthday":"1990-02-19",
                    "position":"院长",
                    "leaderId":null,
                    "unitName":null,
                    "points":null,
                    "level":null
                },
                {
                    "cadreId":1005,
                    "name":"Rex",
                    "unitId":1002,
                    "cadreCode":"Rex1005",
                    "phone":"10010",
                    "email":"10010@163.com",
                    "gender":true,
                    "birthday":"1991-02-03",
                    "position":"副院长",
                    "leaderId":1004,
                    "unitName":null,
                    "points":null,
                    "level":null
                },
                {
                    "cadreId":1006,
                    "name":"Drew",
                    "unitId":1002,
                    "cadreCode":"Drew1006",
                    "phone":"10011",
                    "email":"10011@163.com",
                    "gender":false,
                    "birthday":"1980-10-10",
                    "position":"办公室主任",
                    "leaderId":1004,
                    "unitName":null,
                    "points":null,
                    "level":null
                },
                {
                    "cadreId":1007,
                    "name":"Black",
                    "unitId":1003,
                    "cadreCode":"Black1007",
                    "phone":"10000",
                    "email":"10000@qq.com",
                    "gender":true,
                    "birthday":"1990-02-02",
                    "position":"院长",
                    "leaderId":null,
                    "unitName":null,
                    "points":null,
                    "level":null
                },
                {
                    "cadreId":1008,
                    "name":"Leo",
                    "unitId":1003,
                    "cadreCode":"Leo1008",
                    "phone":"1008",
                    "email":"1008@qq.com",
                    "gender":true,
                    "birthday":"1970-01-06",
                    "position":"副院长",
                    "leaderId":1007,
                    "unitName":null,
                    "points":null,
                    "level":null
                },
                {
                    "cadreId":1009,
                    "name":"Egan",
                    "unitId":1003,
                    "cadreCode":"Egan1009",
                    "phone":"1009",
                    "email":"1009@qq.com",
                    "gender":false,
                    "birthday":"1980-06-01",
                    "position":"办公室主任",
                    "leaderId":1007,
                    "unitName":null,
                    "points":null,
                    "level":null
                },
                {
                    "cadreId":1010,
                    "name":"Zoe",
                    "unitId":1004,
                    "cadreCode":"Zoe1010",
                    "phone":"1010",
                    "email":"1010@qq.com",
                    "gender":false,
                    "birthday":"1990-01-02",
                    "position":"院长",
                    "leaderId":null,
                    "unitName":null,
                    "points":null,
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
        this.list = JSON.parse(data).map.pageInfo.list
        this.total = JSON.parse(data).map.pageInfo.total
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
        this.$refs['addForm'].resetFields()
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
            message: '请检查填写内容',
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
.id{
  margin-left: 5px;
  font-size: 18pt;
  font-weight: bolder;
  height: 50px;
}

</style>
