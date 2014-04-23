module InterfaceUtils
  module Server
    def self.get_url
      Rails.cache.fetch('server/domain', :expires_in => 1.day) do
        case environment
        when DEVELOPMENT then 'http://dev.thlib.org'
        when STAGING     then 'http://staging.thlib.org'
        else                  'http://www.thlib.org'
        end
      end
    end
    
    def self.get_domain
      'kmaps.virginia.edu'
    end
  end
end