import { markdown } from "./markdown";
import { sidebar } from "./sidebar";

export default {
  title: "智慧星球",
  description: "记录学习，记录成长",
  head: [["link", { rel: "icon", href: "/k-blog/favicon.ico" }]],
  base: "/k-blog/",
  themeConfig: {
    siteTitle: "智慧星球",
    logo: "/logo.png",
    markdown,
    sidebar,
    outline: "deep", // 右侧大纲标题层级
    outlineTitle: "目录", // 右侧大纲标题文本配置
    outlineBadges: false, // 是否在大纲中显示 Badge 文本
    lastUpdatedText: "最后更新", // 最后更新时间文本配置, 需先配置lastUpdated为true
    // 文档页脚文本配置
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    // 编辑链接配置
    editLink: {
      pattern: "https://github.com/kun771447/k-blog.git",
      text: "不妥之处，敬请雅正",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/kun771447/k-blog.git" },
    ],
  },
};
