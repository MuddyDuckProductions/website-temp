import { useEffect, useState } from "react";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const calendarId =
    "c_df07081168fc31da642feb3e77356dda9abce23e5375ce3e03beb56148f4232c@group.calendar.google.com";
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const now = new Date().toISOString();
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarId
      )}/events?key=${apiKey}&timeMin=${now}&maxResults=2&singleEvents=true&orderBy=startTime`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Calendar API response:", data);
        setEvents(data.items || []);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [apiKey, calendarId]);

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-white">
          {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No upcoming events found.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => {
            const start = event.start.dateTime || event.start.date || "";
            const dateObj = new Date(start);
            const formattedDate = dateObj.toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <li
                key={event.id}
                className="bg-gray-800 p-4 rounded-lg border border-yellow-600 hover:bg-yellow-600 hover:text-black transition-colors"
              >
                <h3 className="text-xl font-semibold">
                  {event.summary || "Untitled Event"}
                </h3>
                <p className="text-yellow-300">{formattedDate}</p>

                {event.location && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      event.location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 underline block"
                  >
                    {event.location}
                  </a>
                )}

                {event.description && (
                  <div className="mt-2 space-y-1">
                    {[...event.description.matchAll(/https?:\/\/[^\s"'()<>]+/g)].map(
                      (match, index) => (
                        <a
                          key={index}
                          href={match[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-400 underline block"
                        >
                          {match[0]}
                        </a>
                      )
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Events;
