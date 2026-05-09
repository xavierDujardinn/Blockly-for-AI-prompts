const tutorialSteps = [
    {
        title: "Bienvenue dans le concepteur de prompts par blocs !",
        text: "Cet outil est là pour t'apprendre à structurer avec tes prompt pour améliorer la pertinence des réponses de l'IA.\nCe tutoriel t'expliquera les différents blocs et comment les utiliser pour créer des prompts efficaces.",
    },
    {
        title: "L'importance de bien structurer ses prompts",
        text: "Le modèle de structure proposé dans cette application est une dérivation des framework CO-STAR et RTF qui sont des méthodes éprouvées pour construire des prompts efficaces.\n Ceux-ci se basent sur une découpe du prompt en différents blocs.\nCela permet à l'IA de mieux comprendre ce que tu lui demandes.",
        image: "images/co-star.png"
    },
    {
        title: "C'est quoi ce résultat bizarre ?",
        text: "Le format du prompt généré à la fin peut sembler un peu étrange mais ne panique pas, c'est normal !\n En fait ton prompt est transformé vers un modèle déclaratif appelé NLD-P.\nC'est un cran au dessus en terme de complexité mais c'est encore mieux pour l'IA car tes informations deviennent des variables. Facile à comprendre pour un ordinateur !",
        image: "images/nld-p.png"
    },
    {
        title: "Les différents types de blocs",
        text: "Il existe plusieurs types de blocs dans l'application, chacun ayant un rôle spécifique pour structurer ton prompt.\nCertains ne sont pas obligatoires mais ils restent tous important pour construire un prompt parfait.",
    },
    {
        title: "Bloc IDENT",
        text: "Ce premier bloc est obligatoire. Il forme la fondation du reste du prompt.\nIl définit des éléments comme le mode de fonctionnement global et la version du framework utilisé.",
        image: "images/ident.png"
    },
    {
        title: "Blocs de règles",
        text: "Ceux-ci sont utiles pour fixer des directives et des contraines à l'IA comme le ton que tu veux employer, le format de réponse et l'audience ciblée.\nC'est très important de préciser ces informations lors d'une requête car l'IA peut mieux comprendre tes intentions.",
        image: "images/rules.png"
    },
    {
        title: "Blocs de contenus",
        text: "Ces blocs sont le coeur de ton prompt.\nAvec eux tu peux définir un contexte pour imposer un point de vue à l'IA et lui donner des tâches à accomplir.\n Sans ces informations, le prompt est vide de sens.",
        image: "images/contents.png"
    },
    {
        title: "Blocs de post conditions",
        text: "Ce dernier bloc permet d'ajouter des contraintes de vérification à l'IA. En fonction des conditions émises, il est possible de demander à l'IA de revoir son raisonnement ou même de supprimer une partie de sa réponse.\nCe n'est pas nécessairement obligatoire mais ça peut servir pour assurer une qualité de réponse supérieure.",
        image: "images/postchecks.png"
    },
    {
        title: "Comment utiliser les blocs ?",
        text: "Tout <strong>à gauche</strong> de l'écran tu as la boite à outils. Elle contient les différents blocs que tu peux utiliser.\nAu <strong>milieu</strong> tu as l'espace de travail où tu peux faire glisser les blocs pour construire ton prompt.\nEt à <strong>droite</strong> tu as le résultat, c'est à dire le prompt généré.\n<strong>N'oublie pas</strong> de remplir les champs de texte et de choisir les options dans chaque bloc!",
        image: "images/tuto.gif"
    },
    {
        title: "À toi de jouer !",
        text: "Maintenant que tu connais les bases, c'est à toi de construire ton propre prompt !\nN'hésite pas à expérimenter avec les différentes options pour voir comment ils influencent les réponses de l'IA.\nTu peux tester les prompts que tu crées sur n'importe quel moteur d'IA en copiant le texte généré dans la partie droite de l'écran !\nAmuse-toi bien !",
    }
];

let currentStep = 0;

const showStep = (stepIndex) => {
    const modal = document.querySelector('.modal-content');
    const step = tutorialSteps[stepIndex];
    
    let imageHtml = '';
    if (step?.image) imageHtml = `<img src="${step.image}" alt="${step.title}" class="tutorial-image">`;

    modal.innerHTML = `
        <h2>${step.title}</h2>
        ${imageHtml}
        <p>${step.text}</p>
        <div class="modal-buttons">
            <button class="btn-tutorial btn-previous" onclick="previousStep()">Précédent</button>
            <button class="btn-tutorial btn-skip" onclick="closeTutorial()">Passer</button>
            <button class="btn-tutorial btn-next" onclick="nextStep()">
                ${stepIndex === tutorialSteps.length - 1 ? 'Commencer !' : 'Suivant'} (${currentStep + 1}/${tutorialSteps.length})
            </button>
        </div>
    `;
}

const nextStep = () => {
    currentStep++;
    if (currentStep < tutorialSteps.length) {
        showStep(currentStep);
    } else {
        closeTutorial();
    }
};

const previousStep = () => {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
};

const closeTutorial = () => {
    document.getElementById('tutorialModal').remove();
};

window.onload = () => {
    startTutorial();
};

const startTutorial = () => {
    const overlay = document.createElement('div');
    overlay.id = 'tutorialModal';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = '<div class="modal-content"></div>';
    document.body.appendChild(overlay);
    currentStep = 0;
    showStep(0);
}