import {defineNoteConfig, defineNotesConfig} from 'vuepress-theme-plume'

const javaNote = defineNoteConfig({
    // 声明笔记的目录，相对于 `notes.dir`，这里表示 `notes/java` 目录
    dir: 'code',
    // 声明笔记的链接前缀，与 `notes.link` 拼接，这里表示 `/typescript/`
    // 笔记内的所有文章会以 `/typescript/` 作为访问链接前缀。
    link: '/code/',
    // 配置 笔记侧边导航栏，用于导航向笔记内的所有文档
    // 声明为 `auto` 的，将根据目录结构自动生成侧边栏导航
    sidebar: 'auto'
})


const linuxNote = defineNoteConfig({
    dir: 'linux',
    link: '/linux/',
    sidebar: 'auto'
})


export const notes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [
        // 每个笔记都是 `notes` 数组中的一个对象
        linuxNote, javaNote
    ]
})
