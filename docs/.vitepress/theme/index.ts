import DefaultTheme from 'vitepress/theme';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import { toRefs } from "vue";

export default {
...DefaultTheme,
enhanceApp(ctx) {
DefaultTheme.enhanceApp(ctx);
},
setup() {
const { frontmatter } = toRefs(useData());
const route = useRoute();

        giscusTalk({
            repo: 'QingHeSite/blogDev',
            repoId: 'R_kgDOMyS2Zg',
            category: 'Announcements', // 或其他分类
            categoryId: 'DIC_kwDOMyS2Zs4CigsA',
            mapping: 'pathname',
            inputPosition: 'top',
            lang: 'zh-CN',
            lightTheme: 'light',
            darkTheme: 'dark',
            dataLoad: 'lazy'
        }, {
            frontmatter,
            route
        }, true);
    }
};