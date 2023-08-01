<template>
  <div class="p-4 bg-bg_color drop-shadow-lg rounded-lg">
    <el-table :data="tableConfig.data" stripe height="600">
      <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
      <el-table-column prop="targetServer" label="目标服务" />
      <el-table-column
        prop="requestMethod"
        label="Method"
        width="100"
      >
        <template #default="{ row }">
          <el-tag>{{ row.requestMethod }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="requestPath" label="地址" />
      <el-table-column prop="requestBody" label="请求体" />
      <el-table-column
        prop="status"
        label="Status"
        width="100"
      >
        <template #default="{ row }">
          <el-tag :type="row.status >=400 ? 'danger' : 'success'">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="responseData"
        label="响应数据"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column prop="ip" label="IP" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="requestTime" label="请求时间" />
      <el-table-column prop="executeTime" label="花费时间（ms）" />
    </el-table>
    <div class="flex justify-end p-4 mt-1 border-t-1">
      <el-pagination
        :current-page="tableConfig.page"
        :page-size="tableConfig.size"
        :page-sizes="[20, 50, 100]"
        small
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableConfig.total"
        @size-change="handleChangePage('size', $event)"
        @current-change="handleChangePage('page', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type GateWayLogRes, getGateWayLogs } from '@/api/gateway'
defineOptions({
  name: 'logs'
})

const tableConfig = reactive({
  data: [],
  page: 1,
  size: 20,
  total: 0
})

const handleChangePage = (key, value) => {
  tableConfig[key] = value
  getTableData()
}

const getTableData = async (params?) => {
  if (!params) {
    params = { page: tableConfig.page, size: tableConfig.size }
  }
  const res: GateWayLogRes = await getGateWayLogs(params)
  console.log(res)
  if (res.totalElements) {
    tableConfig.total = res.totalElements
  }
  tableConfig.data = res.content
}

getTableData()
</script>
