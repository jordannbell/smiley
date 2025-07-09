// pages/modern.tsx
import { useEffect, useState } from "react";
import { getReservations } from "../lib/api";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { parseISO } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css"; // le style par défaut
import { fr } from "date-fns/locale";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { DateLocalizer } from "react-big-calendar";

interface Reservation {
  id: number;
  start_at: string;
  end_at: string;
  reference: string;
}

const localizer: DateLocalizer = {
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales: { fr },
};

export default function ModernPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getReservations().then((data) => {
      const formatted = data.map((res: Reservation) => ({
        id: res.id,
        title: `#${res.reference}`,
        start: parseISO(res.start_at),
        end: parseISO(res.end_at),
        allDay: false,
      }));
      setEvents(formatted);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">📅 Réservations</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, backgroundColor: "white", borderRadius: "8px", padding: "10px" }}
        />
      </div>
    </div>
  );
}
