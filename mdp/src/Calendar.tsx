// src/Calendar.tsx
import React, { useEffect, useState, useRef } from 'react'
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

type CalendarEvent = {
  title: string
  start: Date
  end: Date
  description?: string  // may contain HTML
  location?: string
  htmlLink?: string
}

const localizer = momentLocalizer(moment)

const CalendarView: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const descRef = useRef<HTMLDivElement>(null)

  const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID as string
  const apiKey    = import.meta.env.VITE_GOOGLE_API_KEY     as string

  // Fetch events from Google Calendar
  useEffect(() => {
    if (!calendarId || !apiKey) return

    ;(async () => {
      const now = new Date().toISOString()
      const url =
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events` +
        `?key=${apiKey}` +
        `&timeMin=${now}` +
        `&singleEvents=true` +
        `&orderBy=startTime` +
        `&maxResults=50`

      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (Array.isArray(data.items)) {
          setEvents(
            data.items.map((item: any) => ({
              title:       item.summary || 'No title',
              start:       new Date(item.start.dateTime ?? item.start.date),
              end:         new Date(item.end.dateTime   ?? item.end.date),
              description: item.description,
              location:    item.location,
              htmlLink:    item.htmlLink,
            }))
          )
        }
      } catch (err) {
        console.error('Failed to load events', err)
      }
    })()
  }, [calendarId, apiKey])

  // Ensure any <a> in the injected HTML opens in a new tab,
  // is underlined, and uses a larger font size.
  useEffect(() => {
    if (!descRef.current) return
    descRef.current
      .querySelectorAll<HTMLAnchorElement>('a')
      .forEach(a => {
        a.setAttribute('target', '_blank')
        a.setAttribute('rel', 'noopener noreferrer')
        a.classList.add('underline', 'text-xl')
      })
  }, [selectedEvent])

  return (
    <>
      <div className="pt-56" style={{ height: '720px' }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.MONTH}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          style={{ height: '100%' }}
          popup
          onSelectEvent={evt => setSelectedEvent(evt as CalendarEvent)}
        />
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#000000] text-[#eeee24] rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedEvent.title}
            </h2>

            <p className="mb-2">
              <strong>Start:</strong> {selectedEvent.start.toLocaleString()}
            </p>
            <p className="mb-2">
              <strong>End:</strong>   {selectedEvent.end.toLocaleString()}
            </p>
            {selectedEvent.location && (
              <p className="mb-2">
                <strong>Location:</strong> {selectedEvent.location}
              </p>
            )}

            {selectedEvent.description && (
              <div className="mb-4">
                <strong>Description:</strong><br/>
                <div
                  ref={descRef}
                  className="mt-2 prose prose-invert whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
                />
              </div>
            )}

            {selectedEvent.htmlLink && (
              <p className="mb-4">
                <a
                  href={selectedEvent.htmlLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#eeee24] text-lg"
                >
                  View in Google Calendar
                </a>
              </p>
            )}

            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CalendarView
