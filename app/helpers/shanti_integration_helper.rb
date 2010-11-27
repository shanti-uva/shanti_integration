# Methods added to this helper will be available to all templates in the application.
module ShantiIntegrationHelper
  
  def stylesheet_files
    #if @current_style == :home
    #  ['global', 'style', 'home', 'thickbox']
    #else
      ['global', 'style', 'thickbox']
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
    [:defaults] #since using jrails will load (jquery, jquery-ui, jrails)
  end  
   
  def stylesheets
    return stylesheet_link_tag(*stylesheet_files)
  end
  
  def javascripts
    return javascript_include_tag(*javascript_files)
  end 
  
end
