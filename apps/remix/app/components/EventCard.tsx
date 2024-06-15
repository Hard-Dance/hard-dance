import averageColors from "../data/average-colors";
import { Event } from "../data/data";
import { format, isAfter, isSameDay } from "date-fns";

export const EventCardLi = ({
  event,
  index,
}: {
  event: Event;
  index: number;
}) => {
  const averageColor = averageColors[event.id];
  const baseTextColor = event.isForegroundBlack ? "black" : "white";

  // TODO: Change the folder to video instead of videos
  const videoUrlWithoutType = `assets/videos/events/${event.id}`;

  const dateStartDate = new Date(event.datestart);
  const dateEndDate = new Date(event.dateend);

  const dateFormat = "MMM d";
  const formattedDateStart = format(dateStartDate, dateFormat);
  const formattedDateEnd = event.dateend
    ? format(dateEndDate, dateFormat)
    : undefined;

  const today = new Date();

  // TODO: Make sure user's timezone is taken into account since their timezone may not be equal to the event's timezone
  const isHappeningNow = event.dateend
    ? !isAfter(dateStartDate, today) && !isAfter(today, dateEndDate)
    : isSameDay(dateStartDate, today);
  return (
    <li
      id={`grid-item-${index}`}
      className="grid-item events-grid-item"
      style={
        {
          "--xxx-color-background": averageColor,

          "--xxx-color-text": `color-mix(in srgb, ${averageColor}, ${baseTextColor} 80%)`,
          "--xxx-color-text-muted": `color-mix(in srgb, ${averageColor} 50%, ${baseTextColor} 50%)`,
          "--xxx-color-accent": `color-mix(in srgb, ${averageColor} 100%, ${baseTextColor} 25%)`,
        } as React.CSSProperties
      }
      data-virtual={event.is_online ? true : undefined}
      data-featured={event.featured ? true : undefined}
    >
      {event.featured && event.video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={`https://hard.dance/.netlify/images/?url=${event.image}&fit=cover&h=300`}
          className="grid-item-image"
        >
          <source src={`${videoUrlWithoutType}.mp4`} type="video/mp4" />
          <source src={`${videoUrlWithoutType}.ogv`} type="video/ogv" />
          <source src={`${videoUrlWithoutType}.webm`} type="video/webm" />
        </video>
      )}

      <img
        className="grid-item-image"
        srcSet={`https://hard.dance/.netlify/images/?url=${event.image}&fit=cover&h=600 2x, https://hard.dance/.netlify/images/?url=${event.image}&fit=cover&h=900 3x`}
        src={`https://hard.dance/.netlify/images/?url=${event.image}&fit=cover&h=300`}
        alt={event.title}
        data-index={index}
        draggable="false"
        style={
          {
            "view-transition-name": `post-image-${event.id}`,
          } as React.CSSProperties
        }
      />

      <div className="grid-item-metadata">
        <a
          className="grid-item-metadata-title grid-item-anchor"
          href={`/events/${event.id}`}
          style={
            {
              "view-transition-name": `post-title-${event.id}}`,
            } as React.CSSProperties
          }
        >
          {event.title}
        </a>

        <div className="grid-item-metadata-subtitle">
          <time dateTime={event.datestart}>{formattedDateStart}</time>

          {event.dateend && (
            <>
              {" - "}
              <time dateTime={event.dateend}>{formattedDateEnd}</time>
            </>
          )}
        </div>

        <div className="grid-item-metadata-symbol">
          {event.is_online && "🛰️"}
          {event.flag}
        </div>

        {isHappeningNow && <div className="event-list-item-status">Today</div>}
      </div>
    </li>
  );
};
