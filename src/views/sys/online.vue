<template>
  <div class="p-4 bg-bg_color drop-shadow-lg rounded-lg">
    <el-table :data="tableConfig.data" stripe height="600">
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="nickName" label="用户昵称" />
      <el-table-column prop="dept" label="部门" />
      <el-table-column prop="ip" label="登录IP" />
      <el-table-column :show-overflow-tooltip="true" prop="address" label="登录地点" />
      <el-table-column prop="browser" label="浏览器" />
      <el-table-column prop="loginTime" label="登录时间" />
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
import { getSysLogs, SysLogRes } from '@/api/sys'
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
    params = { page: tableConfig.page - 1, size: tableConfig.size }
  }
  const res: SysLogRes = await getSysLogs(params)
  console.log(res)
  if (res.totalElements) {
    tableConfig.total = res.totalElements
  }
  tableConfig.data = res.content
}

getTableData()
</script>
