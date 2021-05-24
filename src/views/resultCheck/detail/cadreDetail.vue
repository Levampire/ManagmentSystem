<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="考核层面" width="95">
        <template slot-scope="scope">
          {{ scope.row.levelName }}
        </template>
      </el-table-column>

      <el-table-column label="校领导测评" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.schoolLeader.toFixed(1) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务对象测评" align="center">
        <template slot-scope="scope">
          {{ scope.row.serviceObject }}
        </template>
      </el-table-column>
      <el-table-column label="本单位测评" align="center">
        <template slot-scope="scope">
          {{ scope.row.thisUnit }}
        </template>
      </el-table-column>
      <el-table-column label="干部日常考核" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.cadreExamine }}
        </template>
      </el-table-column>
      <el-table-column label="单位考核" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.unitExamine.toFixed(1) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="干部学习" width="200">
        <template slot-scope="scope">
          {{ scope.row.studyAchievement }}
        </template>
      </el-table-column>
      <el-table-column label="总分" align="center" width="110">
        <template slot-scope="scope">
          {{ scope.row.pointsSum }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="考核评级" width="110">
        <template slot-scope="scope">
          <el-tag>{{ [scope.row.pointsSum < 90?[scope.row.pointsSum < 80?[scope.row.pointsSum<70?'不合格':'良好']:'合格']:'优秀' ].toString()}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" label="日常考核详情" align="center">
        <template>
          <router-link :to="'/cadreDailyDetail/'" class="link-type">
            <span>查看详情</span>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { leveldetail } from '@/api/request'
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
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // leveldetail(this.id).then(response => {
      //   this.list = response.map.detail
      // })
      getList().then(response => {
        const data = `{
    "code":1,
    "msg":"操作成功...",
    "map":{
        "detail":[
            {
                "levelId":1001,
                "cadreId":1001,
                "unitId":1001,
                "schoolLeader":17.8,
                "thisUnit":39.2,
                "serviceObject":"9.0",
                "unitExamine":13.304999999999998,
                "examineId":1001,
                "cadreExamine":8.03,
                "studyAchievement":4.5,
                "levelName":"学院",
                "pointsSum":"92.0"
            },
            {
                "levelId":1002,
                "cadreId":1001,
                "unitId":1001,
                "schoolLeader":17.8,
                "thisUnit":31.6,
                "serviceObject":"9.0",
                "unitExamine":13.304999999999998,
                "examineId":1002,
                "cadreExamine":8.03,
                "studyAchievement":"5.0",
                "levelName":"机关",
                "pointsSum":"85.0"
            },
            {
                "levelId":1003,
                "cadreId":1001,
                "unitId":1001,
                "schoolLeader":15.600000000000001,
                "thisUnit":"32.0",
                "serviceObject":"9.0",
                "unitExamine":13.304999999999998,
                "examineId":1003,
                "cadreExamine":8.03,
                "studyAchievement":4.5,
                "levelName":"直属单位",
                "pointsSum":"82.0"
            }
        ]
    }
}`
        this.list = JSON.parse(data).map.detail
        console.log(this.list)
        this.listLoading = false
      })
    }
  }
}
</script>

