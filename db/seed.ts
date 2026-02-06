import { db, Radio, sql } from 'astro:db';

export default async function seed() {
    const videoIds = [
        "jfKfPfyJRdk", "4xDzrJKXOOY", "SnX4knSvyko",
        "HuFYqnbVbzY", "28KRPhVzCus", "xORCbIptqcc",
        "A8jDx9TLMQc", "1oDrJba2PSs",
        "jXAEIWcGXwE", "XSXEaikz0Bc", "E_XmwjgRLz8",
        "3GQY80jyysQ", "D5CnzCepdQ8",
        "IxPANmjPaek", "P6Segk8cr-c",
        "TtkFsfOP9QI", "Na0w3Mz46GA", "S_MOd40zlYU"

    ];

    console.log("🚀 Iniciando siembra de datos...");

    const radioEntries = await Promise.all(videoIds.map(async (id) => {
        const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(`✅ Datos obtenidos: ${data.title}`);

            return {
                id: id,
                title: data.title,
                thumbnail: data.thumbnail_url,
                genre: "Lofi / Beats"
            };
        } catch (e) {
            console.error(`❌ Error con el video ${id}:`, e);
            return null;
        }
    }));

    const validEntries = radioEntries.filter(entry => entry !== null);

    // 1. Intentamos insertar
    await db.insert(Radio)
        .values(validEntries)
        // 2. Si el ID ya existe...
        .onConflictDoUpdate({
            target: Radio.id,
            // 3. Actualizamos el título y la miniatura con los nuevos datos de YT
            set: {
                title: sql`excluded.title`,
                thumbnail: sql`excluded.thumbnail`
            }
        });

    console.log("✨ ¡Base de datos sincronizada correctamente!");
}