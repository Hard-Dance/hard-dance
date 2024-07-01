require 'jekyll'
require 'json'

module Jekyll
  class AverageColorGenerator < Generator
    priority :low

    def generate(site)
      data_path = File.join(site.source, '_data')
      file_path = File.join(data_path, 'average_colors.json')

      # Check if the _data directory exists, create if not
      Dir.mkdir(data_path) unless Dir.exist?(data_path)

      # Initialize the file if it does not exist
      unless File.exist?(file_path)
        File.open(file_path, 'w') do |file|
          file.write("{}")
        end
      end

      # Now proceed with opening the file
      File.open(file_path, 'r+') do |file|
        # Your existing logic for processing the images and updating the JSON
        content = JSON.parse(file.read)
        # Example of adding or updating the content
        content['new_key'] = 'New Value'
        file.rewind
        file.write(JSON.pretty_generate(content))
      end
    end
  end
end
