<template>
  <div class="page-container">
    <div class="content-grid">
      <CategoryCard 
        v-for="category in homeTab.categories"
        :key="category.name"
        :category="category"
      />
    </div>
  </div>
</template>

<script>
import CategoryCard from '../components/CategoryCard.vue'
import { default_config } from '../config/index.js'

export default {
  name: 'Home',
  components: {
    CategoryCard
  },
  computed: {
    homeTab() {
      return default_config.tabs.find(tab => tab.name === '萑澈') || { categories: [] }
    }
  }
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.content-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-container {
    padding: 0.5rem;
  }
  
  .content-grid {
    gap: 1.5rem;
  }
}
</style>
