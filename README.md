# Application décentralisée d'enchères hollandaises

|   Nom   | Prénom |
|---------|--------|
|   Fouad  |  TEKFA  |


Dans ce rapport, vous trouverez des informations détaillées sur le processus de vente aux enchères néerlandaises. Pour plus de détails, veuillez consulter [ce rapport](./dutch-auction/README.md).


---

**Étapes pour Exécuter le Projet :**

1. **Cloner le Contrat :**
   - Clonez le contrat à partir du lien suivant : [https://www-apps.univ-lehavre.fr/forge/tf176193/dutch-auction](https://www-apps.univ-lehavre.fr/forge/tf176193/dutch-auction).

2. **Ouvrir Ganache :**
   - Lancez Ganache, votre environnement de développement blockchain local.

3. **Migration du Contrat :**
   - Utilisez Truffle pour migrer le contrat en exécutant la commande `truffle migrate`.

4. **Mise à Jour de l'Adresse du Contrat :**
   - Une fois le contrat déployé, copiez l'identifiant du contrat et mettez à jour le fichier `components/contractAddress.tsx` avec cette adresse.

5. **Installation des Dépendances :**
   - Accédez au répertoire de votre projet dApp et exécutez la commande `npm install` pour installer toutes les dépendances nécessaires.

6. **Vérification de la Configuration Ganache :**
   - Assurez-vous que `ganacheUrl = 'http://localhost:7545'` dans votre projet pour vous connecter correctement à Ganache.

---




Le TP est à réaliser individuellement.

## Présentation

Ce TP est le prolongement du premier et consiste à créer une application décentralisée (dApp) permettant de donner vie à votre Smart Contract (SC). Celle-ci doit pouvoir proposer les fonctionnalités suivantes.

### Authentification et profil

Il doit être possible de se connecter à l'aide de son portefeuille MetaMask. Vous pouvez utiliser la SDK de [MetaMask](https://docs.metamask.io/wallet/how-to/connect/set-up-sdk/).

Les données du portefeuille telles que la clé publique et le solde en ETH doivent être visibles depuis l'application.

### Enchères

La gestion des enchères est composée des éléments suivants :
- Une liste des enchères disponibles ;
- Créer une enchère avec les paramètres souhaités par le propriétaire ;
- Participer à une ou plusieurs enchères ;
- Pouvoir enchérir ;
- Cloturer une enchère (versement des fonds au propriétaire de l'enchère) ;
- Un tableau de bord permettant de visualiser les enchères gagnées, en cours ou perdues.

*N'oubliez pas de créer une barre de navigation pour accéder aux différentes fonctionnalités.*

Pour interagir avec la blockchain depuis votre application, il existe plusieurs bibliothèques telles que [ethers](https://docs.ethers.org/v5/) ou encore [web3js](https://web3js.readthedocs.io/en/v1.10.0/).

## Restitution

**Un rapport concernant l'utilisation de l'application sera à restituer 3 semaines après le dernier TP.**

Pour ce projet, il est imposé d'utiliser le framework [NextJS](https://nextjs.org/) qui utilise la bibliothèque [React](https://react.dev/).

## Installation

Pour créer une application NextJS, utilisez la commande suivante : 
```shell
npx create-next-app@latest
```

A vous de jouer !
