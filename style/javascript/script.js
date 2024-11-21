document.addEventListener('DOMContentLoaded', function() {
            
    var copy1 = document.getElementById('copier1');
    var copy2 = document.getElementById('copier2');

    copy1.addEventListener('click', function() {
        copierTexteDansPressePapier(copy1.textContent);
    });
    
    copy2.addEventListener('click', function() {
        copierTexteDansPressePapier(copy2.textContent);
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
    
    
    // PARTIE JAUGE POUR LES COMPETENCES -------------------------
    
    var niveauxCompetence = {
        competence1: 0.75,   //workteam
        competence2: 0.85,   //leadership
        competence3: 0.82,  //organisation
        competence4: 0.8,   //polyvalence
        competence5: 0.75,   //responsable
        competence6: 0.9   //discipline
    };

    function normaliserNiveau(niveau) {
        return Math.min(Math.max(niveau, 0), 1);
    }
    
    Object.keys(niveauxCompetence).forEach(function(competence) {
        var jauge = document.getElementById(competence);
        if (jauge) {
            var niveau = normaliserNiveau(niveauxCompetence[competence]);
            jauge.style.width = (niveau * 100) + '%';
            jauge.style.backgroundColor = getColorForSkillLevel(niveau);
        }
    });

    function getColorForSkillLevel(niveau) {
        var hue = niveau * 120; 
        return 'hsl(' + hue + ', 100%, 50%)'; 
    }
});