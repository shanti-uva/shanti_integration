# Methods added to this helper will be available to all templates in the application.
module ShantiIntegrationHelper
  
  def stylesheet_files
    ['global', 'style', 'thickbox']
  end

  def javascript_files
    [:defaults, 'jquery-ui']
  end  
   
  def stylesheets
    return stylesheet_link_tag(*stylesheet_files)
  end
  
  def javascripts
    return javascript_include_tag(*javascript_files)
  end
end