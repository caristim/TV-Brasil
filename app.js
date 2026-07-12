// Lista de canales (actualizada con IPTV Brasil.txt)
const channels = [
    {
        name: "GloboNews",
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="90" fill="#0066cc"/><text x="100" y="120" font-family="Arial Black" font-size="60" fill="white" text-anchor="middle">GN</text></svg>`,
        streamUrl: "http://41.205.70.146/GLOBONEWS/index.m3u8"
    },
    {
        name: "BandNews",
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#cc0000"/><text x="100" y="120" font-family="Arial Black" font-size="40" fill="white" text-anchor="middle">BAND<br/>NEWS</text></svg>`,
        streamUrl: "http://45.162.231.38:7779/Band_News/index.m3u8"
    },
    {
        name: "Record News",
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#cc0000"/><text x="100" y="120" font-family="Arial Black" font-size="36" fill="white" text-anchor="middle">RECORD<br/>NEWS</text></svg>`,
        streamUrl: "https://rnw-rn.otteravision.com/rnw/rn/rnw_rn.m3u8"
    },
    {
        name: "SBT Nacional",
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#0066cc"/><text x="100" y="120" font-family="Arial Black" font-size="48" fill="white" text-anchor="middle">SBT</text></svg>`,
        streamUrl: "https://6836041ea1117.streamlock.net/cverde/cverde/playlist.m3u8"
    },
    {
        name: "Record",
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#cc0000"/><text x="100" y="120" font-family="Arial Black" font-size="50" fill="white" text-anchor="middle">RECORD</text></svg>`,
        streamUrl: "http://200.77.176.130:8000/udp/224.0.0.4:49152"  // UDP, probablemente no funcione
    },
    {
        name: "RedeTV!",
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#ffcc00"/><text x="100" y="120" font-family="Arial Black" font-size="40" fill="#000" text-anchor="middle">RedeTV!</text></svg>`,
        streamUrl: "https://streaming.cloudecast.com/hls/redetves/index.m3u8"
    },
    {
        name: "Band Sports",
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#00aaff"/><text x="100" y="120" font-family="Arial Black" font-size="40" fill="white" text-anchor="middle">BAND<br/>SPORTS</text></svg>`,
        streamUrl: "http://45.162.231.38:7779/Band_Sports/index.m3u8"
    },
    {
        name: "TV Globo",
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="90" fill="#0066cc"/><path d="M100 30 A70 70 0 0 1 100 170 A35 35 0 0 0 100 100 A35 35 0 0 0 100 30" fill="white"/></svg>`,
        streamUrl: "http://187.62.68.32:8080/GLOBO/index.m3u8"
    }
];

// Elementos DOM
const container = document.getElementById('channels-container');
const playerContainer = document.getElementById('video-player-container');
const video = document.getElementById('video-player');
const loading = document.getElementById('loading');
const retryBtn = document.getElementById('retry-btn');

let hls = null;
let currentStreamUrl = '';
let currentChannelName = '';
let retryCount = 0;
const MAX_RETRIES = 2;

// Detectar soporte nativo de HLS (Safari)
const nativeHlsSupport = video.canPlayType('application/vnd.apple.mpegurl');

// Renderizar tarjetas de canales
channels.forEach((channel) => {
    const card = document.createElement('div');
    card.classList.add('channel-card');
    card.setAttribute('tabindex', '0');
    
    card.innerHTML = `
        <div class="channel-logo">${channel.logoSvg}</div>
        <span class="channel-name">${channel.name}</span>
    `;

    const playAction = () => playStream(channel.streamUrl, channel.name);
    card.addEventListener('click', playAction);
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') playAction();
    });

    container.appendChild(card);
});

// Función principal de reproducción
function playStream(url, channelName) {
    currentStreamUrl = url;
    currentChannelName = channelName;
    retryCount = 0;
    
    playerContainer.classList.remove('hidden');
    loading.style.display = 'block';
    loading.innerText = `Cargando ${channelName}...`;
    video.style.display = 'none';
    retryBtn.style.display = 'none';
    
    if (hls) {
        hls.destroy();
        hls = null;
    }
    
    video.pause();
    video.removeAttribute('src');
    video.load();

    // Intentar con HLS.js si está disponible
    if (Hls && Hls.isSupported()) {
        hls = new Hls({ 
            enableWorker: true, 
            lowLatencyMode: true 
        });
        hls.loadSource(url);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            loading.style.display = 'none';
            video.style.display = 'block';
            retryBtn.style.display = 'none';
            video.play().catch(err => {
                // Autoplay bloqueado
                loading.innerText = 'Haz clic en el vídeo para reproducir';
                loading.style.display = 'block';
                showRetryButton();
            });
        });
        
        hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
                handleError(data.details);
            }
        });
    } else if (nativeHlsSupport) {
        // Safari / navegadores con soporte nativo HLS
        video.src = url;
        video.onloadeddata = () => {
            loading.style.display = 'none';
            video.style.display = 'block';
            retryBtn.style.display = 'none';
            video.play();
        };
        video.onerror = (e) => {
            handleError('native_error');
        };
        video.load();
    } else {
        loading.innerText = 'Tu navegador no soporta HLS.';
        showRetryButton();
    }
}

// Manejo de errores
function handleError(details) {
    let msg = `Error al cargar ${currentChannelName}`;
    let isRegionBlock = false;

    // Identificar posibles causas
    if (details === 'manifestLoadError' || details === 'manifestParsingError') {
        msg = `No se pudo cargar el stream de ${currentChannelName}.`;
        // Si es Globo o Band, sugerir bloqueo regional
        if (currentChannelName === 'TV Globo' || currentChannelName === 'BandNews' || currentChannelName === 'SBT Nacional') {
            msg += ' Puede estar bloqueado en tu país. Prueba con una VPN y selecciona Brasil.';
            isRegionBlock = true;
        }
    } else if (details === 'fragLoadError' || details === 'fragParsingError') {
        msg = `El stream se interrumpió. Puede ser un problema temporal.`;
    } else if (details === 'native_error') {
        msg = `Error nativo del reproductor. Verifica la URL.`;
    } else {
        msg = `Error inesperado. Intenta de nuevo.`;
    }

    loading.innerText = msg;
    loading.style.display = 'block';
    video.style.display = 'none';
    showRetryButton();
}

// Mostrar botón de reintento
function showRetryButton() {
    retryBtn.style.display = 'block';
    retryBtn.textContent = 'Reintentar';
    retryBtn.onclick = () => {
        retryCount++;
        if (retryCount > MAX_RETRIES) {
            retryBtn.textContent = 'Reintentar (máximo intentos)';
            retryBtn.disabled = true;
            loading.innerText = 'No se pudo conectar después de varios intentos. Verifica tu conexión.';
            return;
        }
        playStream(currentStreamUrl, currentChannelName);
    };
}

// Cerrar reproductor
function closePlayer() {
    playerContainer.classList.add('hidden');
    video.pause();
    video.src = "";
    video.removeAttribute('src');
    video.load();
    if (hls) {
        hls.destroy();
        hls = null;
    }
    loading.innerText = "Cargando...";
    retryBtn.style.display = 'none';
    retryBtn.disabled = false;
    retryCount = 0;
}

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !playerContainer.classList.contains('hidden')) {
        closePlayer();
    }
});

// Exponer closePlayer globalmente para el botón HTML
window.closePlayer = closePlayer;
