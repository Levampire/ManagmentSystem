<template>
  <div class="app-container">
<!--检索-->
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="姓名" style="width: 200px; padding: 0 5px 0 5px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.title" placeholder="单位" style="width: 200px;padding: 0 5px 0 5px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.title" placeholder="职位" style="width: 200px;padding: 0 5px 0 5px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.title" placeholder="电话" style="width: 200px;padding: 0 5px 0 5px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="float: right">
        Search
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
      <el-table-column label="姓名" width="110">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="单位名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" align="center">
        <template slot-scope="scope">
          {{ scope.row.position }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="电话" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column min-width="30px" label="考核结果" align="center">
        <template>
          <router-link :to="'/cadreDetail/'" class="link-type">
            <span>查看详情</span>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
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
      total: 0,
      listQuery: {
        pageNumber: 1
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
        this.listLoading = true
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
.pagination{
  background-color: #20a0ff;
  height: 80px;
  width: 100%;
}
</style>
