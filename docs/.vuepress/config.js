// .vuepress/config.js

module.exports = {
  // 网站 Title
  title: 'My Blog',

  // 网站描述
  description: 'This is my blog',

  // 网站语言
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },

  // 使用的主题
  theme: 'vuepress-theme-meteorlxy',

  // 主题配置
  themeConfig: {
    // 个人信息（没有或不想设置的，删掉对应字段即可）
    personalInfo: {
      // 昵称
      nickname: 'Cz朔风',

      // 个人简介
      description: 'Happy Coding<br/>Happy Life',

      // 电子邮箱
      email: 'wzqjet@gmail.com',

      // 所在地
      location: 'Hangzhou City, China',

      // 组织
      organization: 'Fiberhome',

      // 头像
      avatar: 'https://www.meteorlxy.cn/assets/img/avatar.jpg',

      // 社交平台帐号信息
      sns: {
        // Github 帐号和链接
        github: {
          account: 'wzqjet',
          link: 'https://github.com/wzqjet',
        },
        // 新浪微博 帐号和链接
        weibo: {
          account: '@Cz朔风',
          link: 'https://weibo.com/u/5713094554',
        },
      },
    },

    // 上方 header 的背景，可以使用图片，或者随机变化的图案
    headerBackground: {
      // 使用图片的 URL，如果设置了图片 URL，则不会生成随机变化的图案，下面的 useGeo 将失效
      url: '/assets/img/bg.jpg',

      // 使用随机变化的图案，如果设置为 false，且没有设置图片 URL，将显示为纯色背景
      useGeo: true,
    },

    // 是否显示文章的最近更新时间
    lastUpdated: true,

    // 顶部导航栏内容
    nav: [
      { text: 'Home', link: '/', exact: true },
      { text: 'Posts', link: '/posts/', exact: false },
    ],

    // 评论配置，参考下方 [页面评论] 章节
    comments: {
      owner: 'meteorlxy',
      repo: 'vuepress-theme-meteorlxy',
      clientId: 'MY_CLIENT_ID',
      clientSecret: 'MY_CLIENT_SECRET',
    },
  },
}