module ShantiIntegration
  module Indexer
    def Indexer.trigger(query)
      uri = Indexer.uri
      return if uri.nil?
      data = {'query' => query}.to_json
      msg = Net::HTTP.post Indexer.uri, data, 'Content-Type' => 'application/json'
    end
    
    private
    
    def Indexer.url
      @@url ||= (Flare.config.configuration_from_key('solr', 'indexer') || '')
    end
    
    def Indexer.uri
      url = Indexer.url
      if !url.empty?
        @@uri ||= URI.parse(url)
        return @@uri
      end
      return nil
    end
  end
end