# Photos du site

Déposer ici les vraies photos du club (lieu, équipe, séances), puis indiquer leur chemin
dans `src/content.ts`, à la ligne `src` de l'emplacement voulu :

```ts
photo: { src: "/images/accueil.jpg", alt: "L'accueil du Coco Social Club", motif: "accueil", tone: "sable" }
```

Tant que `src` vaut `null`, le site affiche un aplat sobre avec un pictogramme.

Conseils : format JPEG ou WebP, 1600 px de large au maximum, moins de 300 Ko par photo.
N'utiliser que des photos du club : ni visuel marketing avec du texte, ni photo de banque d'images.
