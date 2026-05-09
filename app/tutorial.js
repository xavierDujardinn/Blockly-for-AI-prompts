const tutorialSteps = [
    {
        title: "Bienvenue dans le Prompt Builder",
        text: "Cet outil est là pour t'apprendre à structurer tes prompt pour améliorer la pertinence des réponses de l'IA.\nCe tutoriel t'expliqueras les différents blocs et comment les utiliser pour créer des prompts efficaces.",
    },
    {
        title: "Bloc IDENT",
        text: "Ce premier bloc est obligatoire. Il forme la fondation du reste du prompt.\nIl définit des éléments d'identification comme l'assistant ciblé, le mode de fonctionnement et la version du framework utilisée.",
        image: "images/ident.png"
    },
    {
        title: "Blocs de règles",
        text: "Ceux-ci sont utiles pour fixer des directives et des contraines à l'IA comme le ton que tu veux employer, le format de réponse et l'audience ciblée.",
        image: "images/rules.png"
    },
    {
        title: "Bloc de contenus",
        text: "Ces blocs sont le coeur de ton prompt.\nAvec eux tu peux définir un contexte pour imposer un point de vue à l'IA et lui donner des tâches à accomplir.",
        image: "images/contents.png"
    },
    {
        title: "Bloc de post conditions",
        text: "Ce dernier bloc permet d'ajouter des contraintes de vérification à l'IA. En fonction des conditions émises, il est possible de demander à l'IA de revoir son raisonnement où même de supprimer une partie de sa réponse.",
        image: "images/postchecks.png"
    },
    {
        title: "À toi de jouer !",
        text: "Maintenant que tu connais les bases, c'est à toi de construire ton propre prompt !\nN'hésite pas à expérimenter avec les différents blocs pour voir comment ils influencent les réponses de l'IA.\nTu peux tester les prompts que tu crées sur n'importe quel moteur d'IA en copiant le texte généré dans la partie droite de l'écran !\nAmuse-toi bien !",
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
                ${stepIndex === tutorialSteps.length - 1 ? 'Commencer !' : 'Suivant'}
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