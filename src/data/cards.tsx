import {GlobeIcon, GitHubLogoIcon, VideoIcon} from "@radix-ui/react-icons";

export const cards = [
    {
        id: "projet_cdte",
        category: "Developpement Web",
        description: "Création d'un blog WordPress pour le Comité Départemental de Tir de l'Essonne",
        title: "Blog WordPress CDTE",
        src: "projet_cdtev2.png",
        cta: {
            ctaIcon: <GlobeIcon />,
            ctaText: "Voir le site",
            ctaLink: "https://test.cdtiressonne.fr/",
        },
        badge: {
            color: "yellow",
        },
        date: "2024-11-01",
        avatars: [
            {
                src: "https://avatars.githubusercontent.com/u/276006?s=200&v=4",
                label: "WordPress",
            },
            {
                src: "https://avatars.githubusercontent.com/u/47606894?s=200&v=4",
                label: "Elementor Pro",
            }
        ],
        content: () => {
            return (
                <div>
                    <p>Sur ce projet personnel, le Comité Départemental de Tir de l'Essonne m'a proposé de réaliser une refonte totale de leur site, qui était initialement un blog sous WordPress. Ayant travaillé plusieurs années sur WordPress, j'ai accepté cette mission.
                        J'ai commencé par créer une maquette sur Figma, présentant une refonte complète avec différentes pages possibles, tout en conservant les couleurs du logo et la palette de couleur du site d'origine.
                    </p>
                    <br/>
                    <p>
                        En réponse à leur demande, j'ai intégré un système de calendrier pour permettre la mise à jour des dates de compétitions en ligne en utilisant le plugin Calendly, que j'ai configuré et personnalisé pour qu'il s'harmonise avec le thème du site.
                        Ils souhaitaient également des champs personnalisés dans les articles, par exemple pour publier les résultats des compétitions directement sur la page. J'ai donc ajusté les paramètres de WordPress pour autoriser ces champs et ai créé des boutons pour les résultats, des champs de date de compétition, etc.
                    </p>
                    <br/>
                    <p>
                        Ce projet m'a permis d'approfondir mes compétences en personnalisation de WordPress et de renforcer mon expertise dans la création d'interfaces utilisateur adaptées aux besoins spécifiques du client.
                    </p>
                </div>
            );
        },
    },
    {
        id: "projet_cdte_inscription",
        category: "Developpement Web",
        description: "Création d'un site d'inscription aux compétitions pour le Comité Départemental de Tir de l'Essonne",
        title: "Inscription compétitions CDTE",
        src: "projet_cdteresa.png",
        cta: {
            ctaIcon: <GlobeIcon />,
            ctaText: "Voir le site",
            ctaLink: "https://inscriptions.cdtiressonne.fr/",
        },
        badge: {
            color: "yellow",
        },
        date: "2024-11-01",
        avatars: [
            {
                src: "https://avatars.githubusercontent.com/u/25158?s=200&v=4",
                label: "PHP",
            },
            {
                src: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4",
                label: "TailwindCSS",
            },
            {
                src: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png",
                label: "JavaScript",
            },
            {
                src: "https://avatars.githubusercontent.com/u/2452804?s=200&v=4",
                label: "MySQL",
            }
        ],
        content: () => {
            return (
                <div>
                    <p>Sur ce projet personnel, le Comité Départemental de Tir de l'Essonne m’a confié, en parallèle de la gestion du blog WordPress, la création d’un site d’inscriptions pour les compétitions départementales ou celles organisées dans les clubs de l’Essonne. J’ai organisé plusieurs réunions avec différents membres du CDTE pour cerner précisément leurs besoins concernant l’application. Une fois leurs attentes recueillies, j’ai choisi la technologie la plus adaptée pour ce projet : Symfony pour le backend, Twig pour le frontend, et TailwindCSS pour le style et MySQL pour la base de données.

                        J’ai d’abord créé la base de données, incluant les différents champs nécessaires ainsi qu’une table user pour permettre aux utilisateurs de se connecter. J’ai également récupéré une base de données existante d’environ 6 000 utilisateurs afin de faciliter les inscriptions.

                        Pour l'interface, j'ai conçu une maquette avec différentes pages, incluant une partie client et une partie administrateur. Par exemple, la page admin permet de gérer les compétitions, les inscriptions et les utilisateurs ainsi que les différentes catégories de compétitions.
                    </p>
                    <br/>
                    <p>
                        Dans le but de garantir une meilleure sécurité et rendre le site plus autonome, j'ai implémenté un système de mot de passe oublié qui envoie un email avec un lien de réinitialisation sécurisé, valide pendant 10 minutes et utilisant un hash pour sécuriser les données sensibles.
                    </p>
                    <br/>
                    <p>
                        J'ai aussi intégré un système de rôles pour les super administrateurs, les administrateurs et les utilisateurs. Chaque personne dispose d’un compte ainsi que d’un profil de gestionnaire de club, permettant de mettre à jour les informations du club si nécessaire.
                    </p>
                    <br/>
                    <p>
                        En ce qui concerne les formulaires d'inscription, j'ai ajouté une fonctionnalité en JavaScript : un champ select pour rechercher un membre de son club et préremplir automatiquement le nom, le prénom, et la licence de la personne sélectionnée.

                        J'ai aussi ajouté un système de visibilité pour les séries ainsi que sur les compétitions et les catégories ce qui permet de créer différentes séries, mais de ne pas les ouvrir pour en garder au cas où. ça fonctionne en JavaScript avec un système de toogle qui active ou désactive la série.

                        En plus, j'ai intégré une fonction d'export de la liste des personnes inscrites dans une série ou dans une compétition, disponible en PDF et CSV pour les membres du CDTE ainsi que pour les personnes habilitées à gérer les clubs.
                    </p>
                    <br/>
                    <p>
                        Ce projet m’a permis d’approfondir les compétences suivantes :
                        <ul className="list-disc pl-6 mt-2">
                            <li>Analyse des besoins clients : Recueil et synthèse des attentes spécifiques des utilisateurs.</li>
                            <li>Conception et gestion de base de données : Création et structuration d’une base de données pour gérer efficacement les utilisateurs et les inscriptions.</li>
                            <li>Sécurité des données : Implémentation d’un système de mot de passe oublié sécurisé et de liens de réinitialisation temporisés et chiffrés.</li>
                            <li>Gestion des rôles utilisateurs : Mise en place d’un système de rôles pour différencier les permissions en fonction des statuts (super admin, admin, utilisateur).</li>
                            <li>Interactivité des formulaires : Utilisation de JavaScript pour améliorer l’expérience utilisateur en automatisant certaines parties du processus d’inscription.</li>
                        </ul>
                    </p>
                </div>
            );
        },
    },

    {
        id: "projet_ctm",
        category: "Developpement Web",
        description: "Création d'un blog WordPress pour le Club de Tir le Cercle de Tir de Montgeron",
        title: "Blog WordPress CTM",
        src: "projet_ctm.png",
        cta: {
            ctaIcon: <GlobeIcon />,
            ctaText: "Voir le site",
            ctaLink: "https://ctmontgeron.fr/",
        },
        badge: {
            color: "yellow",
        },
        date: "2018-12-01",
        avatars: [
            {
                src: "https://avatars.githubusercontent.com/u/276006?s=200&v=4",
                label: "WordPress",
            },
            {
                src: "https://avatars.githubusercontent.com/u/47606894?s=200&v=4",
                label: "Elementor Pro",
            }
        ],
        content: () => {
            return (
                <div>
                    <p>
                        Depuis maintenant un peu plus de 10 ans, je pratique le tir sportif, une discipline qui exige concentration, précision et contrôle de soi. Cette activité m'a procuré une grande satisfaction personnelle, en développant ma capacité à rester calme sous pression et à me fixer des objectifs précis. En plus d'améliorer ma concentration, le tir sportif m'a également permis de rencontrer une communauté passionnée et de partager des moments forts lors des compétitions.
                    </p>
                    <br/>
                    <p>
                        Depuis plus de 5 ans, je m'occupe du site internet de mon club de tir. J'ai pris en charge toute la partie hébergement, y compris la création des emails pour chaque membre du comité directeur et la sécurisation du site avec HTTPS.
                    </p>
                    <br/>
                    <p>
                        Utilisant WordPress, j'ai réalisé différentes maquettes du site et ajouté plusieurs extensions utiles, comme un système de réservation pour les séances de tir de découverte et un système de newsletter pour informer les adhérents des dernières nouveautés au sein du club.
                    </p>
                    <br/>
                    <p>
                        Au fil des années, cette expérience m'a permis de m'améliorer continuellement et d'approfondir mes connaissances en PHP, en extensions WordPress, ainsi qu'en ergonomie et en éco-conception. Grâce à ce projet, j'ai développé des compétences techniques solides tout en contribuant activement au bon fonctionnement et à la communication du club.
                    </p>
                </div>
            );
        },
    },

    {
        id: "projet_lumenui",
        category: "Developpement Web",
        description: "Création d'un design system",
        title: "Lumen/UI",
        src: "projet_lumenui.png",
        cta: {
            ctaIcon: <GlobeIcon />,
            ctaText: "Voir le site",
            ctaLink: "https://design.elouanb.fr",
        },
        badge: {
            color: "yellow",
        },
        date: "2025-07-01",
        avatars: [
            {
                src: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4",
                label: "TailwindCSS",
            },
            {
                src: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png",
                label: "React",
            },
            {
                src: "https://icon.icepanel.io/Technology/png-shadow-512/Next.js.png",
                label: "Next.js",
            },
            {
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/208px-Markdown-mark.svg.png?20190322184628",
                label: "Markdown",
            },

        ],
        content: () => {
            return (
                <div>
                    <p>
                        Lumen/UI est un projet personnel que j'ai développé pour créer un design system complet, inspiré de la bibliothèque Shadcn/ui. L'objectif était de concevoir une collection de composants réutilisables et personnalisables, tout en respectant les principes de l'éco-conception.
                    </p>
                </div>
            );
        },
    },

    {
        id: "projet_bgcollections",
        category: "Developpement Web",
        description: "Collection de backgrounds pour les projets",
        title: "Background Collections",
        src: "projet_backgroundCollections.png",
        cta: {
            ctaIcon: <GlobeIcon />,
            ctaText: "Voir le site",
            ctaLink: "https://bg.elouanb.fr",
        },
        badge: {
            color: "yellow",
        },
        date: "2025-06-01",
        avatars: [
            {
                src: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4",
                label: "TailwindCSS",
            },
            {
                src: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png",
                label: "React",
            },

        ],
        content: () => {
            return (
                <div>
                    <p>
                        Background Collections est un projet personnel que j'ai développé pour créer une collection de backgrounds réutilisables pour mes projets. L'objectif était de fournir une bibliothèque de fonds d'écran personnalisables et adaptables, tout en respectant les principes de l'éco-conception.
                    </p>
                </div>
            );
        },
    },

    {
        id: "projet_design",
        category: "Developpement Web",
        description: "Site de ressources pour les étudiants (veille technologique, cours, etc.)",
        title: "Ressources web",
        src: "projet_ressource.png",
        cta: {
            ctaIcon: <GlobeIcon />,
            ctaText: "Voir le site",
            ctaLink: "https://elouanb.fr/ressources",
        },
        badge: {
            color: "yellow",
        },
        date: "2025-05-01",
        avatars: [
            {
                src: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png",
                label: "React",
            },
            {
                src: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4",
                label: "TailwindCSS",
            }
        ],
        content: () => {
            return (
                <div>
                    <p>
                        En tant que développeur, je passe beaucoup de temps à lire de la documentation, explorer des bibliothèques et m’inspirer d’autres sites. Chaque jour, je découvre de nouvelles ressources utiles que j’ai souvent envie de retrouver facilement.
                    </p>
                    <br/>
                    <p>
                        C’est pourquoi j’ai décidé de créer un site personnel qui me permet de répertorier tous les liens vers les outils, articles, documentations ou interfaces qui m’aident au quotidien. L’idée était de concevoir un espace centralisé, clair et évolutif, pensé d’abord pour mon usage, mais qui pourrait aussi servir à d’autres.
                    </p>
                    <br/>
                    <p>
                        Pour développer ce projet, j’ai utilisé des technologies actuelles et performantes : Nuxt.js, pour profiter de la puissance de Vue.js avec un framework structuré, Tailwind CSS, pour un design simple, responsive et rapide à mettre en place et Shadcn/ui, une bibliothèque de composants esthétiques et accessibles, parfaitement intégrée à Tailwind.
                    </p>
                    <br/>
                    <p>
                        J’ai également mis en place une authentification complète grâce à la bibliothèque Auth.js. Elle me permet de gérer les connexions utilisateur en toute sécurité.
                        En plus du formulaire classique (email + mot de passe), j’ai activé l’OAuth avec GitHub, ce qui permet aux utilisateurs de se connecter plus rapidement avec leur compte GitHub.
                    </p>
                    <br/>
                    <p>
                        Côté base de données, j’utilise Prisma comme ORM, ce qui me permet de modéliser mes données de manière claire et typée tout en gardant une bonne productivité. Pour le stockage local, j’ai choisi SQLite, idéal pour un projet personnel ou en phase de développement. Cette combinaison me permet d’avoir un flux de données simple, efficace et facile à maintenir.
                    </p>
                    <br/>
                    <p>
                        Le site comporte :
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>Une page de liste qui affiche toutes les ressources enregistrées, avec leurs informations détaillées,</li>
                        <li>Un panneau d’administration pour ajouter, modifier ou supprimer les liens et gérer l’ensemble des contenus,</li>
                        <li>Une authentification sécurisée avec gestion des sessions,</li>
                        <li>Une interface responsive, accessible depuis un ordinateur, une tablette ou un mobile.</li>
                    </ul>
                    <br/>
                    <p>Ce projet m’a permis de mettre en pratique mes compétences en développement fullstack tout en créant un outil concret et utile. Il combine organisation personnelle, technologie moderne et interface soignée.</p>
                </div>
            );
        },
    },

    {
        id: "projet_portailmmi",
        category: "Developpement Web",
        description: "Portail web pour visualiser mes projets universitaires",
        title: "Portail MMI",
        src: "projet_portailMmi.png",
        cta: {
            ctaIcon: <GlobeIcon />,
            ctaText: "Voir le site",
            ctaLink: "https://mmi23f03.mmi-troyes.fr",
        },
        badge: {
            color: "yellow",
        },
        date: "2025-06-01",
        avatars: [
            {
                src: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png",
                label: "React",
            },
            {
                src: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4",
                label: "TailwindCSS",
            },
            {
                src: "https://avatars.githubusercontent.com/u/67470890?s=200&v=4",
                label: "Auth.js",
            },
            // prisma
            {
                src: "https://avatars.githubusercontent.com/u/17219288?s=200&v=4",
                label: "Prisma",
            },
            // mongodb
            {
                src: "https://avatars.githubusercontent.com/u/45120?s=200&v=4",
                label: "MongoDB",
            },
            // express
            {
                src: "https://avatars.githubusercontent.com/u/5658226?s=200&v=4",
                label: "Express.js",
            }
        ],
        content: () => {
            return (
                <div>
                    <p>
                        Dans le cadre de mon cursus universitaire, j'ai développé un portail web pour centraliser et présenter mes projets académiques. L'objectif principal était de créer une plateforme où je pourrais facilement visualiser et partager mes travaux réalisés au cours de ma formation.
                    </p>
                    <br/>
                    <p>
                        Pour ce projet, j'ai opté pour une architecture fullstack moderne, utilisant React pour le frontend et Express.js pour le backend. J'ai choisi MongoDB comme base de données, gérée via Prisma pour une manipulation efficace des données. L'authentification est assurée par Auth.js, permettant une gestion sécurisée des utilisateurs.
                    </p>
                    <br/>
                    <p>
                        Le portail est conçu pour être intuitif et facile à naviguer. Il permet aux utilisateurs de parcourir mes projets, de consulter les détails de chaque réalisation et de découvrir les technologies utilisées. Chaque projet est présenté avec une description, des captures d'écran et des liens vers les dépôts GitHub ou les sites web associés.
                    </p>
                </div>
            );
        },
    },

    {
        id: "projet_taskly",
        category: "Developpement Web",
        description: "Création d'une application pour gérer les devoirs à rendre",
        title: "Taskly",
        src: "projet_taskly.png",
        cta: {
            ctaIcon: <GlobeIcon />,
            ctaText: "Voir le site",
            ctaLink: "https://mmi23f03.sae401.ovh/",
        },
        badge: {
            color: "yellow",
        },
        date: "2025-03-01",
        avatars: [
            {
                src: "https://avatars.githubusercontent.com/u/6128107?s=200&v=4",
                label: "Vuejs",
            },
            {
                src: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4",
                label: "TailwindCSS",
            },
            {
                src: "https://avatars.githubusercontent.com/u/2452804?s=200&v=4",
                label: "MySQL",
            },
            {
                src: "https://avatars.githubusercontent.com/u/143937?s=200&v=4",
                label: "Symfony",
            },
            {
                src: "https://avatars.githubusercontent.com/u/13420081?s=200&v=4",
                label: "Api Platform",
            },
            {
                src: "https://avatars.githubusercontent.com/u/8755770?s=200&v=4",
                label: "JWT",
            }
        ],
        content: () => {
            return (
                <div>
                    <p>Dans le cadre de cette SAE, notre groupe a choisi de travailler sur le thème du cahier de texte numérique. L’objectif principal était de concevoir une application permettant aux étudiants de suivre les différentes échéances importantes : rendus de travaux, évaluations, devoirs, etc. Il ne s’agissait pas de créer une plateforme de dépôt des devoirs, mais bien un outil de planification et de suivi. L’application devait permettre de renseigner des informations comme : la date de rendu, le format attendu, le lieu ou la plateforme de dépôt, ainsi que toute autre donnée pertinente.</p>
                    <br/>
                    <p>Un des enjeux clés du projet résidait dans la manière de gérer l’ajout de ces données : qui peut les saisir ? Faut-il une modération ? Est-ce que les enseignants doivent valider les informations ? Nous avons retenu l’idée que les enseignants pourraient contrôler les dates, mais de manière facultative, pour ne pas alourdir leur charge de travail.</p>
                    <br/>
                    <p>Nous avons constitué un groupe de cinq personnes et, après une phase de réflexion commune, j’ai décidé de prendre en charge la partie développement complet (front-end, back-end, API). J’ai ainsi opté pour une stack technique moderne et cohérente :</p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>Backend : Symfony, avec intégration de JWT (JSON Web Token) pour la gestion sécurisée de l’authentification.</li>
                        <li>API : API Platform, parfaitement compatible avec Symfony.</li>
                        <li>Frontend : Vue.js, avec TailwindCSS pour un design rapide, épuré et responsive.</li>
                        <li>Base de données : MySQL, gérée avec PhpMyAdmin.</li>
                        <li>Développement local : Docker, pour disposer d’un environnement virtualisé et stable.</li>
                    </ul>
                    <br/>
                    <p>N’étant pas encore à l’aise avec l’intégration de JWT dans un environnement Symfony + API Platform, j’ai d’abord développé une template de projet intégrant toutes les technologies nécessaires. Cette phase de test, qui a duré environ une semaine, m’a permis de sécuriser le socle technique. J’ai hébergé le projet sur GitHub, ce qui m’a permis de gérer efficacement le versionnage.</p>
                    <br/>
                    <p>Une fois l’API initialisée dans Symfony, j’ai créé les Controllers et les Entities correspondant à ma base de données. Côté front-end, j’ai utilisé Axios pour faciliter les appels API (GET, POST, PATCH, DELETE, etc.) et mis en place Vuex pour stocker certaines données en local (comme les informations de l’utilisateur connecté).</p>
                    <br/>
                    <p>L’application est divisée en deux espaces distincts : un espace client (utilisateur) et un espace administrateur.</p>
                    <br/>
                    <p>
                        Une attention particulière a été portée à l’accessibilité (respect des normes W3C, labels explicites pour les formulaires, contraste des couleurs) et à l’optimisation générale du site.
                    </p>
                    <br/>
                    <p>
                        Ce projet m’a permis de :
                        <ul className="list-disc pl-6 mt-2">
                            <li>Approfondir mes compétences sur Symfony, JWT et API Platform.</li>
                            <li>Mieux comprendre l’articulation entre front-end et back-end grâce à Vue.js et Axios.</li>
                            <li>Mettre en place une architecture logicielle robuste et scalable.</li>
                            <li>Me familiariser avec les outils de versionnage et de virtualisation (GitHub, Docker).</li>
                            <li>Réfléchir à l’ergonomie d’une application destinée à un usage récurrent par les étudiants.</li>
                        </ul>
                    </p>
                    <br/>
                    <p>Enfin, il m’a donné l’occasion de travailler sur une véritable problématique utilisateur, en proposant une solution fonctionnelle, attrayante et personnalisée.</p>
                </div>
            );
        },
    },

    {
        id: "projet_talkcode",
        category: "Developpement Web",
        description: "Site de macro pour OBS",
        title: "CodeTalk",
        src: "thumbProjets2.png",
        cta: {
            ctaIcon: <GitHubLogoIcon />,
            ctaText: "Voir le repository",
            ctaLink: "https://github.com/AloneDay-91/TalkCode",
        },
        badge: {
            color: "yellow",
        },
        date: "2024-10-01",
        avatars: [
            {
                src: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png",
                label: "React",
            },
            {
                src: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4",
                label: "TailwindCSS",
            }
        ],
        content: () => {
            return (
                <p>
                    CodeTalk est une application web développée pour faciliter la gestion de macros dans OBS (Open Broadcaster Software). Elle permet aux utilisateurs de créer, modifier et supprimer des macros personnalisées pour automatiser certaines tâches lors de la diffusion en direct. L'application est conçue pour être intuitive et facile à utiliser, offrant une interface utilisateur claire et réactive.
                </p>
            );
        },
    },

    {
        id: "projet_sae105",
        category: "Developpement Web",
        description: "Projet scolaire sur le compositeur Hans Zimmer",
        title: "Site sur Hans Zimmer",
        src: "projet_sae105.png",
        cta: {
            ctaIcon: <GlobeIcon />,
            ctaText: "Voir le site",
            ctaLink: "https://mmi23f03.sae203.ovh/",
        },
        badge: {
            color: "yellow",
        },
        date: "2024-03-01",
        avatars: [
            {
                src: "https://avatars.githubusercontent.com/u/25158?s=200&v=4",
                label: "PHP",
            },
            {
                src: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4",
                label: "TailwindCSS",
            },
            {
                src: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png",
                label: "JavaScript",
            },
            {
                src: "https://avatars.githubusercontent.com/u/2452804?s=200&v=4",
                label: "MySQL",
            }
        ],
        content: () => {
            return (
                <div>
                    <p>Dans cette SAE, j'ai réalisé un site sur certains albums de Hans Zimmer qui présentait des données de mon choix et qui était similaire à ce que j'avais fait en S1.</p>
                    <br/>
                    <p>Cependant, contrairement à la SAE de S1, les données étaient cette fois stockées dans une base de données MySQL.</p>
                    <br/>
                    <p>J'ai mis en place un "back-office" pour permettre à un administrateur de gérer ces données facilement, en ajoutant, modifiant ou supprimant des informations. Les données que j'ai choisi de traiter et qui était les mêmes que celles utilisées lors de la SAE de S1 étaient suffisamment complexes et complètes pour nécessiter la mise en place de deux tables dans la base de données.</p>
                    <br/>
                    <p>
                        Mon site comprenait :
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>Une interface utilisateur : Pour présenter les données de manière claire et attractive.</li>
                        <li>Un système de gestion de base de données : Utilisant MySQL pour stocker et organiser les informations.</li>
                        <li>Un back-office administrateur : Pour gérer les données facilement, avec des fonctionnalités pour ajouter, modifier et supprimer des entrées (CRUD).</li>
                    </ul>
                    <br/>
                    <p>Pour mener à bien ce projet, j'ai :</p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>Conçu la structure de ma base de données, en définissant les tables nécessaires et leurs relations. (MCD, MLD, MPD, Dictionnaire)</li>
                        <li>Développé une interface utilisateur intuitive pour la présentation des données.</li>
                        <li>Implémenté un back-office sécurisé pour l'administration des données.</li>
                        <li>Assuré l'interaction entre le site web et la base de données MySQL, permettant une manipulation dynamique des données.</li>
                    </ul>
                    <br/>
                    <p>Cette SAE m'a permis de renforcer mes compétences en développement web, gestion de bases de données et conception d'interfaces utilisateur. J'ai eu l'occasion de travailler sur des aspects essentiels de la création de sites web dynamiques et interactifs, tout en développant une compréhension approfondie de la gestion des données à l'aide de MySQL.</p>
                </div>
            );
        },
    },
    {
        id: "projet_jardunis",
        category: "Developpement Web",
        description: "Projet scolaire sur un site de co-jardinage",
        title: "Jard'Unis",
        src: "projet_jardunis.png",
        cta: {
            ctaIcon: <GlobeIcon />,
            ctaText: "Voir le site",
            ctaLink: "https://mmi23f03.sae202.ovh/",
        },
        badge: {
            color: "yellow",
        },
        date: "2024-05-01",
        avatars: [
            {
                src: "https://avatars.githubusercontent.com/u/25158?s=200&v=4",
                label: "PHP",
            },
            {
                src: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4",
                label: "TailwindCSS",
            },
            {
                src: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png",
                label: "JavaScript",
            },
            {
                src: "https://avatars.githubusercontent.com/u/2452804?s=200&v=4",
                label: "MySQL",
            }
        ],
        content: () => {
            return (
                <div>
                    <p>Dans le cadre du projet SAE, Nous avons imaginé et créé un site web pour organiser le cojardinage dans la ville de Troyes. Mon agence était composée de cinq membres aux différents rôles, ce qui permettait à chacun d'avoir une tâche bien définie. Pendant les deux semaines du projet, nous avons d'abord mis en place notre site sous WordPress, défini la charte et maquetté le site de cojardinage, créé une base de données pour l'application, et commencé le développement du back-office ainsi que le dépôt GitHub. Nous avons également rédigé le scénario de la vidéo de promotion.</p>
                    <br/>
                    <p>En ce qui me concerne, je me suis occupé de la partie back-end et de l'hébergement du projet. J'ai créé les fichiers de configuration pour le site WordPress et le site Jard’Unis, puis j'ai initialisé le site WordPress et ajouté les membres de l'agence. En parallèle, j'ai pris en charge le développement du back-end du site Jard’Unis. J'ai d'abord analysé les données nécessaires pour le site, puis j'ai créé un dictionnaire de données, un MCD (Modèle Conceptuel de Données) et un MLD (Modèle Logique de Données). Avec ces informations, j'ai conçu une base de données pour organiser les différentes données dans diverses tables.</p>
                    <br/>
                    <p>
                        Au fil des jours, j'ai rendu la page de contact fonctionnelle et automatisé l'envoi des mails de contact. J'ai également mis en place des fonctionnalités pour gérer les utilisateurs, les parcelles et les jardins présents sur notre site, permettant ainsi de supprimer, modifier ou ajouter ces éléments et facilitant la gestion du site pour les administrateurs. Enfin, j'ai développé toute la partie profil utilisateur pour qu'il puisse modifier ses informations personnelles, ainsi que les informations sur les jardins ou les parcelles.
                    </p>
                </div>
            );
        },
    },
    {
        id: "projet_borne_recharge",
        category: "DataViz",
        description: "Projet scolaire sur la DataViz des bornes de recharge électrique en France",
        title: "DataViz borne de recharge électrique",
        src: "thumbProjets1.png",
        cta: {
            ctaIcon: <GlobeIcon />,
            ctaText: "Voir le site",
            ctaLink: "https://www.data.gouv.fr/fr/reuses/accessibilites-des-bornes-de-recharges-pour-voiture-electriques/",
        },
        badge: {
            color: "yellow",
        },
        date: "2024-10-01",
        avatars: [
            {
                src: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png",
                label: "HTML",
            },
            {
                src: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4",
                label: "TailwindCSS",
            },
            {
                src: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png",
                label: "JavaScript",
            },
            {
                src: "https://avatars.githubusercontent.com/u/2386673?s=200&v=4",
                label: "Gspap",
            },
        ],
        content: () => {
            return (
                <div>
                    <p>
                        Dans cette SAE dédiée à la datavisualisation, j’ai non seulement assuré la gestion backend et des données, mais j’ai également endossé le rôle de chef de projet. Mon équipe et moi avons commencé par rechercher des données sur l'accessibilité des bornes de recharge pour les véhicules électriques en France. Ensuite, j'ai organisé, trié et formaté les données pour qu'elles soient cohérentes. Après consolidation, j’ai converti les informations en JSON pour les utiliser dans des visualisations avec Chart.js et D3.js. J’ai aussi intégré environ 110 000 bornes sur une carte interactive avec Mapbox, en adaptant le code JavaScript nécessaire pour son intégration dans notre projet. Ce travail m’a également permis de découvrir le format GEOJson, que je ne connaissais pas auparavant, et de comprendre son rôle dans la structuration des données géospatiales pour les cartes interactives. Par ailleurs, je me suis chargé de référencer le site sur data.gouv dans la section de réutilisation pour valoriser notre travail.
                    </p>
                    <br/>
                    <p>
                        En tant que chef de projet, j'ai réparti les tâches au sein de l'équipe et pris en charge l’intégration des graphiques et des données à afficher. De plus, j’ai utilisé de nouvelles technologies comme GSAP et Lenis pour animer les données au scroll ainsi que Three.js pour une animation en 3D. Même si c'était une première utilisation de ces outils, j'ai rapidement maîtrisé leur fonctionnement pour enrichir notre projet.
                    </p>
                    <br/>
                    <p>
                        Ce que ce projet m’a permis d’apprendre et d’améliorer :
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>Gestion de projet : Répartition efficace des tâches, gestion des priorités et coordination avec l'équipe.</li>
                        <li>Organisation et structuration des données : Amélioration de ma capacité à trier et organiser des volumes importants d’informations.</li>
                        <li>Techniques de visualisation : Maîtrise des bibliothèques de dataviz (Chart.js, D3.js) pour illustrer les données de manière claire.</li>
                        <li>Intégration de Mapbox et GEOJson : Apprentissage de l’intégration de cartes interactives à grande échelle (110 000 points) et découverte du format GEOJson.</li>
                        <li>Référencement sur data.gouv : Mise en valeur de notre projet en l'ajoutant dans la section de réutilisation de data.gouv.</li>
                        <li>Nouvelles technologies d'animation : Maîtrise de GSAP, Lenis et Three.js pour ajouter des animations dynamiques et immersives.</li>
                        <li>Adaptabilité et apprentissage rapide : Compétence accrue dans l'adoption de nouvelles technologies pour répondre aux besoins du projet.</li>
                    </ul>
                </div>
            );
        },
    },
    {
        id: "projet_pub",
        category: "Video",
        description: "Projet scolaire sur une publicité de parfum",
        title: "Publicité fictive",
        src: "thumbVideoPub.png",
        cta: {
            ctaText: 'Voir la vidéo',
            ctaIcon: <VideoIcon />,
            ctaLink: "https://www.youtube.com/watch?v=SQ95lLbs2q0",
        },
        badge: {
            color: "blue",
        },
        date: "2025-01-01",
        avatars: [
            {
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/882px-Epic_Games_logo.svg.png",
                label: "Unreal Engine 5",
            },
            {
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/939px-Blender_logo_no_text.svg.png",
                label: "Blender",
            },
            {
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIYHHwdRgN5BgsSjZKGQ_Ij5zpseo2DXl7OQ&s",
                label: "Adobe Premiere Pro",
            }
        ],
        content: () => {
            return (
                <div>
                    <p>
                        Dans le cadre de cette SAE, nous avions pour objectif de concevoir une publicité fictive en intégrant un flacon de parfum modélisé en 3D. Ce projet nous a permis de mobiliser à la fois des compétences techniques et créatives.
                    </p>
                    <br/>
                    <p>
                        Pour la préparation du projet, Je me suis tout d’abord concentré sur la phase de découpage technique. Cette étape essentielle nous a permis de structurer le déroulé du tournage et d’anticiper les besoins en termes de prises de vue et d’effets visuels.
                    </p>
                    <br/>
                    <p>
                        La réalisation de la publicité a ensuite nécessité une organisation rigoureuse. L’un des principaux défis a été de trouver un créneau disponible pour filmer en studio, car nous avions impérativement besoin d’un fond vert pour intégrer les décors virtuels. Après plusieurs échanges et négociations, nous avons finalement obtenu un accès au studio.
                    </p>
                    <br/>
                    <p>
                        Le tournage a eu lieu dans des conditions difficiles : par -10 °C, avec du vent et de nuit. Malgré ces contraintes, nous avons pu filmer les séquences nécessaires.
                    </p>
                    <br/>
                    <p>
                        Par la suite, j’ai pris en charge la création du décor virtuel destiné à être intégré en post-production. Pour cela, j’ai utilisé des technologies issues de l’industrie du jeu vidéo, aujourd’hui couramment employées dans le milieu du cinéma. Grâce à Unreal Engine 5, j’ai recréé un décor de désert avec un ciel légèrement rosé et un effet de vent, en parfaite adéquation avec l’ambiance de notre scénario.
                    </p>
                    <br/>
                    <p>
                        Ce projet m’a permis de renforcer plusieurs compétences clés :
                    </p>
                    <ul>
                        <li>Gestion de projet : de la planification à la réalisation.</li>
                        <li>Collaboration en équipe : coordination pour l’organisation du tournage.</li>
                        <li>Création de décors numériques : maîtrise d’Unreal Engine 5 et des techniques de compositing.</li>
                        <li>Adaptation face aux contraintes techniques et logistiques.</li>
                    </ul>
                    <br/>
                    <p>En conclusion, cette expérience a été extrêmement enrichissante, tant sur le plan technique que créatif. Elle m’a permis de mieux comprendre les exigences d’une production audiovisuelle professionnelle et de développer des compétences transversales précieuses pour mes futurs projets.</p>
                    <br/>
                    <p>Voici la vidéo :</p>
                    <br/>
                    <iframe className="w-full" height="700" src="https://www.youtube.com/embed/SQ95lLbs2q0?si=wMelBXb1w_4mFK52"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen></iframe>
                </div>
            );
        },
    },
];