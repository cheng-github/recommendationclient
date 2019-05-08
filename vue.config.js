var path = require('path');

module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/index/main.js',
      // the source template
      template: 'public/login_init.html',
      // output as dist/index.html
      filename: 'login.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Login Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
    newslist: {
      entry: "src/newslist/main.js",
      template: "public/newslist_init.html",
      filename: "newslist.html",
      title: "NewsList Page",
      chunks: ["chunk-vendors", "chunk-common", "newslist"]
    },
    
    newscontent: {
      entry: "src/newscontent/main.js",
      template: "public/newscontent_init.html",
      filename: "newscontent.html",
      title: "NewsContent Page",
      chunks: ["chunk-vendors", "chunk-common", "newscontent"]
    }
    
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000
  },
  assetsDir: "common",
  configureWebpack: {
    mode: 'development'
  }
}