<template>
  <el-config-provider :locale="currentLocale" :button="buttonConfig">
    <router-view />
    <ReDialog />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ReDialog } from '@/components/ReDialog'
export default defineComponent({
  name: 'app',
  data: () => ({
    buttonConfig: { autoInsertSpace: true }
  }),
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
    ReDialog
  },
  computed: {
    currentLocale() {
      return zhCn
    }
  }
})
</script>
