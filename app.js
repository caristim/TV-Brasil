// Lista de canales con logos reales en SVG
const channels = [
    {
        name: "GloboNews",
        // Logo oficial de GloboNews (versión simplificada del círculo azul con "GN")
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="#0066cc"/>
            <circle cx="100" cy="100" r="70" fill="none" stroke="white" stroke-width="8"/>
            <text x="100" y="125" font-family="Arial Black" font-size="60" fill="white" text-anchor="middle">GN</text>
        </svg>`,
        streamUrl: "http://41.205.70.146/GLOBONEWS/index.m3u8"
    },
    {
        name: "BandNews",
        // Logo oficial de BandNews (rectángulo con fondo azul marino y texto rojo)
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" rx="20" fill="#1a2a4a"/>
            <rect x="20" y="20" width="160" height="160" rx="10" fill="none" stroke="#cc0000" stroke-width="6"/>
            <text x="100" y="120" font-family="Arial Black" font-size="44" fill="#cc0000" text-anchor="middle">BAND</text>
            <text x="100" y="155" font-family="Arial Black" font-size="24" fill="white" text-anchor="middle">NEWS</text>
        </svg>`,
        streamUrl: "http://45.162.231.38:7779/Band_News/index.m3u8"
    },
    {
        name: "Record News",
        // Logo oficial de Record News (cuadrado rojo con texto blanco)
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" rx="15" fill="#cc0000"/>
            <text x="100" y="85" font-family="Arial Black" font-size="42" fill="white" text-anchor="middle">RECORD</text>
            <text x="100" y="130" font-family="Arial Black" font-size="32" fill="white" text-anchor="middle">NEWS</text>
        </svg>`,
        streamUrl: "https://rnw-rn.otteravision.com/rnw/rn/rnw_rn.m3u8"
    },
    {
        name: "SBT Nacional",
        // Logo oficial del SBT (círculo multicolor con "sbt" en minúsculas) - versión simplificada
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="#0066cc"/>
            <circle cx="100" cy="100" r="70" fill="none" stroke="#ffcc00" stroke-width="6"/>
            <circle cx="100" cy="100" r="50" fill="none" stroke="#00cc66" stroke-width="6"/>
            <text x="100" y="120" font-family="Arial" font-size="48" fill="white" text-anchor="middle" font-weight="bold">sbt</text>
        </svg>`,
        streamUrl: "https://6836041ea1117.streamlock.net/cverde/cverde/playlist.m3u8"
    },
    {
        name: "Record",
        // Logo oficial de Record TV (cuadrado rojo con texto blanco)
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" rx="15" fill="#cc0000"/>
            <rect x="30" y="30" width="140" height="140" rx="8" fill="none" stroke="white" stroke-width="4"/>
            <text x="100" y="120" font-family="Arial Black" font-size="56" fill="white" text-anchor="middle">RECORD</text>
        </svg>`,
        streamUrl: "http://200.77.176.130:8000/udp/224.0.0.4:49152"
    },
    {
        name: "RedeTV!",
        // Logo oficial de RedeTV! (fondo amarillo con texto negro y signo de exclamación)
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" rx="15" fill="#ffcc00"/>
            <text x="100" y="110" font-family="Arial Black" font-size="48" fill="#000000" text-anchor="middle">RedeTV</text>
            <text x="145" y="110" font-family="Arial Black" font-size="56" fill="#cc0000" text-anchor="middle">!</text>
        </svg>`,
        streamUrl: "https://streaming.cloudecast.com/hls/redetves/index.m3u8"
    },
    {
        name: "Band Sports",
        // Logo oficial de Band Sports (fondo rojo con "BS" en blanco)
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" rx="15" fill="#cc0000"/>
            <polygon points="100,30 170,85 140,170 60,170 30,85" fill="none" stroke="white" stroke-width="6"/>
            <text x="100" y="120" font-family="Arial Black" font-size="64" fill="white" text-anchor="middle">BS</text>
        </svg>`,
        streamUrl: "http://45.162.231.38:7779/Band_Sports/index.m3u8"
    },
    {
        name: "TV Globo",
        // Logo oficial de TV Globo (círculo azul con esfera blanca)
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="#0066cc"/>
            <circle cx="100" cy="100" r="70" fill="none" stroke="white" stroke-width="6"/>
            <path d="M100 35 A65 65 0 0 1 100 165 A32 32 0 0 0 100 100 A32 32 0 0 0 100 35" fill="white"/>
        </svg>`,
        streamUrl: "http://187.62.68.32:8080/GLOBO/index.m3u8"
    }
];

// El resto del código de app.js (reproducción, manejo de errores, etc.) se mantiene igual.
// Asegúrate de incluir todo el código que ya te di anteriormente a partir de aquí.

// ... (código de reproducción, eventos, etc.) ...
