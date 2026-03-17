/* ============================================
   ARULMIGU BHADRESHWARI AMMAN KOVIL
   Master JavaScript — All Pages
============================================ */

// ===== PRELOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hidden');
    }, 2200);
});

// ===== FLOATING PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 35; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 5) + 's';
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        container.appendChild(particle);
    }
}
createParticles();

// ===== MOBILE MENU TOGGLE =====
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    if (menu) menu.classList.toggle('active');
    if (hamburger) hamburger.classList.toggle('active');
}

// Close menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        if (menu) menu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// ===== ACTIVE NAV HIGHLIGHT =====
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}
setActiveNav();

// ===== BACK TO TOP BUTTON =====
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}
initScrollAnimations();

// ===== AUDIO PLAYER =====
let audioPlayer = null;
let isPlaying = false;

// Replace these paths with actual audio files in your /audio/ folder
const audioTracks = {
    'amman-song': 'audio/amman-song.mp3',
    'lalitha-sahasranamam': 'audio/lalitha-sahasranamam.mp3',
    'abirami-anthathi': 'audio/abirami-anthathi.mp3',
    'durga-manthiram': 'audio/durga-manthiram.mp3',
    'amman-suprabatham': 'audio/amman-suprabatham.mp3'
};

function initAudio() {
    audioPlayer = new Audio();
    audioPlayer.loop = true;
    audioPlayer.volume = 0.7;
}

function toggleAudio() {
    if (!audioPlayer) initAudio();

    const playBtn = document.getElementById('playBtn');
    if (!playBtn) return;

    if (!isPlaying) {
        const select = document.getElementById('audioSelect');
        const track = select ? select.value : 'amman-song';
        audioPlayer.src = audioTracks[track];
        audioPlayer.play().catch(e => console.log('Audio blocked:', e));
        playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        isPlaying = true;
    } else {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
        isPlaying = false;
    }
}

function stopAudio() {
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
    const playBtn = document.getElementById('playBtn');
    if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
    isPlaying = false;
}

function changeAudio() {
    if (isPlaying && audioPlayer) {
        const select = document.getElementById('audioSelect');
        const track = select ? select.value : 'amman-song';
        audioPlayer.src = audioTracks[track];
        audioPlayer.play();
    }
}

// ===== IMAGE UPLOAD MANAGER =====
function initUploadManager(uploadId, previewId, folderName) {
    const uploadArea = document.getElementById(uploadId);
    const fileInput = uploadArea?.querySelector('input[type="file"]');
    const previewContainer = document.getElementById(previewId);

    if (!uploadArea || !fileInput) return;

    // Click to upload
    uploadArea.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            fileInput.click();
        }
    });

    // Drag & Drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#FFD700';
        uploadArea.style.background = 'rgba(212, 168, 67, 0.05)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '';
        uploadArea.style.background = '';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '';
        uploadArea.style.background = '';
        handleFiles(e.dataTransfer.files, previewContainer, folderName);
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files, previewContainer, folderName);
    });
}

function handleFiles(files, previewContainer, folderName) {
    if (!previewContainer) return;

    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const item = document.createElement('div');
            item.classList.add('preview-item');
            item.innerHTML = `
                <img src="${e.target.result}" alt="${file.name}">
                <button class="remove-btn" onclick="this.parentElement.remove()" title="Remove">
                    <i class="fas fa-times"></i>
                </button>
            `;
            previewContainer.appendChild(item);

            // Store file info for later upload
            console.log(`File ready for upload to images/${folderName}/: ${file.name}`);
        };
        reader.readAsDataURL(file);
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== DONATE OPTION SELECTION =====
document.querySelectorAll('.donate-option').forEach(option => {
    option.addEventListener('click', function () {
        document.querySelectorAll('.donate-option').forEach(o => o.classList.remove('selected'));
        this.classList.add('selected');
    });
});