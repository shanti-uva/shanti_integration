$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "shanti_integration/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "shanti_integration"
  s.version     = ShantiIntegration::VERSION
  s.authors     = ["Andres Montano"]
  s.email       = ["amontano@virginia.edu"]
  s.homepage    = "http://subjects.kmaps.virginia.edu"
  s.summary     = "Provides the look and feel for a shanti application."
  s.description = "Provides the look and feel for a shanti application."

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency 'rails', '~> 4.1.16'
  # s.add_dependency "jquery-rails"
end
