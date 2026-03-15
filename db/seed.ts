import { db, Radio, sql } from 'astro:db';

export default async function seed() {
    const radioStations = [
        {
            id: "chillhop",
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
            id: "jazz-schwarzenstein",
            title: "Jazzradio Schwarzenstein",
            url: "https://channels.fluxfm.de/jazz-schwarzenstein/externalembedflxhp/stream.aac",
            thumbnail: "/covers/jazzradio-schwarzenstein.webp",
            genre: "Jazz"
        },
        {
            id: "x-jazz",
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
            id: "70s",
            title: "70s Radio",
            url: "https://channels.fluxfm.de/70s/externalembedflxhp/stream.aac",
            thumbnail: "/covers/70s.webp",
            genre: "Disco / Funk / Rock"
        },
        {
            id: "80s",
            title: "80s Radio",
            url: "https://channels.fluxfm.de/80s/externalembedflxhp/stream.aac",
            thumbnail: "/covers/80s.webp",
            genre: "Pop / Rock / R&B"
        },
        {
            id: "90s",
            title: "90s Radio",
            url: "https://channels.fluxfm.de/90s/externalembedflxhp/stream.aac",
            thumbnail: "/covers/90s.webp",
            genre: "Pop / Rock / Hip Hop"
        },
        {
            id: "2000er",
            title: "2000er Radio",
            url: "https://channels.fluxfm.de/2000er/externalembedflxhp/stream.aac",
            thumbnail: "/covers/00er.webp",
            genre: "Pop-Rock / Indie Rock / Hip Hop"
        },
        {
            id: "clubsandwich",
            title: "Club Sandwich",
            url: "https://channels.fluxfm.de/clubsandwich/externalembedflxhp/stream.aac",
            thumbnail: "/covers/club-sandwich.webp",
            genre: "House / Techno"
        },
        {
            id: "b-funk",
            title: "B Funk",
            url: "https://channels.fluxfm.de/b-funk/externalembedflxhp/stream.aac",
            thumbnail: "/covers/b-funk.webp",
            genre: "Funk / R&B"
        },
        {
            id: "htgp",
            title: "Hippie Trippy Garden Pretty",
            url: "https://channels.fluxfm.de/htgp/externalembedflxhp/stream.aac",
            thumbnail: "/covers/hippie-trippy.webp",
            genre: "Ambient / Chillout"
        },
        {
            id: "indiedisco",
            title: "Indie Disco",
            url: "https://channels.fluxfm.de/indiedisco/externalembedflxhp/stream.aac",
            thumbnail: "/covers/indie-disco.webp",
            genre: "Indie / Disco"
        },
        {
            id: "flux-lounge",
            title: "FluxLounge Radio",
            url: "https://channels.fluxfm.de/flux-lounge/externalembedflxhp/stream.aac",
            thumbnail: "/covers/flux-lounge.webp",
            genre: "Pop"
        },
        {
            id: "fluxfm-finest",
            title: "FluxFM Finest",
            url: "https://channels.fluxfm.de/fluxfm-finest/externalembedflxhp/stream.aac",
            thumbnail: "/covers/flux-finest.webp",

        },
        {
            id: "neofm",
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
            id: "elektro-flux",
            title: "Elektroflux Radio",
            url: "https://channels.fluxfm.de/elektro-flux/externalembedflxhp/stream.aac",
            thumbnail: "/covers/elektroflux.webp",
            genre: "Electronic / Pop"

        },
        {
            id: "berlin-beach-house",
            title: "Berlin Beach House Radio",
            url: "https://channels.fluxfm.de/berlin-beach-house/externalembedflxhp/stream.aac",
            thumbnail: "/covers/berlin-beach-house.webp",
            genre: "House"
        },
        {
            id: "boom-fm-classics",
            title: "HipHop Classics",
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
            id: "listen-to-berlin",
            title: "Listen to Berlin",
            url: "https://channels.fluxfm.de/listen-to-berlin/externalembedflxhp/stream.mp3",
            thumbnail: "/covers/listen-to-berlin.webp",
            genre: "Indie / Techno / Alternative "
        },
        {
            id: "fluxfm",
            title: "FluxFM Livestream",
            url: "https://channels.fluxfm.de/FluxFM/externalembedflxhp/stream.aac",
            thumbnail: "/covers/flux-main.webp",
            genre: "Indie / Pop"
        },
        {
            id: "alternative",
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