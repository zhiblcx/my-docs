import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/demo/': [
    '',
    {
      text: 'Markdown',
      icon: 'fab fa-markdown',
      prefix: 'demo/',
      link: 'markdown/'
    },
    {
      text: 'Node.js',
      icon: 'fab fa-node-js',
      prefix: 'demo/',
      link: 'node/'
    }
  ],
  '/demo/markdown/': 'structure',
  '/demo/node/': 'structure',
  '/blog/': 'structure',
  '/': [
    '',
    {
      text: '如何使用',
      icon: 'laptop-code',
      prefix: 'demo/',
      link: 'demo/',
      children: 'structure'
    }
  ]
})
