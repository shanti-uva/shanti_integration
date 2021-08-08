module ShantiIntegration
  class Text
    include Flare::ActiveExtension
    include ActiveModel::Model
    include ActiveRecordRelatable
    
    KNOWN_ATTRS = [:id, :uid, :title, :url_ajax]
    attr_accessor *KNOWN_ATTRS
  
    def self.service
      @@service ||= case InterfaceUtils::Server.environment
      when InterfaceUtils::Server::DEVELOPMENT then 'texts-dev_shanti_virginia_edu'
      when InterfaceUtils::Server::STAGING then 'texts-stage_shanti_virginia_edu'
      when InterfaceUtils::Server::PRODUCTION then 'texts_shanti_virginia_edu'
      when InterfaceUtils::Server::LOCAL then 'texts_shanti_virginia_edu'
      else 'texts-dev_shanti_virginia_edu'
      end
    end
    
    # acts_as_indexable hostname: 'asset_hostname', path: 'asset_path', uid_prefix: self.service, scope: { asset_type: 'texts*', service: self.service }
    acts_as_indexable hostname: 'asset_hostname', path: 'asset_path', uid_prefix: '*', scope: { asset_type: 'texts*' }
    
    def self.find(id)
      hash = self.flare_search(id)
      return nil if hash.blank?
      attrs = {}
      KNOWN_ATTRS.each{ |key| attrs[key]=hash[key.to_s] }
      return self.new(attrs)
    end

    def content
      fetch_content(self.url_ajax)
    end

    private
    def fetch_content(uri_str, redirect_limit = 10)
      return nil if redirect_limit == 0

      uri = URI.parse(uri_str)
      conn = Net::HTTP.new(uri.host,uri.port)
      conn.use_ssl = true
      conn.verify_mode = OpenSSL::SSL::VERIFY_NONE

      request = Net::HTTP::Get.new(uri.request_uri)
      result = conn.request(request)
      case result
      when Net::HTTPSuccess     then result.body.force_encoding("UTF-8")
      when Net::HTTPRedirection then fetch_content(result['location'], redirect_limit - 1)
      else
        nil
      end
    end

  end
end
