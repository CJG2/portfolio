document.addEventListener('DOMContentLoaded', function () {

    const numeroTelephone = document.querySelector("#numeroTelephone");
    var copy1 = document.querySelector("#copier1");
    numeroTelephone.addEventListener('click', () => {
        copierTexteDansPressePapier(copy1.textContent);
    });

    const mailPerso = document.querySelector("#mailPerso");
    var copy2 = document.querySelector("#copier2");
    mailPerso.addEventListener('click', () => {
        copierTexteDansPressePapier(copy2.textContent);
    });

    const linkedin_link = document.querySelector("#linkedInPerso");
    linkedin_link.addEventListener('click', () => {
        window.open('https://www.linkedin.com/in/carlos-guillermo-gomez-827bb727b/', '_blank');
    });

    const instagramPerso = document.querySelector("#instagramPerso");
    instagramPerso.addEventListener('click', () => {
        window.open('https://www.instagram.com/cguillermo18/', '_blank');
    });

    function copierTexteDansPressePapier(texte) {
        var elementTemporaire = document.createElement('textarea');
        elementTemporaire.value = texte;
        document.body.appendChild(elementTemporaire);
        elementTemporaire.select();
        document.execCommand('copy');
        document.body.removeChild(elementTemporaire);
        alert('Elément copié avec succès');
    }

    // PARTIE ÉTOILES POUR LES COMPÉTENCES -------------------------
    var niveauxCompetence = {
        competence1: 4,   // workteam
        competence2: 5,   // leadership
        competence3: 4.5, // organisation
        competence4: 4.5, // polyvalence
        competence5: 5,   // responsable
        competence6: 5    // discipline
    };

    Object.keys(niveauxCompetence).forEach(function (competence) {
        var container = document.getElementById(competence);
        if (container) {
            var niveau = niveauxCompetence[competence];
            container.innerHTML = renderStars(niveau);
        }
    });

    function renderStars(niveau) {
        const maxStars = 5;
        let starsHtml = '';
        for (let i = 1; i <= maxStars; i++) {
            if (i <= Math.floor(niveau)) {
                starsHtml += '<i class="iconeEtoileCompetences bi bi-star-fill"></i>';
            } else if (i - niveau < 1) {
                starsHtml += '<i class="iconeEtoileCompetences bi bi-star-half"></i>'; // Option pour demi-étoiles
            } else {
                starsHtml += '<i class="iconeEtoileCompetences bi bi-star"></i>';
            }
        }
        return starsHtml;
    }
});
