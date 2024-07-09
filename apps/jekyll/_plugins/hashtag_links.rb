module Jekyll
  module HashtagLinkFilter
    def hashtag_links(input)
      input.gsub(/#(\w+)/, '<a href="https://www.facebook.com/hashtag/\1" target="_blank">#\1</a>')
    end
  end
end

Liquid::Template.register_filter(Jekyll::HashtagLinkFilter)
