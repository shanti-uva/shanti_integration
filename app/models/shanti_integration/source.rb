module ShantiIntegration
  class Source
    include Flare::ActiveExtension
    include ActiveModel::Model
    include ActiveRecordRelatable
    
    KNOWN_ATTRS = [:id, :uid, :node_lang, :node_created, :node_changed, :title, :service, :asset_type, :url_html, :url_ajax, :url_json, :url_thumb, :timestamp]
    attr_accessor *KNOWN_ATTRS
    
    # currently not used  
    def self.service
      @@service ||= case InterfaceUtils::Server.environment
      when InterfaceUtils::Server::DEVELOPMENT then 'sources-dev_shanti_virginia_edu'
      when InterfaceUtils::Server::STAGING then 'sources-stage_shanti_virginia_edu'
      when InterfaceUtils::Server::PRODUCTION then 'sources_shanti_virginia_edu'
      when InterfaceUtils::Server::LOCAL then 'sources_shanti_virginia_edu'
      else 'sources-dev_shanti_virginia_edu'
      end
    end
    
    # acts_as_indexable hostname: 'asset_hostname', path: 'asset_path', uid_prefix: self.service, scope: { asset_type: 'sources', service: self.service }
    acts_as_indexable hostname: 'asset_hostname', path: 'asset_path', uid_prefix: '*', scope: { asset_type: 'sources' }
    
    def self.find(id)
      hash = Rails.cache.fetch("shanti_integration/source/#{id}", :expires_in => 1.day) do
        self.flare_search(id)
      end
      return nil if hash.blank?
      attrs = {}
      KNOWN_ATTRS.each{ |key| attrs[key]=hash[key.to_s] }
      return self.new(attrs)
    end

    def bibliographic_reference
      uri = URI.parse("https://sources.mandala.library.virginia.edu/sources-api/ajax/#{self.id}/cite/chicago")
      conn = Net::HTTP.new(uri.host,uri.port)
      conn.use_ssl = true
      conn.verify_mode = OpenSSL::SSL::VERIFY_NONE

      request = Net::HTTP::Get.new(uri.request_uri)
      result = conn.request(request)
      result_str = result.body.force_encoding('UTF-8')
      result_str.chop! if result_str.last == '.'
      result_str
    end
  end
end
