import { db, Radio, sql } from 'astro:db';

export default async function seed() {
    const radioStations = [
        {
            id: "chillhop-radio",
            title: "Chillhop Radio",
            url: "https://channels.fluxfm.de/chillhop/externalembedflxhp/stream.aac",
            thumbnail: "/covers/chillhop.webp",
            genre: "Lofi / Hip Hop"
        },
        {
            id: "chillout-radio",
            title: "Chillout Radio",
            url: "https://channels.fluxfm.de/chillout-radio/externalembedflxhp/stream.aac",
            thumbnail: "/covers/chillout-radio.webp",
            genre: "Chillout"
        },
        {
            id: "jazzradio-schwarzenstein",
            title: "Jazzradio Schwarzenstein",
            url: "https://channels.fluxfm.de/jazz-schwarzenstein/externalembedflxhp/stream.aac",
            thumbnail: "/covers/jazzradio-schwarzenstein.webp",
            genre: "Jazz"
        },
        {
            id: "xjazz",
            title: "Xjazz",
            url: "https://channels.fluxfm.de/x-jazz/externalembedflxhp/stream.aac",
            thumbnail: "/covers/xjazz.webp",
            genre: "Jazz"
        },
        {
            id:"60s",
            title: "60s Radio",
            url:  "https://channels.fluxfm.de/60s/externalembedflxhp/stream.aac",
            thumbnail: "/covers/60s.webp",
            genre: "Pop / Rock / Motown"
        },
        {
            id: "b-funk",
            title: "B Funk",
            url: "https://channels.fluxfm.de/b-funk/externalembedflxhp/stream.aac",
            thumbnail: "/covers/b-funk.webp",
            genre: "Funk / R&B"
        },
        {
            id: "hippie-trippy",
            title: "Hippie Trippy Garden Pretty",
            url: "https://channels.fluxfm.de/htgp/externalembedflxhp/stream.aac",
            thumbnail: "/covers/hippie-trippy.webp",
            genre: "Ambient / Chillout"
        },
        {
            id: "indie-disco",
            title: "Indie Disco",
            url: "https://channels.fluxfm.de/indiedisco/externalembedflxhp/stream.aac",
            thumbnail: "/covers/indie-disco.webp",
            genre: "Indie / Disco"
        },
        {
            id: "neo-fm",
            title: "NeoFM",
            url: "https://channels.fluxfm.de/neofm/externalembedflxhp/stream.aac",
            thumbnail: "/covers/neo-fm.webp",
            genre: "Experimental"
        },
        {
            id: "techno-underground",
            title: "Techno Underground",
            url: "https://channels.fluxfm.de/techno-underground/externalembedflxhp/stream.aac",
            thumbnail: "/covers/techno-underground.webp",
            genre: "Techno"
        },
        {
            id: "berlin-beach-house",
            title: "Berlin Beach House Radio",
            url: "https://channels.fluxfm.de/berlin-beach-house/externalembedflxhp/stream.aac",
            thumbnail: "/covers/berlin-beach-house.webp",
            genre: "House"
        },
        {
            id: "hip-hop-classics",
            title: "HipHop Classics (ehem. BoomFM Classics)",
            url: "https://channels.fluxfm.de/boom-fm-classics/externalembedflxhp/stream.aac",
            thumbnail: "/covers/hip-hop-classics.webp",
            genre: "Hip Hop / Rap"
        },
        {
            id: "sound-of-berlin",
            title: "Sound of Berlin",
            url: "https://channels.fluxfm.de/sound-of-berlin/externalembedflxhp/stream.aac",
            thumbnail: "/covers/sound-of-berlin.webp",
            genre: "Electro / Techno"
        },
        {
            id: "flux-main",
            title: "FluxFM Livestream",
            url: "https://channels.fluxfm.de/FluxFM/externalembedflxhp/stream.aac",
            thumbnail: "/covers/flux-main.webp",
            genre: "Indie / Pop"
        },
        {
            id: "radio-alternative",
            title: "Radio Alternative",
            url: "https://channels.fluxfm.de/alternative/externalembedflxhp/stream.aac",
            thumbnail: "/covers/alternative.webp",
            genre: "Alternative / Rock"
        },
        {
            id: "metal-fm",
            title: "MetalFM",
            url: "https://channels.fluxfm.de/metal-fm/externalembedflxhp/stream.aac",
            thumbnail: "/covers/metal-fm.webp",
            genre: "Metal"
        }
        // Agrega más aquí siguiendo este mismo formato exacto
    ];

    console.log("🚀 Iniciando siembra de radios...");

    try {
        await db.insert(Radio)
            .values(radioStations)
            .onConflictDoUpdate({
                target: Radio.id,
                set: {
                    title: sql`excluded.title`,
                    url: sql`excluded.url`,
                    thumbnail: sql`excluded.thumbnail`,
                    genre: sql`excluded.genre`
                }
            });

        console.log("✨ ¡Base de datos sincronizada!");
    } catch (e) {
        console.error("❌ Error fatal en el seed:", e);
    }
}