// pages/api/bookings.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!process.env.BOOKINGSYNC_TOKEN) {
      throw new Error("BookingSync token non configuré");
    }

    const response = await axios.get(
      "https://www.bookingsync.com/api/v3/bookings",
      {
        headers: {
          Authorization: `Bearer ${process.env.BOOKINGSYNC_TOKEN}`,
          Accept: "application/json",
        },
        params: {
          status: "booked"
        },
        timeout: 10000 // 10 secondes timeout
      }
    );

    if (!response.data.bookings) {
      throw new Error("Structure de réponse inattendue");
    }

    return res.status(200).json(response.data.bookings);
  } catch (error: any) {
    console.error("Erreur API BookingSync:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    return res.status(error.response?.status || 500).json({
      error: error.message || "Erreur lors de la récupération des données",
      details: error.response?.data
    });
  }
}