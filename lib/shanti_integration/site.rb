module InterfaceUtils
  module Server
    def self.get_url
      Rails.cache.fetch('server/domain') do
        case environment
        when DEVELOPMENT then 'http://dev.thlib.org'
        when STAGING     then 'http://staging.thlib.org'
        else                  'http://www.thlib.org'
        end
      end
    end
  end
end