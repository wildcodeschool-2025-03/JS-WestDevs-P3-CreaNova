import { useEffect, useState } from "react";

function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);
  if (!events || events.length === 0) {
    return <h1>problem</h1>;
  }
  return (
    <section className="events-section-newsletter">
      {events.map((event) => (
        <section key={event.id}>
          <article>
            <h3>{event.title}</h3>
            <p>{event.text}</p>
          </article>

          <img
            src={`http://localhost:3310/${event.image}`}
            alt="illustration évènement"
          />
        </section>
      ))}
    </section>
  );
}
export default EventsSection;
