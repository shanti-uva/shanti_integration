module ShantiIntegration
  class Engine < ::Rails::Engine
    initializer :assets do |app|
      app.config.assets.paths << root.join('vendor', 'assets', 'images', 'jquery.draggable').to_s
      app.config.assets.paths << root.join('vendor', 'assets', 'images', 'shanti_sarvaka_theme').to_s
      app.config.assets.paths << root.join('vendor', 'assets', 'fonts').to_s
      app.config.assets.paths << root.join('vendor', 'assets', 'javascripts').to_s
      app.config.assets.precompile.concat(['shanti_sarvaka_theme/*', 'shanti_sarvaka_theme/extruder/extruder_blank.png'])
      app.config.assets.precompile.concat(['jquery.columnizer.min.js', 'jquery.draggable/*.gif','jquery.draggable/*.png'])
      app.config.assets.precompile.concat(["*.svg", "*.eot", "*.woff", "*.ttf"])
      app.config.assets.precompile.concat(['shanti_sarvaka_theme/favicons/favicon.ico', 'shanti_sarvaka_theme/favicons/favicon-196.png', 'shanti_sarvaka_theme/favicons/favicon-160.png', 'shanti_sarvaka_theme/favicons/favicon-96.png', 'shanti_sarvaka_theme/favicons/favicon-64.png', 'shanti_sarvaka_theme/favicons/favicon-32.png', 'shanti_sarvaka_theme/favicons/favicon-16.png', 'shanti_sarvaka_theme/favicons/favicon-152.png', 'shanti_sarvaka_theme/favicons/favicon-144.png', 'shanti_sarvaka_theme/favicons/favicon-120.png', 'shanti_sarvaka_theme/favicons/favicon-76.png', 'shanti_sarvaka_theme/favicons/favicon-72.png', 'shanti_sarvaka_theme/favicons/favicon-57.png', 'shanti_sarvaka_theme/favicons/browserconfig.xml'])
    end
  end
end
