<template>
  <Layout>
    <!-- <template #doc-footer-before>
      <ClientOnly>
        before
      </ClientOnly>
    </template>
    <template #doc-after>
      after
    </template>
    <template #layout-bottom>
      bottom
    </template> -->
  </Layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
const { Layout } = DefaultTheme
const { page, theme, frontmatter } = useData()

</script>

<style scoped>
</style>