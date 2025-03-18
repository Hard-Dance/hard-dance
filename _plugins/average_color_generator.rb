require 'jekyll'
require 'json'
require 'rmagick'

module Jekyll
  class AverageColorGenerator < Generator
    safe true
    priority :low

    # Calculate relative luminance for a color (WCAG formula)
    def self.relative_luminance(r, g, b)
      # Convert 0-255 values to 0-1
      r = r / 255.0
      g = g / 255.0
      b = b / 255.0

      # Apply gamma correction
      r = r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4
      g = g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4
      b = b <= 0.03928 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4

      # Relative luminance formula
      0.2126 * r + 0.7152 * g + 0.0722 * b
    end

    # Calculate contrast ratio between two luminance values
    def self.contrast_ratio(l1, l2)
      lighter = [l1, l2].max
      darker = [l1, l2].min
      (lighter + 0.05) / (darker + 0.05)
    end

    # Choose text color (black or white) based on background luminance
    def self.select_text_color(bg_r, bg_g, bg_b)
      bg_luminance = relative_luminance(bg_r, bg_g, bg_b)
      black_luminance = relative_luminance(0, 0, 0)  # Black: #000000
      white_luminance = relative_luminance(255, 255, 255)  # White: #FFFFFF

      black_contrast = contrast_ratio(bg_luminance, black_luminance)
      white_contrast = contrast_ratio(bg_luminance, white_luminance)

      # Return the color with higher contrast, ensuring >= 4.5
      white_contrast >= 4.5 && white_contrast > black_contrast ? '#FFFFFF' : '#000000'
    end

    def generate(site)
      data_path = File.join(site.source, '_data')
      file_path = File.join(data_path, 'average_colors.json')
      posts_dir = File.join(site.source, '_posts')

      Dir.mkdir(data_path) unless Dir.exist?(data_path)
      unless File.exist?(file_path)
        File.write(file_path, JSON.pretty_generate({}))
      end

      colors_data = {}
      File.open(file_path, 'r') do |file|
        content = file.read
        colors_data = JSON.parse(content) unless content.strip.empty?
      end

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
          
          # Background color in hex
          bg_r = avg_color.red / 257
          bg_g = avg_color.green / 257
          bg_b = avg_color.blue / 257
          bg_hex = sprintf('#%02X%02X%02X', bg_r, bg_g, bg_b)

          # Select contrasting text color
          text_hex = self.class.select_text_color(bg_r, bg_g, bg_b)

          # Store both colors
          colors_data[slug] = { 'background' => bg_hex, 'text' => text_hex }
        rescue Magick::ImageMagickError => e
          Jekyll.logger.error "AverageColorGenerator:", "Image processing failed for #{slug}: #{e.message}"
          next
        ensure
          img&.destroy!
          pixel&.destroy!
        end
      end

      File.write(file_path, JSON.pretty_generate(colors_data))
    end
  end
end