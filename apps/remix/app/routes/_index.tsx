import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Header } from "../components/Header";
import { BannerEvents } from "../components/BannerEvents";
import { Footer } from "../components/Footer";
import { TitleBar } from "../components/TitleBar";
import { EventCardLi } from "../components/EventCard";
import { Event, markdownToEvent } from "../data/data";
import fs from "fs";
import path from "path";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// Loader
export const loader: LoaderFunction = async () => {
  // Get names of all .md files in ../../../jekyll/_posts
  // const events = await Promise.all(
  //   fs.readdirSync("../../../jekyll/_posts").map(async (file) => {
  //     const filePath = path.join("../../../jekyll/_posts", file);
  //     const fileContent = await fs.readFileSync(filePath, "utf8");
  //     const { title, datestart, dateend, location, hosts, featured } =
  //       matter(fileContent);
  //     return {
  //       id: file.replace(".md", ""),
  //       title,
  //       datestart,
  //       dateend,
  //       location,
  //       hosts,
  //       featured,
  //     };
  //   })
  // );

  // console.log("J'suis ici", fs.readdirSync("../jekyll/_posts")[0]);
  // const fileName = fs.readdirSync("../jekyll/_posts")[0];
  // const fileName = "2024-06-27-defqon-1-weekend-festival-2024.md";
  // const filePath = path.join("../jekyll/_posts", fileName);
  // const absoluteFilePath = path.resolve(filePath);
  // const fileContent = fs.readFileSync(absoluteFilePath, "utf8");
  // const parsedMarkdown = matter(fileContent);

  // console.log(
  //   // text should be green. use escape sequences
  //   `\x1b[32m${JSON.stringify(greyMatterToEvent(parsedMarkdown))}\x1b[0m`
  // );

  // return {
  //   events: [],
  // };

  const allFileNames = fs.readdirSync("../jekyll/_posts").filter(fileName => !fileName.includes("2024-01-01-template-2024.md"));
  const events: Event[] = allFileNames.map((fileName) => {
    const markdownFilePath = path.join("../jekyll/_posts", fileName);
    return markdownToEvent(markdownFilePath);
  });

  return {
    events,
  };
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const events = loaderData.events as Event[];

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

          {/* {% endif %} {% endfor %} */}

          {events.map((event, index) => (
            <EventCardLi key={event.id} event={event} index={index} />
          ))}
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
