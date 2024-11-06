import {defineNavbarConfig} from 'vuepress-theme-plume'


export const navbar = defineNavbarConfig([
    {text: '首页', link: '/', icon: 'mdi-light:home'},
    {text: '博客', link: '/blog/', icon: 'mdi:text-box-outline'},
    // {text: '标签', link: '/blog/tags/', icon: 'ion:pricetags-outline'},
    // {text: '分类', link: '/blog/categories/', icon: 'ant-design:folder-open-outlined'},
    // {text: '归档', link: '/blog/archives/', icon: 'mdi:archive-outline'},
    {
        text: '笔记', icon: 'ant-design:solution-outlined',
        items: [
            {text: 'Java', link: '/notes/code/README.md'},
            {text: 'Linux', link: '/notes/linux/README.md'}
        ]
    },
    {text: '关于', link: '/about/', icon: 'mdi:person-circle-outline'},

])
