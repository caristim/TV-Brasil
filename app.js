const channels = [
    {
        name: "Globo",
        logoSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="#0066cc"/>
            <path d="M100 30 A70 70 0 0 1 100 170 A35 35 0 0 0 100 100 A35 35 0 0 0 100 30" fill="white"/>
        </svg>`,
        streamUrl: "https://globoplay-live-a.akamaized.net/hls/live/2038798/globo_rj/playlist.m3u8"
    },
    {
        name: "Band",
        logoSvg: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="100" fill="#1a1a1a"/>
            <text x="100" y="65" font-family="Arial Black" font-size="50" fill="#00aaff" text-anchor="middle">BAND</text>
        </svg>`,
        streamUrl: "https://cdn.live.br1.vusioncloud.net/live/band-com-br/master.m3u8"
    },
    {
        name: "SBT",
        logoSvg: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="100" fill="#0066cc"/>
            <text x="100" y="65" font-family="Arial Black" font-size="50" fill="white" text-anchor="middle">SBT</text>
        </svg>`,
        streamUrl: "https://cdnlive.sbt.com.br/live/sbt/playlist.m3u8"
    },
    {
        name: "Record",
        logoSvg: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="100" fill="#cc0000"/>
            <text x="100" y="65" font-family="Arial Black" font-size="40" fill="white" text-anchor="middle">RECORD</text>
        </svg>`,
        streamUrl: "https://cdn.jmvstream.com/w/LVW-10842/playlist.m3u8"
    },
    {
        name: "RedeTV!",
        logoSvg: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="100" fill="#ffcc00"/>
            <text x="100" y="60" font-family="Arial Black" font-size="35" fill="#000" text-anchor="middle">RedeTV!</text>
        </svg>`,
        streamUrl: "https://tv02.redetv.com.br/live/index.m3u8"
    },
    {
        name: "TV Brasil",
        logoSvg: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="100" fill="#009639"/>
            <text x="100" y="45" font-family="Arial Black" font-size="28" fill="#ffdf00" text-anchor="middle">TV</text>
            <text x="100" y="75" font-family="Arial Black" font-size="28" fill="#ffdf00" text-anchor="middle">BRASIL</text>
        </svg>`,
        streamUrl: "https://tvbrasil-stream.ebc.com.br/index.m3u8"
    }
];

const container = document.getElementById('channels-container');
const playerContainer = document.getElementById('video-player-container');
const video = document.getElementById('video-player');
const loading = document.getElementById('loading');
let hls = null;

const isPCBrowser = !/Android|TV|BRAVIA|CrKey|SmartTV/i.test(navigator.userAgent);

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

function playStream(url, channelName) {
    playerContainer.classList.remove('hidden');
    loading.style.display = 'block';
    loading.innerText = `Cargando ${channelName}...`;
    video.style.display = 'none';
    
    if (hls) {
        hls.destroy();
        hls = null;
    }
    
    video.pause();
    video.removeAttribute('src');
    video.load();

    if (isPCBrowser && Hls.isSupported()) {
        hls = new Hls({ enableWorker: true });
        hls.loadSource(url);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            loading.style.display = 'none';
            video.style.display = 'block';
            video.play().catch(() => {
                loading.innerText = "Dale play manualmente";
                loading.style.display = 'block';
            });
        });
        
        hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
                loading.innerText = channelName === "Globo" 
                    ? `Globo se cortó. Puede ser por deportes.` 
                    : `${channelName}: Error de conexión.`;
            }
        });
        
    } else {
        video.src = url;
        video.onloadeddata = () => {
            loading.style.display = 'none';
            video.style.display = 'block';
            video.play();
        };
        video.onerror = () => {
            loading.innerText = `${channelName}: No se puede reproducir aquí.`;
        };
        video.load();
    }
}

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
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !playerContainer.classList.contains('hidden')) {
        closePlayer();
    }
});
