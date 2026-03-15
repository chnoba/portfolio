export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
    const id = url.searchParams.get('id');
    if (!id) return new Response(null, { status: 400 });

    try {
        const response = await fetch(`https://fluxmusic.api.radiosphere.io/channels/${id}/current-track`);

        if (response.status === 204) {
            return new Response(JSON.stringify({ title: "Publicidad / Live", author: "", artwork: "" }), { status: 200 });
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