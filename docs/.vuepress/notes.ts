import {defineNoteConfig, defineNotesConfig} from 'vuepress-theme-plume'

const noteJava = defineNoteConfig({
    // 声明笔记的目录，相对于 `notes.dir`，这里表示 `notes/java` 目录
    dir: 'note_java',
    // 声明笔记的链接前缀，与 `notes.link` 拼接，这里表示 `/typescript/`
    // 笔记内的所有文章会以 `/typescript/` 作为访问链接前缀。
    link: '/note_java/',
    // 配置 笔记侧边导航栏，用于导航向笔记内的所有文档，声明为`auto`的，将根据目录结构自动生成侧边栏导航
    sidebar: 'auto'
})

const noteLinux = defineNoteConfig({
    dir: 'note_linux',
    link: '/note_linux/',
    sidebar: 'auto'
})

const noteFront = defineNoteConfig({
    dir: 'note_front',
    link: '/note_front/',
    sidebar: 'auto'
})

const noteDatabase = defineNoteConfig({
    dir: 'note_database',
    link: '/note_database/',
    sidebar: 'auto'
})

const noteDocker = defineNoteConfig({
    dir: 'note_docker',
    link: '/note_docker/',
    sidebar: 'auto'
})

const noteGit = defineNoteConfig({
    dir: 'note_git',
    link: '/note_git/',
    sidebar: 'auto'
})

const noteMaven = defineNoteConfig({
    dir: 'note_maven',
    link: '/note_maven/',
    sidebar: 'auto'
})

const noteNginx = defineNoteConfig({
    dir: 'note_nginx',
    link: '/note_nginx/',
    sidebar: 'auto'
})


const noteElk = defineNoteConfig({
    dir: 'note_elk',
    link: '/note_elk/',
    sidebar: 'auto'
})

export const notes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [
        // 每个笔记都是 `notes` 数组中的一个对象
        noteLinux, noteJava, noteFront, noteDatabase, noteDocker, noteNginx, noteMaven, noteGit, noteElk
    ]
})
