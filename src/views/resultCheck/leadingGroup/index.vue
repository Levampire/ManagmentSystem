<template>
  <div class="app-container">
    <!--检索-->
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="单位编码" style="width: 200px; padding: 0 5px 0 5px"   class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.title" placeholder="单位名称" style="width: 200px;padding: 0 5px 0 5px" class="filter-item"  @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter"  style="float: right">
        Search
      </el-button>
    </div>
    <!--表格-->
    <el-table
      v-loading="listLoading"
      :data="list.info"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="单位编码" width="180">
        <template slot-scope="scope">
          {{ scope.row.unitCode }}
        </template>
      </el-table-column>
      <el-table-column label="单位名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位等级" width="180px" align="center">
        <template slot-scope="scope">
          {{ [scope.row.level===1?'一级单位':'二级单位'].toString() }}
        </template>
      </el-table-column>
      <el-table-column width="150px" label="考核详情" align="center" >
          <div  @click="dialogFormVisible=true">考核详情</div>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap.title" :visible.sync="dialogFormVisible">
      <el-table
        :data="list.detail"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="考核名称"  align="center">
          <template slot-scope="scope">
            {{ scope.row.examineName }}
          </template>
        </el-table-column>
        <el-table-column align="center"  label="考核权重" >
          <template slot-scope="scope">
            <span>{{ scope.row.weight }}</span>
          </template>
        </el-table-column>
        <el-table-column label="考核得分"  align="center">
          <template slot-scope="scope">
            {{ parseFloat(scope.row.points).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column width="150px" label="日常考核详情" align="center">
          <router-link :to="'/leadingGroupDetail/'" slot-scope="scope" class="link-type">
            <span v-if="scope.row.examineName==='日常考核'" >查看详情</span>
          </router-link>
        </el-table-column>
        </el-table>
    </el-dialog>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>
  </div>
</template>

<script>
import {getList} from '@/api/table'
import Pagination from '@/components/Pagination'

export default {
  components: {Pagination},
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
      list: {
        info: {},
        detail: {}
      },
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        title: '考核详情'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        const data = `{
    "code":1,
    "msg":"操作成功...",
    "map":{
        "pageInfo":{
            "pageNum":1,
            "pageSize":5,
            "size":5,
            "startRow":1,
            "endRow":5,
            "total":11,
            "pages":3,
            "list":[
                {
                    "unitId":1001,
                    "name":"计算机科学学院",
                    "unitCode":"SWPU1001",
                    "level":2,
                    "yearCountPoints":null,
                    "yearExamineLevel":null,
                    "dailyCountPoints":null
                },
                {
                    "unitId":1002,
                    "name":"电气信息学院",
                    "unitCode":"SWPU1002",
                    "level":2,
                    "yearCountPoints":null,
                    "yearExamineLevel":null,
                    "dailyCountPoints":null
                },
                {
                    "unitId":1003,
                    "name":"化学化工学院",
                    "unitCode":"SWPU1003",
                    "level":2,
                    "yearCountPoints":null,
                    "yearExamineLevel":null,
                    "dailyCountPoints":null
                },
                {
                    "unitId":1004,
                    "name":"石油与天然气工程学院",
                    "unitCode":"SWPU1004",
                    "level":2,
                    "yearCountPoints":null,
                    "yearExamineLevel":null,
                    "dailyCountPoints":null
                },
                {
                    "unitId":1005,
                    "name":"宣传部",
                    "unitCode":"SWPU1005",
                    "level":1,
                    "yearCountPoints":null,
                    "yearExamineLevel":null,
                    "dailyCountPoints":null
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
        const score = `{
    "code":1,
    "msg":"操作成功...",
    "map":{
        "detail":[
            {
                "groupId":null,
                "examineName":"日常考核",
                "unitId":1001,
                "weight":0.2,
                "points":88.69999999999999
            },
            {
                "groupId":null,
                "examineName":"单位考核",
                "unitId":1001,
                "weight":0.3,
                "points":"90.0"
            },
            {
                "groupId":null,
                "examineName":"班子年度考核",
                "unitId":1001,
                "weight":0.5,
                "points":"70.0"
            }
        ]
    }
}`
        this.list.info = JSON.parse(data).map.pageInfo.list
        this.list.detail = JSON.parse(score).map.detail
        console.log(this.list)
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // handleCreate() {
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // }
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
.btn_detail{
  cursor: default;
  background-color:transparent;
  border: none;
}
.pagination {
  background-color: #20a0ff;
  height: 80px;
  width: 100%;
}
</style>
