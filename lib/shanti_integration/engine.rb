module ShantiIntegration
  class Engine < ::Rails::Engine
    initializer :assets do |config|
      Rails.application.config.assets.precompile.concat(['shanticon/shanticon.eot', 'shanticon/shanticon.svg',
        'shanticon/shanticon.ttf', 'shanticon/shanticon.woff'])
    end
  end
end