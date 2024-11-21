document.addEventListener("DOMContentLoaded", function() {
    const jsonFilePath = './datas/projects.json';
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
        const portfolioSection = document.getElementById('portfolio');
        portfolioSection.className = 'portfolio-grid';

        projects.forEach((project, index) => {
            // Créer le bouton de chaque projet
            const projectButton = createElement('button', 'project-button', project.name);
            projectButton.dataset.index = index;
            portfolioSection.appendChild(projectButton);

            // Événement pour ouvrir la fenêtre modale avec les détails du projet
            projectButton.addEventListener('click', function() {
                currentProjectIndex = index; // Mettre à jour l'index du projet courant
                showModal(project);
            });
        });
    }

    // Fonction pour afficher la modale avec les détails du projet
    function showModal(project) {
        const modal = document.getElementById('projectModal');
        const modalContent = modal.querySelector('.modal-content');
        modalContent.innerHTML = '';
    
        const projectName = createElement('h3', 'project-name', `${project.idProject}`  + ' : ' + `${project.name}`);
        modalContent.appendChild(projectName);
    
        // Ajouter les détails du projet dans la modale
        const type = createElement('p', 'project-type', `${project.type}`);
        modalContent.appendChild(type);
    
        const description = createElement('p', 'project-description', project.description.replace('\\n', '<br/>'));
        modalContent.appendChild(description);
    
        // Ajouter l'annexe si elle existe (vidéo ou image)
        if (project.typeAnnexe === 'video') {
            const video = createElement('video', 'project-annex');
            video.src = project.annexe;
            video.controls = true;
            modalContent.appendChild(video);
        } else if (project.typeAnnexe === 'img') {
            const img = createElement('img', 'project-annex');
            img.src = project.annexe;
            modalContent.appendChild(img);
        }
    
        // Affichage des langages utilisés
        const languagesDiv = createElement('div', 'project-languages');
        const phrase = createElement('div', 'project-lang-phrase', 'Langages utilisés :');
        project.langages.forEach(lang => {
            const langImg = createElement('img', 'project-langage');
            langImg.src = "./" + lang.langage;
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
    
        // Ajouter un lien si disponible
        if (project.lien !== "null") {
            const link = createElement('a', 'project-link', 'Aller sur www.my-little-creations.com');
            link.href = project.lien;
            link.target = "_blank";
            modalContent.appendChild(link);
        }
    
        // Ajouter les boutons de navigation "Suivant" et "Précédent"
        const modalNav = createElement('div', 'modal-nav');
        const prevButton = createElement('button', 'nav-button', '<');
        const nextButton = createElement('button', 'nav-button', '>');
    
        // Gérer le clic sur le bouton "Précédent"
        prevButton.addEventListener('click', function() {
            if (currentProjectIndex > 0) {
                currentProjectIndex--;
                showModal(projects[currentProjectIndex]);
            }
            updateNavButtons();
        });
    
        // Gérer le clic sur le bouton "Suivant"
        nextButton.addEventListener('click', function() {
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
        const modal = document.getElementById('projectModal');
        modal.style.display = 'none';
    }

    // Fermer la modale lorsqu'on clique sur la croix
    document.getElementById('closeModal').addEventListener('click', closeModal);

    // Fermer la modale lorsqu'on clique en dehors du contenu
    window.onclick = function(event) {
        const modal = document.getElementById('projectModal');
        if (event.target === modal) {
            closeModal();
        }
    };

    // Charger le fichier JSON et afficher les projets
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => displayProjects(data))
        .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
});
