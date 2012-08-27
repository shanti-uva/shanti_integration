# Methods added to this helper will be available to all templates in the application.
module ShantiIntegrationHelper
  
  def stylesheet_files
    #if @current_style == :home
    #  ['global', 'style', 'home', 'thickbox']
    #else
    
    if defined?(SHANTI_KMAPS_APP)
      ['base', 'language_support', 'authenticated_system','tmb','global', 'style', 'thickbox']
    else  #just shanti
      ['global', 'style', 'thickbox']
    end
    
    #end
  end

  def javascript_files
    #if @current_style == :home
    #   if logged_in?
    #     ['jquery','togglesections','jquery.jcarousel','thickbox-compressed','jquery-plugins','load-latest-news']
    #   else
    #     ['jquery','jquery.jcarousel','thickbox-compressed','jquery-plugins','load-latest-news']
    #   end
    #else
    #  if logged_in?
    #    ['jquery','jquery-ui','jrails','category_selector','application','togglesections','thickbox-compressed','jquery-plugins','encodemailto']
    #  else
    #    ['jquery','jquery-ui','jrails','category_selector','application','thickbox-compressed','jquery-plugins','encodemailto']
    #  end
    #end
    
    #rails3 change
    #[:defaults] #since using jrails will load (jquery, jquery-ui, jrails)
      ['jquery','jquery-ui', 'rails']  
  end  
   
  def stylesheets
    return stylesheet_link_tag(*stylesheet_files)
  end
  
  def javascripts
    return javascript_include_tag(*javascript_files) + csrf_meta_tag
  end 
  
end
