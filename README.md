# Exalt IT - Express API - Nicolas PIPLARD

Pour lancer l'application executer cette commande :
```
docker compose up
```

## Accès à swagger :
```
http://localhost:3000/api-docs
```

## Accès à l'application :
```
http://localhost:3000
```

## Accès à la base de données :
```
http://localhost:27017
```

## Swagger
L'api require un token JWT pour accéder aux routes. Pour générer un token, il faut appeler la route /auth/login avec un body contenant un email et un password valide. 
Le token est valable 1h.

Une route contenant un user et pass pré-rempli est disponible pour tester l'api sans avoir à créer un compte.

L'email et le password sont déjà rempli dans les paramètres de la route /auth/login sur swagger, il faut simplement cliquer sur "Try it out" puis sur "Execute".

Enfin, il faut ajouter le token généré dans la partie "Authorize" en haut à droite de swagger. 
Il faut ajouter le token dans le champ "Value".

# Pistes d'améliorations
- Couvrir les test jest.
- Utiliser les DTO et repository.
- Ajouter Helmet pour la sécurité.

D'autres améliorations sont possibles comme un système de logs, cache, etc.

# Exalt IT - Express API - Nicolas PIPLARD
