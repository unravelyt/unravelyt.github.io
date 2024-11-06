import {defineThemeConfig} from 'vuepress-theme-plume'
import {navbar} from './navbar'
import {notes} from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */

// 主题配置文件，由于每次修改 .vuepress/config.ts，都需要重启 VuePress 服务，然而实际上大多数时候都不需要这么做。
// 主题将不需要重启服务的配置移动到了这里。在这里修改配置时，仅通过热更新的方式更新主题。

export default defineThemeConfig({
    //导航logo /docs/.vuepress/public/logoY.webp
    logo: 'logoY.webp',
    // your git repo url
    docsRepo: '',
    docsDir: 'docs',
    appearance: true,
    profile: {
        //头像链接地址avatar_sby.webp
        avatar: 'avatar_spider.webp',
        name: 'yutong',
        description: '阳光正好，微风不燥',
        // 是否显示为圆形头像
        circle: true,
        // location: '',
        // organization: '',
    },
    navbar,
    notes,
    social: [
        {icon: 'github', link: '/'},
    ],


})
