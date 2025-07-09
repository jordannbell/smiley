// lib/api.ts
interface Booking {
  id: number;
}

export async function getReservations(): Promise<Booking[]> {
  try {
    const response = await fetch("/api/bookings");
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.error || `Erreur HTTP: ${response.status}`
      );
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error("Format de données invalide");
    }

    return data;
  } catch (error) {
    console.error("Erreur de récupération:", error);
 
    return []; 
  }
}