<template>
  <GenericPage 
    tab-key="hxcn"
    :show-header="true"
    :custom-title="pageTitle"
    :custom-subtitle="currentTime"
  >
    <!-- 可以在这里添加特定于首页的额外内容 -->
    <template v-if="fastLink" #extra-content>
      <div class="fast-link-section">
        <a :href="fastLink" class="fast-link liquidGlass-wrapper">
          <div class="liquidGlass-effect"></div>
          <div class="liquidGlass-tint"></div>
          <div class="liquidGlass-shine"></div>
          <div class="liquidGlass-text">
            <IconRocket :size="20" />
            <span>快速访问</span>
          </div>
        </a>
      </div>
    </template>
  </GenericPage>
</template>

<script>
import GenericPage from '../components/GenericPage.vue'
import configManager from '../config/configManager.js'
import { IconRocket } from '@tabler/icons-vue'

export default {
  name: 'Home',
  components: {
    GenericPage,
    IconRocket
  },
  data() {
    return {
      currentTime: '',
      timeInterval: null
    }
  },
  computed: {
    pageTitle() {
      const appConfig = configManager.getAppConfig()
      return appConfig.title || '萑澈起始页'
    },
    
    fastLink() {
      const appConfig = configManager.getAppConfig()
      return appConfig.fastlink
    }
  },
  
  async mounted() {
    // 确保配置已加载
    if (!configManager.getConfig()) {
      await configManager.loadConfig()
    }
    
    // 更新时间显示
    this.updateTime()
    this.timeInterval = setInterval(() => {
      this.updateTime()
    }, 1000)
  },
  
  beforeUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
  },
  
  methods: {
    updateTime() {
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }
      this.currentTime = new Date().toLocaleDateString('zh-CN', options)
    }
  }
}
</script>

<style scoped>
.fast-link-section {
  text-align: center;
  margin-top: 1rem;
}

.fast-link {
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  color: white;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.fast-link:hover {
  padding: 15px 30px;
  border-radius: 30px;
  transform: translateY(-2px);
}
</style>
