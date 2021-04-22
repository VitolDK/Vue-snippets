module.exports = {
  pwa: {
    manifestOptions: {
      icons: [
        {
          src: './icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
      ]
    }
  },
  chainWebpack: config => {
    /* Remove the default rule */
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    /* Custom SVG loader */
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap(options => {
        const newOptions = {
          symbolId: 'icon-[name]'
        };

        return { ...options, ...newOptions };
      })
      .end()
  }
}
