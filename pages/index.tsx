// pages/index.tsx
import { useEffect, useState } from "react";
import { getReservations } from "../lib/api";
import ReservationCard from "../components/Reservation";

interface Reservation {
  id: number;
  start_at: string;
  end_at: string;
  reference: string;
}

export default function HomePage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        setReservations(data);
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Agenda des Réservations</h1>
      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : reservations.length === 0 ? (
        <p className="text-center text-gray-500">Aucune réservation pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((res) => (
            <ReservationCard key={res.id} {...res} />
          ))}
        </div>
      )}
    </main>
  );
}
