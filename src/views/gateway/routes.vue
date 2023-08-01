<template>
  <div class="p-4 bg-bg_color drop-shadow-lg rounded-lg">
    <div class="flex justify-end">
      <el-button type="primary" @click="handleAdd">创建 API</el-button>
    </div>
    <el-table :data="tableData" stripe>
      <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
      <!-- <el-table-column prop="id" label="ID" /> -->
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="path" label="路径" />
      <el-table-column prop="uri" label="URI" />
      <el-table-column prop="swaggerUrl" label="swaggerUrl" />
      <el-table-column prop="authType" label="鉴权类型" />
      <el-table-column label="操作" fixed="right" width="140px">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row.name)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialogTitle"
      append-to-body
      v-model="dialogConfig.visiable"
    >
      <el-form ref="$elForm" :model="dialogConfig.formData" label-width="100px">
        <!-- <el-form-item prop="id" required label="ID">
        <el-input v-model="dialogConfig.formData.id"
      /></el-form-item> -->
        <el-form-item prop="name" required label="名称">
          <el-input v-model="dialogConfig.formData.name"
        /></el-form-item>
        <el-form-item prop="path" required label="路径">
          <el-input v-model="dialogConfig.formData.path"
        /></el-form-item>
        <el-form-item prop="uri" required label="URI">
          <el-input v-model="dialogConfig.formData.uri"
        /></el-form-item>
        <el-form-item prop="swaggerUrl" required label="swaggerUrl">
          <el-input v-model="dialogConfig.formData.swaggerUrl"
        /></el-form-item>
        <el-form-item prop="authType" required label="鉴权类型">
          <el-radio-group v-model="dialogConfig.formData.authType">
            <el-radio label="NONE" border>无</el-radio>
            <el-radio label="REDIS" border>REDIS</el-radio>
            <el-radio label="RPC" border>RPC</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="flex justify-end">
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  type GatewayRoute,
  getGateWayRoutes,
  delGateWayRoute,
  addGateWayRoute,
  editGateWayRoute
} from '@/api/gateway'
import { message } from '@/utils/message'
import { cloneDeep } from '@pureadmin/utils'
import { ElMessageBox } from 'element-plus'
defineOptions({
  name: 'routes'
})
const tableData = ref([])

async function getTableData() {
  const res: GatewayRoute[] = await getGateWayRoutes()
  tableData.value = res
}

getTableData()

function getFormDefaultData() {
  return {
    path: null,
    name: null,
    uri: null,
    swaggerUrl: null,
    authType: 'NONE'
  }
}

const loading = ref(false)

const dialogConfig = reactive({
  type: 'add',
  visiable: false,
  formData: getFormDefaultData()
})

const dialogTitle = computed(() => {
  const map = {
    add: '创建API',
    edit: '修改API'
  }
  return map[dialogConfig.type]
})

// 重置 弹窗配置
function resetDialogConfig() {
  dialogConfig.visiable = false
  dialogConfig.formData = getFormDefaultData()
}

const $elForm = ref(null)
function handleAdd() {
  dialogConfig.type = 'add'
  dialogConfig.visiable = true
}
function handleEdit(row) {
  dialogConfig.type = 'edit'
  dialogConfig.formData = cloneDeep(row)
  dialogConfig.visiable = true
}

function handleSubmit() {
  // 避免重复提交
  if (loading.value || !dialogConfig.visiable) {
    return
  }
  $elForm.value?.validate().then(async () => {
    let fun: Function
    if (dialogConfig.type === 'edit') {
      fun = editGateWayRoute
    } else if (dialogConfig.type === 'add') {
      fun = addGateWayRoute
    }
    if (!fun) {
      return
    }
    loading.value = true
    try {
      await fun(dialogConfig.formData)
    } finally {
      loading.value = false
    }
    message(`${dialogTitle.value}成功`, { type: 'success' })
    getTableData()
    resetDialogConfig()
  })
}

async function handleDelete(name) {
  await ElMessageBox.confirm('确定要删除么？', 'Warning', {
    confirmButtonText: '是的',
    cancelButtonText: '不的',
    type: 'warning'
  })
  deleteRouteApi(name)
}
async function deleteRouteApi(name) {
  if (loading.value) {
    return
  }
  loading.value = true
  try {
    await delGateWayRoute(name)
  } finally {
    loading.value = false
  }
  getTableData()
  message('删除成功', { type: 'success' })
}
</script>
