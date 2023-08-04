<template>
  <div class="p-4 bg-bg_color drop-shadow-lg rounded-lg">
    <el-table :data="tableConfig.data" stripe height="600">
      <el-table-column type="expand">
        <template #default="{ row }">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="请求方法">
              <span>{{ row.method }}</span>
            </el-form-item>
            <el-form-item label="请求参数">
              <span>{{ row.params }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="requestIp" label="IP" />
      <el-table-column :show-overflow-tooltip="true" prop="address" label="IP来源" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="browser" label="浏览器" />
      <el-table-column prop="time" label="请求耗时" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.time <= 300">{{ row.time }}ms</el-tag>
          <el-tag v-else-if="row.time <= 1000" type="warning">{{ row.time }}ms</el-tag>
          <el-tag v-else type="danger">{{ row.time }}ms</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="180px" />

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
