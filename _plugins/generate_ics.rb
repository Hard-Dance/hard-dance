require 'icalendar'
require 'fileutils'
require 'date'

module Jekyll
  class IcsGenerator < Generator
    safe true
    priority :low

    def generate(site)
      Jekyll.logger.info "ICS Generator:", "Generating ICS files..."
      dest = site.config['destination'] || '_site'
      ics_dir = File.join(dest, 'assets', 'ics') # Changed directory path to _site/assets/ics/
      
      FileUtils.mkdir_p(ics_dir) unless File.exist?(ics_dir)
      Jekyll.logger.info "ICS Generator:", "ICS directory is ready at #{ics_dir}"

      site.posts.docs.each do |post|
        Jekyll.logger.info "ICS Generator:", "Processing post: #{post.data['title']}"
        generate_ics_for(post, ics_dir)
      end
    end

    def generate_ics_for(post, ics_dir)
      cal = Icalendar::Calendar.new
      event = Icalendar::Event.new

      dtstart = Date.strptime(post.data['datestart'], "%Y/%m/%d").strftime("%Y%m%d")
      dtend = post.data['dateend'] ? Date.strptime(post.data['dateend'], "%Y/%m/%d").strftime("%Y%m%d") : nil

      event.dtstart = Icalendar::Values::Date.new(dtstart)
      event.dtend = Icalendar::Values::Date.new(dtend) if dtend
      event.summary = post.data['title']
      event.description = build_description(post)
      event.location = post.data['location']
      cal.add_event(event)

      # Sanitize filename to remove symbols other than '-'
      filename = sanitize_filename(post.data['title']) + ".ics"
      filepath = File.join(ics_dir, filename)

      File.open(filepath, 'w') { |file| file.write(cal.to_ical) }
      Jekyll.logger.info "ICS Generator:", "ICS file created at #{filepath}"
    end

    def build_description(post)
      description = "Location: #{post.data['location']}\nType: #{post.data['type']}\nGenre: #{post.data['genre']}\nAge: #{post.data['age']}"
      description += "\nHosts: #{post.data['hosts'].join(', ')}" if post.data['hosts']
      description += "\nLinks: " + post.data['links'].map { |link| link['title'] + ": " + link['url'] }.join(', ') if post.data['links']
      description
    end

    private

    def sanitize_filename(filename)
      filename.downcase.gsub(/[^a-z0-9\-]+/, '-').gsub(/^-+|-+$/, '')
    end
  end
end
