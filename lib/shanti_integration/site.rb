module InterfaceUtils
  module Server
    def self.get_url
      Rails.cache.fetch('server/shanti-domain', :expires_in => 1.day) do
        case environment
        when DEVELOPMENT then 'http://dev.shanti.virginia.edu'
        when STAGING     then 'http://staging.shanti.virginia.edu'
        else                  'http://shanti.virginia.edu'
        end
      end
    end
    
    def self.get_domain
      'kmaps.virginia.edu'
    end
  end
end