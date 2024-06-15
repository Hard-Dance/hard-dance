import type { MetaFunction } from "@remix-run/node";
import { Header } from "../components/Header";
import { BannerEvents } from "../components/BannerEvents";
import { Footer } from "../components/Footer";
import { TitleBar } from "../components/TitleBar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  // TODO: real data
  const average_color = "#5F455D";

  return (
    <>
      {/* {% include header.html %} */}
      <Header />

      <div className="banner events-banner" id="top">
        {/* {% include banner-events.html %} */}
        <BannerEvents />
      </div>

      <main>
        {/* {% include title-bar.html %} */}
        <TitleBar />

        <ol className="grid events-grid">
          {/* {% assign today = 'now' | date: '%Y-%m-%d' %} {% assign sorted_posts =
        site.posts | sort: 'datestart' %} {% for post in sorted_posts %} {%
        assign post_start_date = post.datestart | date: '%Y-%m-%d' %} {% if
        post_start_date >= today %} */}
          {/* TODO: real data */}
          {/* <!-- prettier-ignore --> */}
          {/* {% assign location_parts = post.location | split: ',' %}
        {% assign country_part = location_parts | last | strip %}
        {% assign country = country_part %}  */}

          {/* {% case country %}
          {% when 'Algeria' %} {% assign flag = '🇩🇿' %}
          {% when 'Argentina' %} {% assign flag = '🇦🇷' %}
          {% when 'Australia' %} {% assign flag = '🇦🇺' %}
          {% when 'Austria' %} {% assign flag = '🇦🇹' %}
          {% when 'Belgium' %} {% assign flag = '🇧🇪' %}
          {% when 'Brazil' %} {% assign flag = '🇧🇷' %}
          {% when 'Canada' %} {% assign flag = '🇨🇦' %}
          {% when 'Chile' %} {% assign flag = '🇨🇱' %}
          {% when 'China' %} {% assign flag = '🇨🇳' %}
          {% when 'Croatia' %} {% assign flag = '🇭🇷' %}
          {% when 'Czech Republic' %} {% assign flag = '🇨🇿' %}
          {% when 'Denmark' %} {% assign flag = '🇩🇰' %}
          {% when 'Egypt' %} {% assign flag = '🇪🇬' %}
          {% when 'Finland' %} {% assign flag = '🇫🇮' %}
          {% when 'France' %} {% assign flag = '🇫🇷' %}
          {% when 'Germany' %} {% assign flag = '🇩🇪' %}
          {% when 'Greece' %} {% assign flag = '🇬🇷' %}
          {% when 'Hungary' %} {% assign flag = '🇭🇺' %}
          {% when 'India' %} {% assign flag = '🇮🇳' %}
          {% when 'Italy' %} {% assign flag = '🇮🇹' %}
          {% when 'Japan' %} {% assign flag = '🇯🇵' %}
          {% when 'Mexico' %} {% assign flag = '🇲🇽' %}
          {% when 'Netherlands' %} {% assign flag = '🇳🇱' %}
          {% when 'Norway' %} {% assign flag = '🇳🇴' %}
          {% when 'Poland' %} {% assign flag = '🇵🇱' %}
          {% when 'Portugal' %} {% assign flag = '🇵🇹' %}
          {% when 'Russia' %} {% assign flag = '🇷🇺' %}
          {% when 'South Africa' %} {% assign flag = '🇿🇦' %}
          {% when 'South Korea' %} {% assign flag = '🇰🇷' %}
          {% when 'Spain' %} {% assign flag = '🇪🇸' %}
          {% when 'Sweden' %} {% assign flag = '🇸🇪' %}
          {% when 'Switzerland' %} {% assign flag = '🇨🇭' %}
          {% when 'United Kingdom' %} {% assign flag = '🇬🇧' %}
          {% when 'United States' %} {% assign flag = '🇺🇸' %}
          {% when 'Venezuela' %} {% assign flag = '🇻🇪' %}
        {%- else -%}
          {% assign flag = '' %}
        {% endcase %} */}

          {/* {% assign average_color = site.data.average_colors[post.slug] %} */}
          <li
            className="grid-item events-grid-item {% for host in post.hosts %}filter-host-{{ host | slugify }} {% endfor %}"
            // style="
            //   --xxx-color-background: {{ average_color }};
            //   {% if post.foreground %}
            //   --xxx-color-text: color-mix(in srgb, {{ average_color }}, black 80%);
            //   --xxx-color-text-muted: color-mix(in srgb, {{ average_color }} 50%, black 50%);
            //   --xxx-color-accent: color-mix(in srgb, {{ average_color }} 100%, black 25%);
            //   {% else %}
            //   --xxx-color-text: color-mix(in srgb, {{ average_color }}, white 80%);
            //   --xxx-color-text-muted: color-mix(in srgb, {{ average_color }} 50%, white 50%);
            //   --xxx-color-accent: color-mix(in srgb, {{ average_color }} 100%, white 25%);
            //   {% endif %}
            // "

            // TODO: Confirm styles
            style={
              {
                "--xxx-color-background": average_color,
                "--xxx-color-text": `color-mix(in srgb, ${average_color}, black 80%)`,
                "--xxx-color-text-muted": `color-mix(in srgb, ${average_color} 50%, black 50%)`,
                "--xxx-color-accent": `color-mix(in srgb, ${average_color} 100%, black 25%)`,
              } as React.CSSProperties
            }
            id="grid-item-{{ forloop.index }}"
            data-location="{{ country_part | slugify }}"
            // TODO: Real condition
            // {% if post.is_online == true %}
            data-virtual
            // {% endif %}

            // TODO: Real condition
            // {%
            // if
            // post.featured
            // %}
            data-featured="true"
            // {%
            // endif
            // %}
          >
            {/* {% if post.featured and post.video %}
          <video
            autoplay
            muted
            loop
            playsinline
            poster="/.netlify/images/?url={{ post.image }}&fit=cover&h=300"
            className="grid-item-image"
          >
            <source
              src="/assets/video/events/{{ post.title | slugify }}.mp4"
              type="video/mp4"
            />
            <source
              src="/assets/video/events/{{ post.title | slugify }}.ogv"
              type="video/ogv"
            />
            <source
              src="/assets/video/events/{{ post.title | slugify }}.webm"
              type="video/webm"
            />
          </video>
          {% endif %} */}

            <img
              className="grid-item-image"
              srcSet="/.netlify/images/?url={{ post.image }}&fit=cover&h=600 2x, /.netlify/images/?url={{ post.image }}&fit=cover&h=900 3x"
              src="/.netlify/images/?url={{ post.image }}&fit=cover&h=300"
              // alt="{{ post.title | smartify }} image"
              // TODO: Better/Real alt
              alt="TODO"
              data-index="{{ forloop.index }}"
              draggable="false"
              // style="view-transition-name: post-image-{{ post.title | slugify }};"
              style={
                {
                  "view-transition-name": `post-image-{{ post.title | slugify }}`, // TODO: Real data
                } as React.CSSProperties
              }
            />
            <div className="grid-item-metadata">
              <a
                className="grid-item-metadata-title grid-item-anchor"
                href="{{ post.url }}"
                // style="view-transition-name: post-title-{{ post.title | slugify }};"
                style={
                  {
                    "view-transition-name": `post-title-{{ post.title | slugify }}`, // TODO: Real data
                  } as React.CSSProperties
                }
              >
                {/* {{ post.title | smartify }} */}
                {/* TODO: Real data */}
                TODO: post.title
              </a>
              <div className="grid-item-metadata-subtitle">
                <time
                // datetime="{{ post.datestart | date: '%Y-%m-%d' }}"
                // TODO: Real data
                >
                  {/* {{ post.datestart | date: "%b %d" }} */}
                  TODO: post.datestart
                </time>

                {/* {% if post.dateend %} &nbsp;–&nbsp; */}
                <time
                // datetime="{{ post.dateend | date: '%Y-%m-%d' }}"
                // TODO: Real data
                >
                  {/* {{ post.dateend | date: "%b %d" }} */}
                  TODO: post.dateend
                </time>
                {/* {% endif %} */}
              </div>
              <div className="grid-item-metadata-symbol">
                {/* {% if post.is_online %}🛰️{% endif %} */}
                {/* Real condition */}
                🛰️
                {/* {{ flag }} */}
                TODO: flag
              </div>

              {/* {% assign today = 'now' | date: '%Y-%m-%d' %} {% assign start_date =
            post.datestart | date: '%Y-%m-%d' %} {% assign end_date =
            post.dateend | date: '%Y-%m-%d' %} */}

              {/* TODO: Real conditions */}
              {/* {% if post.dateend %}
            {% if today >= start_date and today <= end_date %} */}
              <div className="event-list-item-status">Today</div>
              {/* {% endif %} {% else %} {% if today == start_date %} */}
              <div className="event-list-item-status">Today</div>
              {/* {% endif %} {% endif %} */}
            </div>
          </li>
          {/* {% endif %} {% endfor %} */}
        </ol>

        <div className="events-empty-state" style={{ display: "none" }}>
          <div className="events-empty-state-emoji">🔇</div>
          <h2>No upcoming events found.</h2>
          <p>Do you know of an event that should be listed here?</p>
          <button
            aria-label="Add event"
            className="button"
            data-variant="call-to-action"
            // onclick="document.getElementById('add-event').show()"
            // TODO: onClick
          >
            Add an event
          </button>
        </div>
      </main>

      {/* {% include footer.html %} */}
      <Footer />

      {/* {% include dialog.html %} */}
      {/* {% include scripts.html%} */}
    </>
  );
}
