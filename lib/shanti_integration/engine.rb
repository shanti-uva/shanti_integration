module ShantiIntegration
  class Engine < ::Rails::Engine
    initializer :assets do |config|
      Rails.application.config.assets.paths << root.join('vendor', 'assets', 'images', 'shanti_sarvaka_theme').to_s
      Rails.application.config.assets.paths << root.join('vendor', 'assets', 'fonts').to_s
      Rails.application.config.assets.paths << root.join('vendor', 'assets', 'javascripts').to_s
      Rails.application.config.assets.precompile.concat(['shanti_sarvaka_theme/*','jquery.columnizer.min.js'])
      Rails.application.config.assets.precompile.concat([/\.(?:svg|eot|woff|woff2|ttf)\z/])
      Rails.application.config.assets.precompile += %w( shanti_sarvaka_theme/extruder/extruder_blank.png )
    end
  end
end
