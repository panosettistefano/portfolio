// DATA PROGETTI
const projectsData = [
    {
        title: "DOJA",
        year: "2025",
        tags: ["Figma", "Tailwind", "JavaScript", "UX Research"],
        desc: `
                    <p class="mb-6"><strong>Il Contesto:</strong> Realizzaione effettiva di una delle mie prime app disegnate in Figma durante un corso di UX/UI</p>
                    <p class="mb-6"><strong>La Soluzione Tecnica:</strong> Sviluppo di un applicazione per acquisto di opere d'arte tramite cryptovalute. Implementazione di accesso, dashboard, piccolo db per aggiunta di opere fittizie e monitoraggio del portfolio</p>
                    <p><strong>Impatto:</strong> In questo lavoro ho creato un brand Poi ho strutturato una palette, il logo, il design del sito con Figma e l'ho applicato realizzando un HTML/CSS basi integrando un piccolo database.</p>
                `,
        images: [
            "dojaimg/1 (1).png",
            "dojaimg/1 (5).png",
            "dojaimg/1 (3).png"
        ]
    },
    {
        title: "OTFZONE",
        year: "2025",
        tags: ["Graphic Design", "Brand Identity", "Wordpress", "Elementor"],
        desc: `
                    <p class="mb-6"><strong>Il Contesto:</strong> Uno dei miei primi siti realizzati in WordPress durante un corso di web design.</p>
                    <p class="mb-6"><strong>La Soluzione Tecnica:</strong>Ho utilizzato Elementor come Page Builder, ho creato un profilo utente quindi una sezione dedicata soltanto agli abbonati, un login e diverse sezioni con un form di contatto.</p>
                    <p><strong>Impatto:</strong> In questo progetto ho unito la brand identity del brand OTF creata durante un progetto universitario e realizzarla con WordPress.</p>
                `,
        images: [
            "otfzoneimg/2 (2).png",
            "otfzoneimg/2.png",
            "otfzoneimg/2 (1).png"
        ]
    },
    {
        title: "DOGTYPE",
        year: "2023",
        tags: ["Wordpress", "Blog Site", "Gutemberg", "HTML CSS"],
        desc: `
                    <p class="mb-6"><strong>Il Contesto:</strong> Progetto comune durante il corso di web design in WordPress.</p>
                    <p class="mb-6"><strong>La Soluzione Tecnica:</strong> Questo piccolo sito vetrina è stato realizzato con il resto della classe del corso e l'abbiamo fatto in circa 3 giorni realizzando appunto prima su Figma</p>
                    <p><strong>Impatto:</strong> E' stato realizzato un sito che propone un servizio di addestramento canino con diverse specifiche e un blog dedicato</p>
                `,
        images: [
            "dogtypeimg/1 (1).png",
            "dogtypeimg/1 (2).png",
            "dogtypeimg/1 (3).png"
        ],


    },
    {
        title: "Verdena",
        year: "2024",
        tags: ["Brand Identity", "Adobe Suite", "Graphic Design"],
        desc: `
                    <p class="mb-6"><strong>Il Contesto:</strong> Questo è un esempio che riguarda soltanto il graphic design e è stato realizzatal'identità di un'erboristeria.</p>
                    <p class="mb-6"><strong>La Soluzione Tecnica:</strong> Utilizzo di Suite Adobe e comFUI</p>
                    
                `,
        images: [
            "verdenaimg/1 (1).png",
            "verdenaimg/1 (2).png",
            "verdenaimg/1 (3).png"
        ]
    }
];

// GESTIONE PROGETTO (MODAL)
const projectPage = document.getElementById('project-page');
const pTitle = document.getElementById('p-title');
const pYear = document.getElementById('p-year');
const pTags = document.getElementById('p-tags');
const pDesc = document.getElementById('p-desc');
const pGallery = document.getElementById('p-gallery');

function openProject(index) {
    const data = projectsData[index];
    if (!data) return;

    pTitle.innerText = data.title;
    pYear.innerText = data.year;
    pTags.innerHTML = data.tags.map(t => `<li>/ ${t}</li>`).join('');
    pDesc.innerHTML = data.desc;

    pGallery.innerHTML = data.images.map((img, i) =>
        `<img src="${img}" alt="Dettaglio progetto ${data.title} vista ${i + 1}">`
    ).join('');

    lenis.stop();
    document.body.style.overflow = 'hidden';
    gsap.to(projectPage, { y: '0%', duration: 0.8, ease: 'power4.inOut' });
    projectPage.setAttribute('aria-hidden', 'false');
}

function closeProject() {
    gsap.to(projectPage, {
        y: '100%',
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => {
            pGallery.innerHTML = "";
            document.body.style.overflow = '';
            lenis.start();
            projectPage.setAttribute('aria-hidden', 'true');
        }
    });
}

// LENIS SMOOTH SCROLL
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// MAGNETIC CURSOR & HOVER EFFECTS (Desktop Only)
const magneticTargets = document.querySelectorAll('.magnetic-target');
magneticTargets.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    });
});

const dot = document.querySelector('.c-dot');
const ring = document.querySelector('.c-ring');

// Verifica supporto puntatore fine (mouse)
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4 });
    });
    document.querySelectorAll('a, button, .magnetic-target, .work-item').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('is-hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('is-hovering'));
    });
}


// Funzione per svelare le immagini dei progetti al passaggio dello scroll
function initImageReveal() {
    const imageWrappers = document.querySelectorAll('.work-img-wrapper');

    imageWrappers.forEach((wrapper) => {
        gsap.to(wrapper, {
            scrollTrigger: {
                trigger: wrapper,
                start: "top 85%", // Inizia l'effetto quando l'immagine è all'85% della finestra
                onEnter: () => wrapper.classList.add('is-in-view'),
                once: true // L'animazione avviene solo la prima volta
            }
        });
    });
}

// Richiama la funzione dopo che il preloader è terminato
// (Puoi inserirla nella timeline del preloader o chiamarla direttamente)
initImageReveal();

// GSAP ANIMATIONS
// --- GESTIONE PRELOADER CON MEMORIA SESSIONE ---
const preloader = document.getElementById('preloader');
const loadCount = document.getElementById('load-count');
const hasLoaded = sessionStorage.getItem('site-loaded'); // Controlla se è già stato caricato

if (hasLoaded) {
    // SE GIÀ CARICATO: Nascondi subito il preloader e mostra l'hero
    preloader.style.display = 'none';
    gsap.set(".hero-reveal-text", { y: 0, opacity: 1 });
} else {
    // SE PRIMA VOLTA: Esegui l'animazione del conteggio
    const loadTimeline = gsap.timeline();
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15); // Un po' più veloce per non annoiare
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            // Segna il sito come "caricato" nella sessione attuale
            sessionStorage.setItem('site-loaded', 'true');

            loadTimeline.to("#preloader", {
                yPercent: -100,
                duration: 1,
                ease: "expo.inOut",
                onComplete: () => preloader.style.display = 'none' // Rimuove dal DOM per performance
            })
                .to(".hero-reveal-text", { y: 0, stagger: 0.1, duration: 1.5, ease: "power4.out" }, "-=0.5")
                .to(".hero-reveal-text", { opacity: 1, duration: 1 }, "<");
        }
        loadCount.innerText = progress;
    }, 40);
}

// MENU ACCESSIBILE
const menuBtn = document.getElementById('menu-btn');
const menuOverlay = document.getElementById('menu-overlay');
let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    menuBtn.setAttribute('aria-expanded', isMenuOpen);

    if (isMenuOpen) {
        menuOverlay.setAttribute('aria-hidden', 'false');
        gsap.to(menuOverlay, { y: '0%', duration: 0.8, ease: 'power4.inOut' });
        menuBtn.innerText = "Close";
        menuBtn.style.borderColor = "var(--c-text-main)";
    } else {
        closeMenu();
    }
});

function closeMenu() {
    isMenuOpen = false;
    menuBtn.setAttribute('aria-expanded', 'false');
    gsap.to(menuOverlay, {
        y: '-100%',
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => menuOverlay.setAttribute('aria-hidden', 'true')
    });
    menuBtn.innerText = "Menu";
    menuBtn.style.borderColor = "rgba(255,255,255,0.2)";
}

// --- LOGICA TEMA CON MEMORIA (PER PRIVACY E COOKIE) ---

// 1. Controllo immediato all'avvio: se l'utente aveva scelto il tema chiaro, lo applico subito
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
}

// 2. Gestione del click sul bottone
document.getElementById('theme-btn').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    // Salvo la preferenza nel browser
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// GESTIONE FORM CONTATTI (AJAX)
const form = document.getElementById("brutalist-form");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = document.getElementById("form-status");
    const btnText = document.querySelector(".btn-text");
    const data = new FormData(event.target);

    btnText.innerHTML = "SENDING...";

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "/// TRANSMISSION RECEIVED.";
            status.classList.remove("hidden");
            status.style.color = "#4ADE80";
            form.reset();
            btnText.innerHTML = "SENT";
        } else {
            status.innerHTML = "/// ERROR: CONNECTION FAILED";
            status.classList.remove("hidden");
            status.style.color = "#EF4444";
            btnText.innerHTML = "RETRY";
        }
    }).catch(() => {
        status.innerHTML = "/// ERROR: SYSTEM OFFLINE";
        status.classList.remove("hidden");
        status.style.color = "#EF4444";
    });
});

/* 3D BACKGROUND: FUSION OPTIMIZED (TORUS + STARDUST)
 Correggi qui: Funzione totalmente riscritta per gestire lag e visibilità */
let scene, camera, renderer, torusMesh, starField;

function init3D() {
    const container = document.getElementById('webgl-bg');
    if (!container) return;
    while (container.firstChild) { container.removeChild(container.firstChild); }

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.003);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: window.innerWidth > 768 });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- GEOMETRIA (Ingrandita) ---
    const torusGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0x96649E, wireframe: true, transparent: true, opacity: 0.3
    });
    torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torusMesh);

    // --- STELLE ---
    const starsCount = window.innerWidth < 768 ? 1500 : 5000;
    const starsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starsCount * 12);
    for (let i = 0; i < starsCount * 9; i++) {
        positions[i] = (Math.random() - 0.5) * 200;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({
        size: 0.2, color: 0x913F9E, transparent: true, opacity: 1, sizeAttenuation: true
    });
    starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // --- LAYOUT UNIFICATO (Grande e Stabile) ---
    function applyLayout() {
        const w = window.innerWidth;
        const h = window.innerHeight;

        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        if (w < 768) {
            camera.position.z = 80; // Molto vicino su mobile
            torusMesh.scale.set(2.5, 2.5, 2.5); // Scala aumentata
        } else {
            camera.position.z = 80; // CAMERA VICINISSIMA per rendere l'oggetto enorme
            torusMesh.scale.set(4, 4, 4); // SCALA 4X (rispetto all'originale è gigantesco)
        }
    }

    applyLayout();
    window.addEventListener('resize', applyLayout);

    // --- ANIMAZIONE (Rallentata e Premium) ---
    let mouseX = 0.0015, mouseY = 0.0002;
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            // Ridotto il moltiplicatore per un movimento fluido e non "impazzito"
            mouseX = (e.clientX - window.innerWidth / 2) * 0.000005;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.000005;
        });
    }

    function animate() {
        requestAnimationFrame(animate);

        // Rotazione base molto lenta ed elegante
        torusMesh.rotation.y += 0.0001 + mouseX;
        torusMesh.rotation.x += 0.00002 + mouseY;

        starField.rotation.y += 0.00002;

        renderer.render(scene, camera);
    }
    animate();
}

init3D();
// Inserisci questo nel tuo blocco script dopo GSAP
const textReveals = document.querySelectorAll('.text-muted, .h-section');

textReveals.forEach((text) => {
    gsap.from(text, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: text,
            start: "top 90%", // Inizia quando il testo entra dal basso
            toggleActions: "play none none none"
        }
    });
});


const cards = document.querySelectorAll('.work-card');

cards.forEach(card => {
    const img = card.querySelector('img');

    card.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = card.getBoundingClientRect();

        // Calcola la posizione del mouse relativa alla card (-0.5 a 0.5)
        const xPos = (clientX - left) / width - 0.5;
        const yPos = (clientY - top) / height - 0.5;

        // Muovi l'immagine in direzione opposta al mouse per profondità
        gsap.to(img, {
            x: xPos * 20,
            y: yPos * 20,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(img, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        });
    });
});

// Inserisci nel tuo script esistente
const turbulence = document.querySelector('#turbulence');
const displacement = document.querySelector('#displacement');

let scrollSpeed = 0;
let lastScrollY = window.scrollY;

// Funzione per aggiornare la distorsione in base allo scroll
function updateLiquidEffect() {
    const currentScrollY = window.scrollY;
    scrollSpeed = Math.abs(currentScrollY - lastScrollY) * 0.1; // Intensità
    lastScrollY = currentScrollY;

    // Applichiamo la distorsione solo se c'è movimento
    // La scala del displacement crea l'effetto "onda"
    gsap.to(displacement, {
        attr: { scale: Math.min(scrollSpeed, 20) }, // Cap a 20 per non distorcere troppo
        duration: 0.5,
        ease: "power2.out"
    });

    // Cambiamo la frequenza della turbolenza per rendere il movimento organico
    const freq = 0.01 + (scrollSpeed * 0.001);
    turbulence.setAttribute('baseFrequency', `${freq} ${freq}`);

    requestAnimationFrame(updateLiquidEffect);
}

updateLiquidEffect();

//colore di sfondo ------------------------------------------------------------------------------------
// Funzione per aumentare il blur della Light Mode durante lo scroll
window.addEventListener('scroll', () => {
    if (document.body.classList.contains('light-mode')) {
        const scrollPercent = Math.min(window.scrollY / 500, 1);
        const blurValue = 20 + (scrollPercent * 15); // Da 20px a 35px
        const overlay = document.querySelector('#webgl-bg');
        // Applichiamo una variabile CSS dinamica se vuoi estrema precisione
        // o gestiamo direttamente via stile inline sull'after (tramite variabile)
        document.documentElement.style.setProperty('--dynamic-blur', `${blurValue}px`);
    }
});