module ShantiIntegration
  class TranslationTool
    include Flare::ActiveExtension
    include ActiveModel::Model
    include ActiveRecordRelatable
            
    def self.translate(text, dicts: 1)
      if dicts.is_a? Integer
        dict_bit = dicts
      elsif dicts.is_a? String
        dict_bit = self.bitify_dicts([dicts])
      elsif dicts.is_a? Array
        dict_bit = self.bitify_dicts(dicts)
      end
      encoded_text = URI.encode_www_form_component(text.gsub(/[\n\u2028]/, " ")) # Encode text for URL
      url = "#{self.service}?jwf=?&dicts=#{dict_bit}&text=#{encoded_text}"
      uri = URI.parse(url)
      response = Net::HTTP.get_response(uri) # Perform GET request
      if response.is_a?(Net::HTTPSuccess)
        json_text = response.body.gsub(/^\?\(|\);\s*$/, '')
        return JSON.parse(json_text)
      else
        return {}
      end
    end
    
    private
    
    def self.service
      @@service ||= case InterfaceUtils::Server.environment
      when InterfaceUtils::Server::LOCAL then 'http://localhost/ttt/org.thdl.tib.scanner.RemoteScannerFilter'
      when InterfaceUtils::Server::DEVELOPMENT then 'http://dev.ttt.thlib.org/org.thdl.tib.scanner.RemoteScannerFilter'
      else 'http://ttt.thlib.org/org.thdl.tib.scanner.RemoteScannerFilter'
      end
    end
    
    def self.dictionary_index
      if !defined?(@@dictionary_index) || @@dictionary_index.nil?
        url = "#{self.service}?dicts=names"
        uri = URI.parse(url)
        response = Net::HTTP.get_response(uri) # Perform GET request
        @@dictionary_index = {}
        if response.is_a?(Net::HTTPSuccess)
          a = response.body.split("\n")
          a.each_index do |i|
            name, code = a[i].split(",")
            @@dictionary_index[code] = i
          end
        end
      end
      return @@dictionary_index
    end
    
    def self.bitify_dicts(dicts)
      int = 0
      dict_index = self.dictionary_index
      dicts.each do |code|
        i = dict_index[code]
        int += 1 << i if !i.nil? # each dictionary position is stored as a bit in an integer
      end
      return int
    end
  end
end
