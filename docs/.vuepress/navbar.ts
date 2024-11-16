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
            {text: 'Java', link: '/notes/note_java/README.md', icon: 'devicon:java'},
            {text: 'Linux', link: '/notes/note_linux/README.md', icon: 'skill-icons:linux-light'},
            {text: 'database', link: '/notes/note_database/README.md', icon: 'icon-park:data'},
            {text: 'docker', link: '/notes/note_docker/README.md', icon: 'skill-icons:docker'},
            {text: 'Maven', link: '/notes/note_maven/README.md', icon: 'devicon:maven'},
            {text: 'Git', link: '/notes/note_git/README.md', icon: 'skill-icons:git'},
            {text: 'Nginx', link: '/notes/note_nginx/README.md', icon: 'skill-icons:nginx'},
            {text: '前端', link: '/notes/note_front/README.md', icon: 'devicon:webpack'},
            {text: 'ELK', link: '/notes/note_elk/README.md', icon: 'vscode-icons:file-type-elastic'},

        ]
    },
    {text: '链接', link: '/links/', icon: 'streamline:web-solid'},
    {text: '关于', link: '/about/', icon: 'octicon:feed-person-16'},

])
