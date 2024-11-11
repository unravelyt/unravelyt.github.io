import {webpackBundler} from '@vuepress/bundler-webpack'
import {defineUserConfig} from 'vuepress'
import {plumeTheme} from 'vuepress-theme-plume'
import {baiduAnalyticsPlugin} from '@vuepress/plugin-baidu-analytics'


//为 VuePress 配置文件，在这里进行一个必要的配置，比如 主题、插件、构建工具等。
export default defineUserConfig({
    port: 8090,
    base: '/',
    lang: 'zh-CN',
    title: 'Unravely',
    description: '哈哈哈哈嘻嘻嘻嘻',
    head: [
        // 设置 favor.ico，.vuepress/public 下
        [
            'link', {rel: 'icon', href: 'logoY.webp'}
        ],
    ],

    plugins: [
        //百度统计插件
        baiduAnalyticsPlugin({
            id: "53242c018d62786ff7244610783daec5",
        }),
    ],

    bundler: webpackBundler(),

    theme: plumeTheme({
        // 添加您的部署域名
        hostname: 'https://www.unravely.press',

        blog: {
            // 全局 文章封面图，布局位置
            // postCover: 'left', // 'left' | 'right' | 'odd-left' | 'odd-right' | 'top'
            postCover: {
                // url: '/images/bg_eye_white.jpg',
                layout: 'odd-left',
                // ratio: '16:9',
                // width: 300,
                compact: true
            }
        },

        plugins: {

            //搜索
            search: {
                // more options
            },

            /**
             * Shiki 代码高亮
             * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
             */
            shiki: {
                // 强烈建议预设代码块高亮语言，插件默认加载所有语言会产生不必要的时间开销
                languages: ["xml", "java", "dockerfile", "abap", "js", "ts", "html", "css", 'shell', 'bash', 'typescript', 'javascript'],
            },

            /**
             * markdown enhance
             * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
             */
            markdownEnhance: {
                demo: true,
                //   include: true,
                //   chart: true,
                //   echarts: true,
                //   mermaid: true,
                //   flowchart: true,
            },

            /**
             *  markdown power
             * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
             */
            // markdownPower: {
            //   pdf: true,
            //   caniuse: true,
            //   plot: true,
            //   bilibili: true,
            //   youtube: true,
            //   icons: true,
            //   codepen: true,
            //   replit: true,
            //   codeSandbox: true,
            //   jsfiddle: true,
            //   repl: {
            //     go: true,
            //     rust: true,
            //     kotlin: true,
            //   },
            // },

            /**
             * 评论 comments
             * @see https://theme-plume.vuejs.press/guide/features/comments/
             */
            // comment: {
            //   provider: '', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
            //   comment: true,
            //   repo: '',
            //   repoId: '',
            //   categoryId: '',
            //   mapping: 'pathname',
            //   reactionsEnabled: true,
            //   inputPosition: 'top',
            // },
        },
    }),
})
