# Methods added to this helper will be available to all templates in the application.
module ShantiIntegrationHelper
  def google_maps_key
    'AIzaSyAXpnXkPS39-Bo5ovHQWvyIk6eMgcvc1q4'
  end
  
  def stylesheet_files
    ['application']
  end

  def javascript_files
    ['application']
  end
  
  def header(options)
    js_files = options[:javascript_files]
    js_files = js_files.nil? ? javascript_files : javascript_files + js_files
    css_files = options[:stylesheet_files]
    css_files = css_files.nil? ? stylesheet_files : css_files + stylesheet_files
    render :partial => 'main/header', :locals => { :javascript_files => js_files, :stylesheet_files => css_files,
      :body_class => options[:class], :body_id => options[:id],
      :head_title => options[:title] || "#{controller.controller_name.humanize}: #{controller.action_name.humanize}",
      :banner_title => options[:banner_title] || 'SHANTI - Sciences, Humanities, and Arts Network of Technological Initiatives' }
  end
  
  def footer
  end
end