// components/ReservationCard.tsx
import dayjs from "dayjs";

interface Props {
  id: number;
  start_at: string;
  end_at: string;
  reference: string;
}

export default function ReservationCard({ id, start_at, end_at, reference }: Props) {
  return (
    <div className="border rounded-2xl p-5 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-blue-600">Réservation #{id}</h2>
        <span className="text-sm text-gray-500">{reference}</span>
      </div>
      <p className="text-sm text-gray-700">
        <strong>Entrée :</strong> {dayjs(start_at).format("DD/MM/YYYY HH:mm")}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Sortie :</strong> {dayjs(end_at).format("DD/MM/YYYY HH:mm")}
      </p>
    </div>
  );
}
