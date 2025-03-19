document.addEventListener("DOMContentLoaded", function() {
    // Sélectionner tous les logos de langage
    const logos = document.querySelectorAll('.lang-logos');
    
    // Parcourir chaque logo et ajouter un événement de clic
    logos.forEach(function(logo) {
        logo.addEventListener('click', function() {
            // Supprimer d'abord tout ancien bloc de description déjà affiché
            const existingBlock = document.querySelector('.description-block');
            if (existingBlock) {
                existingBlock.remove();
            }

            // Créer un bloc de description qui va contenir tout
            const descriptionBlock = document.createElement('div');
            descriptionBlock.classList.add('description-block');

            // Créer un conteneur pour l'image et la description
            const imageDescriptionContainer = document.createElement('div');
            imageDescriptionContainer.classList.add('image-description-container');

            // Ajouter le logo dans ce conteneur
            const logoClone = this.cloneNode(true); // Copier le logo cliqué
            imageDescriptionContainer.appendChild(logoClone);

            // Ajouter la description à droite du logo
            const description = this.closest('td').querySelector('.exp-lang').textContent;
            const descriptionText = document.createElement('p');
            descriptionText.classList.add('description-text');
            descriptionText.textContent = description;
            imageDescriptionContainer.appendChild(descriptionText);

            // Ajouter le conteneur avec l'image et la description au bloc de description
            descriptionBlock.appendChild(imageDescriptionContainer);

            const divForInformation = document.createElement('div');
            divForInformation.id = "divForInformation";

            // Ajouter le titre "Niveau en [Nom du langage]"
            const languageName = this.nextElementSibling.textContent.trim();
            const levelText = document.createElement('h4');
            levelText.classList.add('level-text');
            levelText.textContent = `Niveau en ${languageName} : `;
            divForInformation.appendChild(levelText);

            const informationButton = document.createElement('button');
            informationButton.className = "info-button";
            informationButton.textContent = "i";
            informationButton.addEventListener('click', () => {
                alert("Notation à partir de mon ressenti et des notes obtenues.")
            });
            divForInformation.appendChild(informationButton);

            descriptionBlock.appendChild(divForInformation);



            // Créer et ajouter la jauge en dessous
            const skillGauge = createSkillGauge(languageName);
            descriptionBlock.appendChild(skillGauge);

            // Ajouter le bloc au document juste après le tableau
            const compTable = document.querySelector('.comp-table');
            compTable.parentNode.insertBefore(descriptionBlock, compTable.nextSibling);
        });
    });

    // Fonction pour créer la jauge en fonction du niveau de compétence
    function createSkillGauge(language) {
        const gaugeContainer = document.createElement('div');
        gaugeContainer.className = 'gauge-container';

        const gauge = document.createElement('div');
        gauge.className = 'gauge';
        
        const fill = document.createElement('div');
        fill.className = 'gauge-fill';

        let level;
        switch (language) {
            case 'HTML':
                level = 97;
                break;
            case 'CSS':
                level = 93;
                break;
            case 'Python':
                level = 73;
                break;
            case 'Postgre SQL':
                level = 80;
                break;
            case 'MySQL':
                level = 80;
                break;
            case 'JavaScript':
                level = 85;
                break;
            case 'Java':
                level = 70;
                break;
            case 'Node.js':
                level = 75;
                break;
            case 'React':
                level = 60;
                break;
            case 'PHP':
                level = 70;
                break;
            default:
                level = 50; // Niveau par défaut si le langage n'est pas trouvé
        }

        // Ajuster la largeur du remplissage en fonction du niveau
        fill.style.width = level + '%';
        gauge.appendChild(fill);

        // Ajouter la jauge complète au conteneur
        gaugeContainer.appendChild(gauge);

        return gaugeContainer;
    }
});
