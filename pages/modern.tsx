// pages/modern.tsx
import { useEffect, useState } from "react";
import { getReservations } from "../lib/api";
import dayjs from "dayjs";

interface Reservation {
  id: number;
  start_at: string;
  end_at: string;
  reference: string;
}

export default function ModernPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    getReservations().then(setReservations);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-700"> Réservations Modernes</h1>

        {reservations.length === 0 ? (
          <div className="text-center text-gray-500">Aucune réservation disponible.</div>
        ) : (
          <div className="grid gap-6">
            {reservations.map((res) => (
              <div key={res.id} className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Réservation #{res.id}</h2>
                  <span className="text-sm text-gray-400">{res.reference}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Du :</strong> {dayjs(res.start_at).format("DD MMM YYYY - HH:mm")}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Au :</strong> {dayjs(res.end_at).format("DD MMM YYYY - HH:mm")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
