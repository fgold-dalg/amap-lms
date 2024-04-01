// Affiche  une pop-up qui demande confirmation pour chaque éléments html de la classe "pop-up-confirmation"
// par exemple lors du choix de suppression (par clic sur le bouton X) d'un adhérent
document.addEventListener('DOMContentLoaded', () => {
  // Sélectionnez tous les liens avec la classe "pop-up-confirmation"
  var links = document.querySelectorAll('.pop-up-confirmation');

  // Parcourez tous les liens et ajoutez un gestionnaire d'événement pour le clic
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      // Affichez une boîte de dialogue de confirmation
      var confirmation = confirm('Êtes-vous sûr de vouloir continuer ?');

      // Si l'utilisateur a cliqué sur "Annuler", empêchez la redirection
      if (!confirmation) {
        event.preventDefault();
      }
    });
  });
});