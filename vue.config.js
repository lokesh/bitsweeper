module.exports = {
  lintOnSave: true,
  publicPath: process.env.NODE_ENV === 'development'
    ? '/'
    : '/projects/bitsweeper/'
  // configureWebpack: {    
  //   output: {
  //       hashFunction: "sha256"
  //   }
  // }
}
