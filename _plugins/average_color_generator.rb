require 'jekyll'
require 'json'
require 'rmagick'

module Jekyll
  class AverageColorGenerator < Generator
    safe true
    priority :low

    def generate(site)
      data_path = File.join(site.source, '_data')
      file_path = File.join(data_path, 'average_colors.json')
      posts_dir = File.join(site.source, '_posts')

      # Ensure _data directory exists
      Dir.mkdir(data_path) unless Dir.exist?(data_path)
      unless File.exist?(file_path)
        File.write(file_path, JSON.pretty_generate({}))
      end

      # Load existing colors data
      colors_data = {}
      File.open(file_path, 'r') do |file|
        content = file.read
        colors_data = JSON.parse(content) unless content.strip.empty?
      end

      # Process each post
      Dir.glob(File.join(posts_dir, '*.md')).each do |post_path|
        filename = File.basename(post_path)
        slug = filename.sub(/^\d{4}-\d{2}-\d{2}-/, '').sub(/\.md$/, '')
        next if colors_data.key?(slug)

        post = site.posts.docs.find { |p| p.basename == filename }
        next unless post && post.data['image']

        image_path = File.join(site.source, post.data['image'].sub(/^\//, ''))
        next unless File.exist?(image_path)

        begin
          img = Magick::Image.read(image_path).first
          pixel = img.scale(1, 1)
          avg_color = pixel.pixel_color(0, 0)
          hex_color = sprintf('#%02X%02X%02X', 
                              avg_color.red / 257, 
                              avg_color.green / 257, 
                              avg_color.blue / 257)
          colors_data[slug] = hex_color
        rescue Magick::ImageMagickError => e
          Jekyll.logger.error "AverageColorGenerator:", "Image processing failed for #{slug}: #{e.message}"
          next
        ensure
          img&.destroy!
          pixel&.destroy!
        end
      end

      # Write updated colors data
      File.write(file_path, JSON.pretty_generate(colors_data))
    end
  end
end