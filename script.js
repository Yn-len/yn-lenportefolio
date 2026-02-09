const intro = document.getElementById("intro");
const site = document.getElementById("site");
const jobTitle = document.querySelector(".job-title");
const originalText = jobTitle.textContent;
jobTitle.textContent = "";

// Menu burger toggle
const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('header nav');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    nav.classList.toggle('active');
});

// Navigation dynamique 
const navButtons = document.querySelectorAll('header nav button');
const sections = document.querySelectorAll('section');

// Fermer le menu au clic sur un lien
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Intro 
setTimeout(() => {
    intro.classList.add('fade-out');
    site.classList.add('visible');
    
    setTimeout(() => {
        intro.style.display = 'none';
        typeWriter(jobTitle, originalText, 0, 150);
    }, 800);
}, 3000);

function typeWriter(element, text, index, speed) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(() => typeWriter(element, text, index, speed), speed);
    }
}

// Fonction pour retirer toutes les classes actives
function removeActiveClasses() {
    navButtons.forEach(btn => btn.classList.remove('active'));
}

// Fonction pour activer le bon bouton
function setActiveButton(index) {
    removeActiveClasses();
    navButtons[index].classList.add('active');
}

// Navigation au clic
navButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        sections[index].scrollIntoView({ behavior: 'smooth' });
        setActiveButton(index);
    });
});

// Bouton Contact CTA qui renvoie vers la section contact
const ctaContactBtn = document.querySelector('.btn-contact');
if (ctaContactBtn) {
    ctaContactBtn.addEventListener('click', () => {
        sections[4].scrollIntoView({ behavior: 'smooth' });
        setActiveButton(4);
    });
}

// Détection de la section visible pendant le scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = index;
        }
    });
    
    if (current !== '') {
        setActiveButton(current);
    }
});

// ================ Project Popup ================
const projectData = {
    1: {
        title: "Application Fitness",
        image: "LevelUpCali-description.png",
        description: "LevelUpCali est une application fitness dédiée à la callisthénie. Elle analyse les mouvements de l'utilisateur via vision par ordinateur et fournit des retours en temps réel sur la qualité d'exécution. L'application inclut un suivi de progression avec graphiques et un système de planification d'entraînement personnalisé. Ce projet m'a appris l'importance du choix de la stack technique car j'ai commencer mon application en javafx mais le packaging est impossible.",
        tech: "Html | Css | Javascript | Python",
        demo: "https://nathanworkout.github.io/LevelUpCali-version-web-/",
        github: "https://github.com/nathanWorkout/LevelUpCali"
    },
    2: {
        title: "Application Santé",
        image: "ASA1.PNG",
        description: "Pour mon projet de terminale STI2D, mon groupe et moi devons créer un robot qui transporte les résidents âgés d'un EPHAD du point A au point B, soulageant ainsi les soignants d'une partie de leur charge de travail. J'ai personnellement développé l'application. Elle permet aux soignants de configurer des itinéraires, de saisir les paramètres du fauteuil roulant, et permet au résident âgé de choisir son itinéraire préféré.",
        tech: "Html | Css | Javascript | Leaflet.js | Node.js | Sql",
        demo: "#",
        github: "https://github.com/nathanWorkout/ASA---Aide-soignant-autonome"

    },
    3: {
        title: "Langage de Programmation",
        image: "NPL1.PNG",
        description: "Langage de programmation personnel conçu en C, explorant l'analyse lexicale, syntaxique et l'exécution. Comprend une syntaxe personnalisée, gestion mémoire et gestion d'erreurs robuste. Ce projet m'a appris la patience et la perséverance car j'écrit en moyenne 20-30 lignes par jour et je passe de nombreuses heures à résoudre des bugs.",
        tech: "C",
        demo: "#",
        github: "https://github.com/nathanWorkout/Nathan-Programing-Langage"
    },
    4: {
        title: "Système d'Exploitation",
        image: "OS.png",
        description: "Mon plus grand défi de programmation : créer un OS de zéro, avec un affichage graphique et un terminal intégré pouvant exécuter mon langage.",
        tech: "C | Assembly",
        demo: "#",
        github: "#"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const viewButtons = document.querySelectorAll('.btn-view-project');
    const popup = document.getElementById('project-popup');
    const closeBtn = document.querySelector('.popup-close');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = this.dataset.project;
            openPopup(projectId);
        });
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.dataset.project;
            openPopup(projectId);
        });
    });

    closeBtn.addEventListener('click', closePopup);
    
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    function openPopup(projectId) {
        const project = projectData[projectId];
        document.getElementById('popup-title').textContent = project.title;
        document.getElementById('popup-img').src = project.image;
        document.getElementById('popup-description').textContent = project.description;
        document.getElementById('popup-tech-list').textContent = project.tech;
        const links = document.querySelectorAll('.btn-popup-link');
        links[0].href = project.demo;
        links[1].href = project.github;
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});