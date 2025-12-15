# Bureau des Clubs éducatifs - Site Vitrine

Site vitrine one page responsive pour le Bureau des Clubs éducatifs, présentant les missions, services d'accompagnement et facilitant la prise de contact avec les établissements, clubs, enseignants et partenaires.

## 📋 Description

Ce site web est une application one page moderne et responsive qui présente le Bureau des Clubs éducatifs. Il comprend toutes les sections demandées dans le cahier des charges : navigation, héros, à propos, services, clubs & projets, témoignages, partenaires, contact et footer.

## 🚀 Fonctionnalités

- **Design responsive** : Optimisé pour mobile, tablette et desktop (mobile first)
- **Navigation par ancres** : Menu de navigation avec scroll fluide vers les sections
- **Animations** : Animations au scroll pour une expérience utilisateur agréable
- **Formulaire de contact** : Formulaire avec validation et notifications
- **Compteurs animés** : Statistiques animées dans la section témoignages
- **Menu mobile** : Menu hamburger pour les petits écrans
- **Header fixe** : Navigation toujours accessible lors du scroll
- **Charte graphique éducative** : Couleurs et design adaptés au secteur éducatif

## 📁 Structure du projet

```
buc/
├── index.html          # Structure HTML principale
├── styles.css          # Styles CSS avec design responsive
├── script.js           # JavaScript pour interactions et fonctionnalités
└── README.md           # Documentation du projet
```

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec variables CSS, Grid, Flexbox
- **JavaScript (Vanilla)** : Pas de dépendances externes
- **Font Awesome** : Icônes (via CDN)

## 📦 Installation

1. Clonez ou téléchargez le projet
2. Ouvrez `index.html` dans un navigateur web moderne
3. Aucune installation de dépendances n'est nécessaire

## 🎨 Personnalisation

### Modifier les couleurs

Les couleurs sont définies dans `styles.css` via les variables CSS :

```css
:root {
    --primary-color: #2563eb;      /* Couleur principale */
    --secondary-color: #10b981;    /* Couleur secondaire */
    --accent-color: #f59e0b;       /* Couleur d'accent */
    /* ... */
}
```

### Modifier le contenu

#### Sections principales

1. **Section Héros** : Modifiez le titre et sous-titre dans `index.html` (lignes ~30-35)
2. **Section À propos** : Modifiez le texte dans `index.html` (lignes ~50-80)
3. **Services** : Ajoutez/modifiez les cartes de services dans `index.html` (lignes ~90-130)
4. **Clubs** : Modifiez les exemples de clubs dans `index.html` (lignes ~140-220)
5. **Témoignages** : Modifiez les témoignages et statistiques dans `index.html` (lignes ~230-280)
6. **Partenaires** : Modifiez les partenaires dans `index.html` (lignes ~290-330)
7. **Contact** : Modifiez les coordonnées dans `index.html` (lignes ~340-400)

### Modifier les statistiques

Les statistiques sont dans la section témoignages. Modifiez les valeurs dans `index.html` :

```html
<div class="stat-number" data-target="150">0</div>
```

Changez `data-target="150"` pour la valeur souhaitée.

### Modifier les coordonnées de contact

Modifiez les coordonnées dans la section contact de `index.html` :

- Email : `contact@bureau-clubs-educatifs.ci`
- Téléphone : `+225 XX XX XX XX XX`
- WhatsApp : `+225 XX XX XX XX XX`
- Adresse : `Abidjan, Côte d'Ivoire`

### Ajouter des images

Pour ajouter des images réelles :

1. Créez un dossier `images/` dans le projet
2. Ajoutez vos images
3. Modifiez les sections concernées dans `index.html` :

```html
<div class="club-image">
    <img src="images/club-sciences.jpg" alt="Club Sciences">
</div>
```

Pensez à ajuster le CSS si nécessaire pour les images.

## 📧 Configuration du formulaire de contact

Le formulaire de contact est actuellement configuré avec une simulation d'envoi. Pour connecter à un vrai backend :

1. Ouvrez `script.js`
2. Trouvez la section "CONTACT FORM HANDLING"
3. Décommentez et modifiez le code fetch :

```javascript
const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name,
        establishment: document.getElementById('establishment').value,
        email,
        phone: document.getElementById('phone').value,
        requestType,
        message
    })
});
```

### Options alternatives

- **EmailJS** : Service gratuit pour envoyer des emails depuis le frontend
- **Formspree** : Service de formulaires en ligne
- **Backend personnalisé** : Créez votre propre API

## 🔒 Conformité RGPD

Le formulaire de contact inclut :
- Case à cocher pour le consentement RGPD
- Validation des données
- Message de confirmation

Pour une conformité complète :
1. Ajoutez une page de mentions légales
2. Ajoutez une politique de confidentialité
3. Configurez le stockage sécurisé des données
4. Ajoutez un cookie consent banner si nécessaire

## 📱 Responsive Design

Le site est optimisé pour :
- **Mobile** : < 480px
- **Tablette** : 481px - 768px
- **Desktop** : > 768px

Les breakpoints sont définis dans `styles.css` avec des media queries.

## 🌐 Compatibilité navigateurs

- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)
- Edge (dernière version)
- Navigateurs mobiles modernes

## 🚀 Déploiement

### Option 1 : Hébergement statique gratuit

- **Netlify** : Glissez-déposez le dossier
- **Vercel** : Connectez votre repository Git
- **GitHub Pages** : Activez dans les paramètres du repository

### Option 2 : Serveur web classique

1. Uploadez tous les fichiers sur votre serveur
2. Assurez-vous que `index.html` est à la racine
3. Le site sera accessible via votre domaine

### Option 3 : WordPress (si souhaité)

Vous pouvez intégrer le design dans un thème WordPress personnalisé.

## 📝 Mise à jour du contenu

### Ajouter une nouvelle section

1. Ajoutez la section dans `index.html` avec un `id` unique
2. Ajoutez un lien dans le menu de navigation
3. Ajoutez les styles dans `styles.css` si nécessaire

### Modifier le menu

Le menu est dans le `<header>` de `index.html`. Ajoutez/modifiez les liens :

```html
<li><a href="#nouvelle-section" class="nav-link">Nouvelle Section</a></li>
```

## 🎯 Optimisations possibles

- **Images** : Optimisez les images avec des outils comme TinyPNG
- **Lazy loading** : Le code inclut déjà le support pour le lazy loading
- **Minification** : Minifiez CSS et JS pour la production
- **CDN** : Utilisez un CDN pour les assets statiques
- **SEO** : Ajoutez des meta tags supplémentaires si nécessaire

## 🐛 Dépannage

### Le menu mobile ne s'ouvre pas
- Vérifiez que `script.js` est bien chargé dans `index.html`
- Vérifiez la console du navigateur pour les erreurs

### Les animations ne fonctionnent pas
- Vérifiez que JavaScript est activé dans le navigateur
- Vérifiez la console pour les erreurs

### Le formulaire ne fonctionne pas
- Vérifiez que tous les champs obligatoires sont remplis
- Vérifiez la console pour les erreurs
- Configurez le backend si nécessaire

## 📞 Support

Pour toute question ou problème :
- Email : contact@bureau-clubs-educatifs.ci
- Vérifiez la documentation ci-dessus
- Consultez les commentaires dans le code

## 📄 Licence

Ce projet est créé pour le Bureau des Clubs éducatifs. Tous droits réservés.

## 🙏 Remerciements

- Font Awesome pour les icônes
- Communauté open source pour les inspirations

---

**Développé avec ❤️ pour l'éducation en Côte d'Ivoire**

