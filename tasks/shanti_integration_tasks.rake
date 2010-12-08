# desc "Explaining what the task does"
# task :shanti_integration do
#   # Task goes here
# end
namespace :shanti do
  desc "Syncronize extra files for Shanti Integration plugin."
  task :sync do
    system "rsync -ruvK --exclude '.*' vendor/plugins/shanti_integration/public ."
  end
end