import { defineClientConfig } from '@vuepress/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import CustomComponent from './theme/components/Custom.vue'

// import './theme/styles/custom.css'

//客户端配置文件，你可以在这里扩展 VuePress 的功能，比如声明新的全局组件等

export default defineClientConfig({
  enhance({ app }) {
    // app.component('RepoCard', RepoCard)
    // app.component('CustomComponent', CustomComponent)
  },
})
