export const prerender = false;

import type { APIRoute } from 'astro';
import { STATIONS } from '../../data/stations';

export const GET: APIRoute = async ({ url }) => {
    const id = url.searchParams.get('id')
    const stationExists = STATIONS.some(s => s.id === id);

    if (!id || !stationExists) {
        return new Response(JSON.stringify({ error: "Estación no encontrada" }), { status: 404 });
    }

    try {
        const response = await fetch(`https://fluxmusic.api.radiosphere.io/channels/${id}/current-track`);

        if (response.status === 204) {
            return new Response(JSON.stringify({ title: "", author: "", artwork: "" }), { status: 200 });
        }

        const data = await response.json();

        // Extraemos solo lo que pediste
        return new Response(JSON.stringify({
            title: data.trackInfo.title,
            author: data.trackInfo.artistCredits,
            artwork: data.trackInfo.artwork
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: "No se pudo obtener la data" }), { status: 500 });
    }
}