module InterfaceUtils
  module Server
    def self.get_url
      Rails.cache.fetch('server/environment') do
        case environment
        when DEVELOPMENT then 'http://dev.kmaps.virginia.edu'
        when STAGING     then 'http://staging.kmaps.virginia.edu'
        when PRODUCTION, LOCAL, OTHER then 'http://kmaps.virginia.edu'
        end
      end
    end
  end
end