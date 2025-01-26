module ShantiIntegration
  module Indexer
    # currently not called, but could be susceptible to creating zombie records given that there is no wait.
    def Indexer.trigger(query)
      uri = Indexer.uri
      return if uri.nil?
      Spawnling.new(kill: true) do
        sleep(160)
        data = {'query' => query}.to_json
        msg = Net::HTTP.post Indexer.uri, data, 'Content-Type' => 'application/json'
      end
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