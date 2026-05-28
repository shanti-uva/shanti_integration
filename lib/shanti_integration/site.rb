module InterfaceUtils
  module Server
    def self.get_url
      Rails.cache.fetch('server/shanti-domain', :expires_in => 1.day) do
        case environment
        when DEVELOPMENT then 'https://mandala-dev.internal.lib.virginia.edu'
        when STAGING     then 'https://mandala-staging.internal.lib.virginia.edu'
        else                  'https://mandala.library.virginia.edu'
        end
      end
    end
    
    def self.get_domain
      'kmaps.virginia.edu'
    end
  end
end