module ShantiIntegration
  class Source
    include Flare::ActiveExtension
    include ActiveModel::Model
    
    KNOWN_ATTRS = [:id, :uid, :node_lang, :node_created, :node_changed, :title, :service, :asset_type, :url_html, :url_ajax, :url_json, :url_thumb, :timestamp]
    attr_accessor *KNOWN_ATTRS
  
    def self.service
      @@service ||= case InterfaceUtils::Server.environment
      when InterfaceUtils::Server::DEVELOPMENT then 'sources-dev_shanti_virginia_edu'
      when InterfaceUtils::Server::STAGING then 'sources-stage_shanti_virginia_edu'
      when InterfaceUtils::Server::PRODUCTION then 'sources.shanti.virginia.edu'
      when InterfaceUtils::Server::LOCAL then 'sources-dev_shanti_virginia_edu'
      else 'sources-dev_shanti_virginia_edu'
      end
    end
  
    acts_as_indexable path: 'asset_path', uid_prefix: self.service, scope: { asset_type: 'sources', service: self.service }
    
    def self.find(id)
      hash = self.flare_search(id)
      return nil if hash.blank?
      attrs = {}
      KNOWN_ATTRS.each{ |key| attrs[key]=hash[key.to_s] }
      return self.new(attrs)
    end
  end
end