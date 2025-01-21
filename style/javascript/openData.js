document.addEventListener("DOMContentLoaded", function () {
    let currentProjectIndex = 0;
    let projects = []; // Stocke les projets une fois chargés

    // Fonction pour créer un élément HTML avec classe optionnelle et contenu
    function createElement(tag, className, content = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.textContent = content;
        return element;
    }

    // Fonction pour afficher les projets dans des boutons
    function displayProjects(data) {
        projects = data; // Stocker les projets pour la navigation
        const portfolioSection = document.querySelector('#portfolio');
        portfolioSection.className = 'portfolio-grid';

        projects.forEach((project, index) => {
            // Créer le bouton de chaque projet
            const projectButton = createElement('button', 'project-button', project.name);
            projectButton.dataset.index = index;
            portfolioSection.appendChild(projectButton);

            // Événement pour ouvrir la fenêtre modale avec les détails du projet
            projectButton.addEventListener('click', function () {
                currentProjectIndex = index; // Mettre à jour l'index du projet courant
                showModal(project);
            });
        });
    }

    // Fonction pour afficher la modale avec les détails du projet
    function showModal(project) {
        const modal = document.querySelector('#projectModal');
        const modalContent = modal.querySelector('.modal-content');
        modalContent.innerHTML = '';

        const projectName = createElement('h2', 'project-name', `${project.idProject}` + ' : ' + `${project.name}`);
        modalContent.appendChild(projectName);

        // Ajouter les détails du projet dans la modale
        const type = createElement('h3', 'project-type', `${project.type}`);
        modalContent.appendChild(type);

        // Ajout de la date du projet
        const projectDate = createElement('p', 'project-dates', `${project.dates}`);
        modalContent.appendChild(projectDate);

        const description = createElement('p', 'project-description', project.description.replace('\\n', '<br/>'));
        modalContent.appendChild(description);

        // Ajouter l'annexe si elle existe (vidéo ou image)
        if (project.typeAnnexe === 'video') {
            const video = createElement('video', 'project-annex');
            video.src = "./media/video/" + project.annexe;
            video.controls = true;
            modalContent.appendChild(video);
        } else if (project.typeAnnexe === 'img') {
            const img = createElement('img', 'project-annex');
            img.src = "./media/img/screenshots/" + project.annexe;
            modalContent.appendChild(img);
        }

        // Affichage des langages utilisés
        const languagesDiv = createElement('div', 'project-languages');
        const phrase = createElement('div', 'project-lang-phrase', 'Langages utilisés :');
        project.langages.forEach(lang => {
            const langImg = createElement('img', 'project-langage');
            langImg.src = "./media/img/logos/" + lang.langage;
            languagesDiv.appendChild(langImg);
        });
        modalContent.appendChild(phrase);
        modalContent.appendChild(languagesDiv);

        // Créer un tableau pour les problèmes et les solutions
        const problemsTable = createElement('table', 'project-problems');
        const tbody = createElement('tbody');

        // En-têtes des colonnes du tableau
        const trNames = createElement('tr');
        const tdProblemName = createElement('td', 'tdProbName', 'Problèmes rencontrés');
        const tdSolutionName = createElement('td', 'tdSolName', 'Solutions apportées');
        trNames.appendChild(tdProblemName);
        trNames.appendChild(tdSolutionName);
        tbody.appendChild(trNames);

        project.problemes.forEach(problem => {
            const tr = createElement('tr');
            const tdProblem = createElement('td', 'problem-cell', problem.probleme);
            const tdSolution = createElement('td', 'solution-cell', problem.solution);
            tr.appendChild(tdProblem);
            tr.appendChild(tdSolution);
            tbody.appendChild(tr);
        });

        problemsTable.appendChild(tbody);
        modalContent.appendChild(problemsTable);

        // Ajouter les boutons de navigation "Suivant" et "Précédent"
        const modalNav = createElement('div', 'modal-nav');
        const prevButton = createElement('button', 'nav-button', '<');
        const nextButton = createElement('button', 'nav-button', '>');

        // Gérer le clic sur le bouton "Précédent"
        prevButton.addEventListener('click', function () {
            if (currentProjectIndex > 0) {
                currentProjectIndex--;
                showModal(projects[currentProjectIndex]);
            }
            updateNavButtons();
        });

        // Gérer le clic sur le bouton "Suivant"
        nextButton.addEventListener('click', function () {
            if (currentProjectIndex < projects.length - 1) {
                currentProjectIndex++;
                showModal(projects[currentProjectIndex]);
            }
            updateNavButtons();
        });

        modalNav.appendChild(prevButton);
        modalNav.appendChild(nextButton);
        modalContent.appendChild(modalNav);

        // Fonction pour gérer l'opacité des boutons selon l'état
        function updateNavButtons() {
            if (currentProjectIndex === 0) {
                prevButton.style.opacity = '0.5';
                prevButton.disabled = true;
                prevButton.style.cursor = 'default';
            } else {
                prevButton.style.opacity = '1';
                prevButton.disabled = false;
            }

            if (currentProjectIndex === projects.length - 1) {
                nextButton.style.opacity = '0.5';
                nextButton.disabled = true;
                nextButton.style.cursor = 'default';
            } else {
                nextButton.style.opacity = '1';
                nextButton.disabled = false;
            }
        }

        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelector('.modal-content').scrollIntoView({ behavior: 'smooth' });
            });
        });


        // Initialiser l'état des boutons lors de l'ouverture de la modale
        updateNavButtons();

        // Afficher la fenêtre modale
        modal.style.display = 'block';
    }

    // Fonction pour fermer la modale
    function closeModal() {
        const modal = document.querySelector('#projectModal');
        modal.style.display = 'none';
    }

    // Fermer la modale lorsqu'on clique sur la croix
    document.querySelector('#closeModal').addEventListener('click', closeModal);

    // Fermer la modale lorsqu'on clique en dehors du contenu
    window.onclick = function (event) {
        const modal = document.querySelector('#projectModal');
        if (event.target === modal) {
            closeModal();
        }
    };

    // Charger le fichier JSON et afficher les projets
    fetch('/portfolio/datas/projects.json')
        .then(response => response.json())
        .then(data => {
            // Récupérer l'élément <select>
            const selectLangages = document.querySelector("#langage-select");

            // Ajouter un événement lorsque l'utilisateur sélectionne un langage
            selectLangages.addEventListener("change", function () {
                // Réinitialiser la liste des projets affichés
                const portfolioSection = document.querySelector('#portfolio');
                portfolioSection.innerHTML = ""; // Effacer la liste des projets avant de la mettre à jour
            
                const filterProjectByLanguagesDiv = document.querySelector("#filter-select-result");
            
                // Vérifier s'il y a déjà un message et le supprimer pour éviter les doublons
                let existingMessage = document.querySelector("#filterProjectMessage");
                if (existingMessage) {
                    existingMessage.innerHTML = "";
                }
            
                const numberProjectFound = document.querySelector("#filterProjectMessage");
            
                // Obtenir la valeur sélectionnée du <select>
                const selectedLanguage = selectLangages.value;
            
                if (selectedLanguage === "") {
                    let projets = data.length;
                    numberProjectFound.textContent = `${projets} projets trouvés.`; 
                    filterProjectByLanguagesDiv.appendChild(numberProjectFound);

                    // Si "Tous les langages" est sélectionné, afficher tous les projets
                    displayProjects(data);
                } else {
                    // Filtrer les projets en fonction du langage sélectionné
                    const filteredProjects = data.filter(project => {
                        // Vérifier si l'un des langages du projet correspond exactement au langage sélectionné
                        return project.langages.some(lang => {
                            // Extraire le nom du langage sans le suffixe "_logo.png"
                            const languageName = lang.langage.split('_')[0].toLowerCase(); // "html" from "html_logo.png"
                            return languageName === selectedLanguage.toLowerCase(); // Comparaison exacte
                        });
                    });
            
                    // Affichage du nombre de projets trouvés
                    if (filteredProjects.length === 0) {
                        numberProjectFound.textContent = "Sélectionnez un langage pour afficher les projets correspondants !";
                    } else if (filteredProjects.length === 1) {
                        numberProjectFound.textContent = "1 projet trouvé.";
                    } else {
                        numberProjectFound.textContent = `${filteredProjects.length} projets trouvés.`;
                    }
            
                    filterProjectByLanguagesDiv.appendChild(numberProjectFound);
            
                    // Afficher les projets filtrés
                    displayProjects(filteredProjects);
                }
            });
            
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));

});