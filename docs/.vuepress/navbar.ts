import {defineNavbarConfig} from 'vuepress-theme-plume'


export const navbar = defineNavbarConfig([
    {text: '首页', link: '/', icon: 'ion:home'},
    {text: '博客', link: '/blog/', icon: 'line-md:sun-rising-filled-loop'},
    // {text: '标签', link: '/blog/tags/', icon: 'ion:pricetags-outline'},
    // {text: '分类', link: '/blog/categories/', icon: 'ant-design:folder-open-outlined'},
    // {text: '归档', link: '/blog/archives/', icon: 'fa-solid:archive'},
    {
        text: '笔记', icon: 'fa:book',
        items: [
            {text: 'Java', link: '/notes/note_java/README.md'},
            {text: 'Linux', link: '/notes/note_linux/README.md'}
        ]
    },
    {text: '链接', link: '/links/', icon: 'streamline:web-solid'},
    {text: '关于', link: '/about/', icon: 'octicon:feed-person-16'},

])
