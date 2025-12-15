// Navigation fluide - CORRIGÉ pour éviter les blocages
function smoothScrollTo(target) {
    if (!target) return;
    
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = Math.max(0, target.offsetTop - headerHeight - 20);
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Navigation avec gestion des clics - AMÉLIORÉE
function initNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                smoothScrollTo(target);
            }
        });
    });
}

// Initialiser la navigation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (header) {
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    lastScroll = currentScroll;
}, { passive: true });


// Intersection Observer pour animations au scroll - OPTIMISÉ
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Ne plus observer après animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les éléments une seule fois
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Animation des cartes de service au hover
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Effet parallaxe léger - OPTIMISÉ avec requestAnimationFrame
let ticking = false;
function updateParallax() {
    const hero = document.querySelector('.hero');
    if (hero && window.pageYOffset < window.innerHeight) {
        const scrollY = window.pageYOffset;
        const parallax = scrollY * 0.3;
        hero.style.transform = `translateY(${parallax}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // S'assurer que le scroll est fluide
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Animation initiale des éléments
    setTimeout(() => {
        document.querySelectorAll('.service-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
});

// Performance: Désactiver les animations sur les appareils lents
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01s');
}

// Protection contre la copie du contenu
// Désactiver le clic droit (sauf sur les liens)
document.addEventListener('contextmenu', function(e) {
    // Permettre le clic droit sur les liens
    if (e.target.closest('a')) {
        return true;
    }
    e.preventDefault();
    return false;
});

// Désactiver les raccourcis clavier de copie
document.addEventListener('keydown', function(e) {
    // Ctrl+C, Ctrl+A, Ctrl+X, Ctrl+V, Ctrl+S, Ctrl+P, F12
    if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X' || e.key === 'a' || e.key === 'A' || e.key === 'v' || e.key === 'V' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')) ||
        (e.key === 'F12') ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c'))
    ) {
        e.preventDefault();
        return false;
    }
    
    // Désactiver Ctrl+U (afficher le code source)
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
    }
});

// Empêcher la copie via les événements
document.addEventListener('copy', function(e) {
    e.clipboardData.setData('text/plain', '');
    e.preventDefault();
    return false;
});

document.addEventListener('cut', function(e) {
    e.clipboardData.setData('text/plain', '');
    e.preventDefault();
    return false;
});

// Empêcher le glisser-déposer d'images (sauf pour les liens)
document.addEventListener('dragstart', function(e) {
    // Permettre le drag sur les liens
    if (e.target.closest('a')) {
        return true;
    }
    e.preventDefault();
    return false;
});

// Empêcher la sélection de texte (sauf pour les liens)
document.addEventListener('selectstart', function(e) {
    // Permettre la sélection sur les liens pour le focus
    if (e.target.closest('a')) {
        return true;
    }
    e.preventDefault();
    return false;
});

// Protection supplémentaire pour les images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
    });
});

// Désactiver les outils de développement (F12, Ctrl+Shift+I, etc.)
document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+C (Inspecteur)
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        return false;
    }
});

// Empêcher l'inspection d'éléments via le clic droit
let devtools = {open: false};
const element = new Image();
Object.defineProperty(element, 'id', {
    get: function() {
        devtools.open = true;
        document.body.innerHTML = '';
    }
});

setInterval(function() {
    devtools.open = false;
    console.log(element);
    if (devtools.open) {
        document.body.innerHTML = '';
    }
}, 500);

