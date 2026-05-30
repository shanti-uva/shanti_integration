module ShantiIntegration
  module AuthenticationExtensions
    def shibboleth_fullname # UVa actually not providing any of these!
      "#{request.env['HTTP_GIVENNAME']} #{request.env['HTTP_SN']}"
    end

    def shibboleth_email
      request.env['HTTP_EPPN']
    end    
  end
end