import {
  Baby,
  Heart,
  Stethoscope,
  Syringe,
  Activity,
  Pill,
  ShieldCheck,
  Thermometer,
  Droplets,
  Wind,
  type LucideIcon,
} from "lucide-react";

export type Module = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  protocolIds: string[];
};

export type ProtocolSection = {
  title: string;
  items?: string[];
  text?: string;
};

export type Protocol = {
  id: string;
  moduleId: string;
  title: string;
  category: string;
  level: "Essentiel" | "Intermédiaire" | "Avancé";
  duration: string;
  definition: string;
  objectives: string[];
  indications: string[];
  contreIndications: string[];
  materiel: string[];
  etapes: { titre: string; detail: string }[];
  precautions: string[];
  surveillance: string[];
  complications: string[];
  criteresQualite: string[];
  references: string[];
};

export type Competence = {
  id: string;
  protocolId: string;
  domain: string;
  criteria: { label: string; weight: number }[];
};

export type QuizQuestion = {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const modules: Module[] = [
  {
    id: "neonatologie",
    title: "Néonatologie",
    description: "Soins du nouveau-né à terme et prématuré",
    icon: Baby,
    color: "from-sky-400 to-cyan-500",
    protocolIds: ["accueil-nne", "reanimation-nne", "alimentation-enterale"],
  },
  {
    id: "respiratoire",
    title: "Soins respiratoires",
    description: "Oxygénothérapie, ventilation, aspiration",
    icon: Wind,
    color: "from-cyan-400 to-blue-500",
    protocolIds: ["oxygenotherapie", "aspiration-vas"],
  },
  {
    id: "cardio",
    title: "Cardio-vasculaire",
    description: "Surveillance hémodynamique pédiatrique",
    icon: Heart,
    color: "from-rose-400 to-red-500",
    protocolIds: ["voie-veineuse-peripherique"],
  },
  {
    id: "medicaments",
    title: "Administration médicamenteuse",
    description: "Calcul, dilution et voies d'administration",
    icon: Pill,
    color: "from-emerald-400 to-teal-500",
    protocolIds: ["administration-im"],
  },
  {
    id: "examen",
    title: "Examen clinique",
    description: "Évaluation pédiatrique et signes vitaux",
    icon: Stethoscope,
    color: "from-violet-400 to-purple-500",
    protocolIds: ["constantes-vitales"],
  },
  {
    id: "hygiene",
    title: "Hygiène & sécurité",
    description: "Prévention des infections nosocomiales",
    icon: ShieldCheck,
    color: "from-amber-400 to-orange-500",
    protocolIds: ["lavage-mains", "bracelet-identification"],
  },
];

export const protocols: Protocol[] = [
  {
    id: "accueil-nne",
    moduleId: "neonatologie",
    title: "Accueil du nouveau-né en salle de naissance",
    category: "Néonatologie",
    level: "Essentiel",
    duration: "15 min",
    definition:
      "Ensemble des soins immédiats prodigués au nouveau-né dans la première heure de vie afin d'assurer une transition extra-utérine sécurisée.",
    objectives: [
      "Assurer la stabilité thermique, respiratoire et hémodynamique",
      "Établir le lien mère-enfant",
      "Dépister précocement les anomalies",
    ],
    indications: [
      "Tout nouveau-né à la naissance",
      "Naissance à terme ou prématurée",
    ],
    contreIndications: [
      "Aucune absolue — la prise en charge est adaptée à l'état clinique",
    ],
    materiel: [
      "Table de réanimation chauffante préchauffée à 36°C",
      "Linges chauds stériles",
      "Bonnet et couverture",
      "Bracelet d'identification mère/enfant",
      "Saturomètre et stéthoscope néonatal",
      "Aspirateur de mucosités, sondes Ch 6-8",
      "Insufflateur avec masques tailles 00 et 0",
      "Chronomètre Apgar",
    ],
    etapes: [
      { titre: "Préparation", detail: "Vérifier le matériel, préchauffer la table, se laver les mains, mettre gants stériles." },
      { titre: "Séchage", detail: "Sécher immédiatement le nouveau-né avec un linge chaud, retirer le linge mouillé." },
      { titre: "Évaluation Apgar", detail: "Évaluer à 1, 5 et 10 minutes : FC, respiration, tonus, réactivité, coloration." },
      { titre: "Soins de cordon", detail: "Clampage retardé 60s si possible, désinfection à la chlorhexidine aqueuse." },
      { titre: "Identification", detail: "Pose immédiate de deux bracelets identiques mère/enfant." },
      { titre: "Peau à peau", detail: "Favoriser le peau à peau précoce ≥ 1 heure si état stable." },
      { titre: "Premier examen", detail: "Mensurations, recherche de malformations, vitamine K 1mg IM." },
    ],
    precautions: [
      "Prévenir l'hypothermie (T° axillaire 36,5-37,5°C)",
      "Ne jamais aspirer systématiquement les voies aériennes",
      "Vérifier la perméabilité choanale et œsophagienne",
    ],
    surveillance: [
      "FC > 100 bpm",
      "Coloration cutanée",
      "Effort respiratoire (score de Silverman)",
      "Température axillaire toutes les 30 min la première heure",
    ],
    complications: [
      "Hypothermie",
      "Détresse respiratoire transitoire",
      "Hypoglycémie néonatale",
      "Inhalation méconiale",
    ],
    criteresQualite: [
      "Apgar documenté à 1, 5 et 10 min",
      "Peau à peau initié < 5 min de vie",
      "Bracelets d'identification posés en présence de la mère",
    ],
    references: ["OMS — Soins essentiels au nouveau-né 2022", "SFN 2021", "AAP NRP 8e édition"],
  },
  {
    id: "reanimation-nne",
    moduleId: "neonatologie",
    title: "Réanimation néonatale en salle de naissance",
    category: "Urgence",
    level: "Avancé",
    duration: "10 min",
    definition: "Séquence d'actions structurées (algorithme NRP) visant à restaurer une fonction cardio-respiratoire chez un nouveau-né en détresse.",
    objectives: ["Restaurer une ventilation efficace", "Maintenir FC > 100 bpm", "Éviter l'hypoxie cérébrale"],
    indications: ["FC < 100 bpm", "Apnée ou gasps", "Cyanose centrale persistante"],
    contreIndications: ["Malformation létale documentée et confirmée"],
    materiel: [
      "Table de réanimation, insufflateur avec PEEP",
      "Masques 00/0/1, sondes d'intubation 2,5/3/3,5",
      "Laryngoscope lame Miller 0/1",
      "Mélangeur air/O2, saturomètre",
      "Adrénaline 1/10 000, cathéter ombilical",
    ],
    etapes: [
      { titre: "0-30s : Évaluation", detail: "Sécher, stimuler, position neutre. Si non vigoureux → étape suivante." },
      { titre: "30-60s : Ventilation", detail: "VPP au masque 40-60/min, FiO2 21% (terme) ou 30% (prématuré)." },
      { titre: "60s : Réévaluation", detail: "Si FC < 100 → corriger la ventilation (MR SOPA)." },
      { titre: "FC < 60 bpm", detail: "Intubation + MCE 3:1, FiO2 100%." },
      { titre: "FC < 60 persistant", detail: "Adrénaline IV 0,1 ml/kg de la solution 1/10 000." },
    ],
    precautions: ["Éviter l'hyperoxie", "Limiter les pertes thermiques", "Documenter chaque action minutée"],
    surveillance: ["FC continue par stéthoscope ou ECG", "SpO2 préductale", "Coloration", "Tonus"],
    complications: ["Pneumothorax", "Hémorragie intra-ventriculaire", "Encéphalopathie hypoxo-ischémique"],
    criteresQualite: ["Délai VPP < 60s", "Équipe formée NRP", "Débriefing après chaque réanimation"],
    references: ["NRP 8e édition AAP", "ILCOR 2020", "SFN Algorithme 2021"],
  },
  {
    id: "alimentation-enterale",
    moduleId: "neonatologie",
    title: "Alimentation entérale par sonde gastrique",
    category: "Nutrition",
    level: "Intermédiaire",
    duration: "20 min",
    definition: "Administration de lait par sonde naso ou orogastrique chez un nouveau-né incapable de téter efficacement.",
    objectives: ["Couvrir les besoins nutritionnels", "Favoriser la maturation digestive", "Prévenir l'entérocolite"],
    indications: ["Prématurité < 34 SA", "Détresse respiratoire", "Troubles de succion-déglutition"],
    contreIndications: ["Entérocolite ulcéro-nécrosante", "Atrésie œsophagienne", "Occlusion intestinale"],
    materiel: ["Sonde gastrique Ch 5-8", "Seringue 10-50 ml", "Stéthoscope", "Lait maternel ou préparation prescrite"],
    etapes: [
      { titre: "Vérification", detail: "Identité, prescription, position de la sonde (auscultation + résidu)." },
      { titre: "Position", detail: "Demi-assis ou décubitus latéral droit." },
      { titre: "Mesure des résidus", detail: "Aspirer doucement, noter quantité et aspect. Réinjecter si < 30% du volume." },
      { titre: "Administration", detail: "Par gravité sur 15-20 min, ne jamais pousser au piston." },
      { titre: "Rinçage", detail: "2-3 ml d'eau stérile en fin d'administration." },
    ],
    precautions: ["Vérifier la position avant chaque gavage", "Surveiller la tolérance digestive"],
    surveillance: ["Résidus gastriques", "Ballonnement abdominal", "Vomissements", "Transit"],
    complications: ["Inhalation bronchique", "Entérocolite", "Reflux gastro-œsophagien"],
    criteresQualite: ["Position de la sonde vérifiée", "Lait à température corporelle", "Volume et durée respectés"],
    references: ["ESPGHAN 2022", "SFN Recommandations nutritionnelles 2021"],
  },
  {
    id: "oxygenotherapie",
    moduleId: "respiratoire",
    title: "Oxygénothérapie pédiatrique",
    category: "Respiratoire",
    level: "Essentiel",
    duration: "10 min",
    definition: "Administration thérapeutique d'oxygène à une concentration supérieure à celle de l'air ambiant (21%).",
    objectives: ["Corriger l'hypoxémie", "Maintenir SpO2 ≥ 94%", "Réduire le travail respiratoire"],
    indications: ["SpO2 < 92% en air ambiant", "Détresse respiratoire", "Bronchiolite sévère"],
    contreIndications: ["Hyperoxie chez le prématuré (cible SpO2 90-95%)"],
    materiel: ["Source d'O2 + débitmètre", "Lunettes / masque / Hood selon âge", "Humidificateur", "Saturomètre"],
    etapes: [
      { titre: "Évaluer", detail: "FR, SpO2, signes de lutte, coloration." },
      { titre: "Choisir l'interface", detail: "Lunettes < 2L/min, masque simple 4-8L/min, masque haute concentration > 8L/min." },
      { titre: "Régler le débit", detail: "Selon prescription et cible SpO2." },
      { titre: "Surveiller", detail: "SpO2 continue, réévaluation à 15 min." },
    ],
    precautions: ["Toujours humidifier > 2L/min", "Éviter l'hyperoxie chez le prématuré"],
    surveillance: ["SpO2", "FR", "Conscience", "Coloration"],
    complications: ["Sécheresse muqueuse", "Atélectasies de dénitrogénation", "Rétinopathie du prématuré"],
    criteresQualite: ["SpO2 dans la cible", "Interface adaptée", "Sevrage progressif documenté"],
    references: ["HAS 2019", "GINA pédiatrique 2023"],
  },
  {
    id: "aspiration-vas",
    moduleId: "respiratoire",
    title: "Aspiration des voies aériennes supérieures",
    category: "Respiratoire",
    level: "Essentiel",
    duration: "5 min",
    definition: "Geste de désencombrement par aspiration des sécrétions naso-pharyngées.",
    objectives: ["Libérer les voies aériennes", "Améliorer la ventilation"],
    indications: ["Encombrement bronchique", "Avant tétée chez le NN encombré"],
    contreIndications: ["Aspiration systématique non recommandée", "Plaquettes < 50 000"],
    materiel: ["Aspirateur mural", "Sondes Ch 6-10", "Gants stériles", "Sérum physiologique"],
    etapes: [
      { titre: "Préparer", detail: "Régler la dépression : -100 mmHg NN, -150 mmHg enfant." },
      { titre: "Position", detail: "Décubitus dorsal, tête en légère extension." },
      { titre: "Aspirer", detail: "Introduire sans aspirer, aspirer en retrait sur 10 sec maximum." },
      { titre: "Réoxygéner", detail: "Surveiller SpO2 entre chaque passage." },
    ],
    precautions: ["Durée totale < 15 sec", "Pré-oxygénation si SpO2 basse"],
    surveillance: ["SpO2", "FC", "Aspect des sécrétions"],
    complications: ["Bradycardie vagale", "Traumatisme muqueux", "Désaturation"],
    criteresQualite: ["Durée < 10 sec par passage", "Pression adaptée à l'âge"],
    references: ["SFN 2020", "AARC Clinical Practice Guidelines"],
  },
  {
    id: "voie-veineuse-peripherique",
    moduleId: "cardio",
    title: "Pose de voie veineuse périphérique pédiatrique",
    category: "Cardio-vasculaire",
    level: "Intermédiaire",
    duration: "15 min",
    definition: "Insertion d'un cathéter court dans une veine périphérique pour administration de solutés ou médicaments.",
    objectives: ["Établir un accès veineux fiable", "Permettre une thérapie IV"],
    indications: ["Réhydratation", "Antibiothérapie IV", "Voie d'urgence"],
    contreIndications: ["Membre paralytique", "Site infecté ou brûlé"],
    materiel: ["Cathéters 24G/22G", "Antiseptique alcoolique", "Garrot pédiatrique", "Pansement transparent", "MEOPA si > 1 an"],
    etapes: [
      { titre: "Préparer l'enfant", detail: "Information, distraction, antalgie locale (EMLA 60 min)." },
      { titre: "Choisir le site", detail: "Dos de la main, avant-bras, pied, cuir chevelu < 6 mois." },
      { titre: "Asepsie", detail: "Détersion + antiseptique alcoolique 30 sec." },
      { titre: "Ponctionner", detail: "Biseau vers le haut, angle 15-30°, reflux sanguin." },
      { titre: "Fixer", detail: "Pansement transparent, attelle si articulation." },
    ],
    precautions: ["Limiter à 2 tentatives par opérateur", "Antalgie systématique"],
    surveillance: ["Perméabilité, signes inflammatoires, débit"],
    complications: ["Hématome", "Extravasation", "Infection locale", "Phlébite"],
    criteresQualite: ["1ère pose réussie", "Antalgie respectée", "Traçabilité de la pose"],
    references: ["HAS Voies veineuses 2019", "INS Standards 2021"],
  },
  {
    id: "administration-im",
    moduleId: "medicaments",
    title: "Administration intramusculaire chez l'enfant",
    category: "Médicaments",
    level: "Essentiel",
    duration: "5 min",
    definition: "Injection de médicament dans un muscle squelettique.",
    objectives: ["Délivrer le médicament", "Garantir la sécurité de l'administration"],
    indications: ["Vaccination", "Vitamine K à la naissance", "Antibiotiques IM"],
    contreIndications: ["Troubles de la coagulation", "Site infecté"],
    materiel: ["Seringue 1-2 ml", "Aiguille 25G (16-25 mm)", "Antiseptique alcoolique", "Compresse stérile"],
    etapes: [
      { titre: "Règle des 7 B", detail: "Bon patient, bon médicament, bonne dose, bonne voie, bon moment, bonne documentation, bonne réponse." },
      { titre: "Site", detail: "Vaste externe < 12 mois, deltoïde > 12 mois." },
      { titre: "Injection", detail: "Angle 90°, injection lente sur 5 sec." },
      { titre: "Retrait", detail: "Compression sans massage." },
    ],
    precautions: ["Rotation des sites", "Aspirer avant injection non recommandée pour vaccins"],
    surveillance: ["Réaction locale", "Réaction allergique 15 min"],
    complications: ["Hématome", "Abcès", "Lésion nerveuse"],
    criteresQualite: ["Bon site selon l'âge", "Antalgie associée (allaitement, sucrose)"],
    references: ["OMS Vaccination 2023", "HAS Calendrier vaccinal 2024"],
  },
  {
    id: "constantes-vitales",
    moduleId: "examen",
    title: "Mesure des constantes vitales pédiatriques",
    category: "Examen clinique",
    level: "Essentiel",
    duration: "10 min",
    definition: "Recueil standardisé des paramètres vitaux adaptés à l'âge.",
    objectives: ["Détecter précocement une dégradation", "Documenter l'évolution"],
    indications: ["À l'admission", "Toutes les 4h en hospitalisation", "Selon score PEWS"],
    contreIndications: [],
    materiel: ["Thermomètre", "Tensiomètre brassard adapté", "Saturomètre", "Chronomètre"],
    etapes: [
      { titre: "Température", detail: "Axillaire (NN), tympanique > 3 mois." },
      { titre: "Fréquence cardiaque", detail: "Sur 1 minute pleine, valeurs normales selon âge." },
      { titre: "Fréquence respiratoire", detail: "Compter sur 1 minute au repos." },
      { titre: "Tension artérielle", detail: "Brassard couvrant 2/3 du bras." },
      { titre: "SpO2", detail: "Au repos, signal stable." },
    ],
    precautions: ["Enfant calme", "Brassard adapté à l'âge"],
    surveillance: ["Tendance des paramètres", "Score PEWS"],
    complications: [],
    criteresQualite: ["Valeurs normales par tranche d'âge connues", "Traçabilité"],
    references: ["PEWS APLS 2022", "HAS Pédiatrie 2020"],
  },
  {
    id: "lavage-mains",
    moduleId: "hygiene",
    title: "Hygiène des mains — friction hydro-alcoolique",
    category: "Hygiène",
    level: "Essentiel",
    duration: "30 sec",
    definition: "Geste de référence pour la prévention de la transmission croisée des micro-organismes.",
    objectives: ["Éliminer la flore transitoire", "Prévenir les IAS"],
    indications: ["Les 5 indications de l'OMS", "Avant et après tout contact patient"],
    contreIndications: ["Mains visiblement souillées → lavage à l'eau et au savon"],
    materiel: ["Solution hydro-alcoolique conforme EN 1500"],
    etapes: [
      { titre: "Quantité", detail: "Une dose dans le creux d'une main sèche." },
      { titre: "7 étapes", detail: "Paume-paume, dos, espaces interdigitaux, dos des doigts, pouces, ongles, poignets." },
      { titre: "Durée", detail: "Frictionner jusqu'à séchage complet (≥ 30 sec)." },
    ],
    precautions: ["Manches courtes", "Pas de bijoux ni vernis", "Ongles courts"],
    surveillance: ["Audit observationnel régulier"],
    complications: ["Dermatite irritative"],
    criteresQualite: ["Couverture complète", "Durée respectée"],
    references: ["OMS Hand Hygiene 2009 — Réactualisation 2023", "SF2H 2022"],
  },
  {
    id: "bracelet-identification",
    moduleId: "hygiene",
    title: "Pose du bracelet d'identification",
    category: "Sécurité",
    level: "Essentiel",
    duration: "2 min",
    definition: "Mise en place d'un bracelet permettant l'identification unique et fiable du patient pédiatrique.",
    objectives: ["Prévenir les erreurs d'identité", "Garantir la traçabilité"],
    indications: ["Tout patient hospitalisé", "Nouveau-né dès la naissance"],
    contreIndications: ["Refus documenté du patient/parent"],
    materiel: ["Bracelet plastique inviolable", "Étiquettes patient validées"],
    etapes: [
      { titre: "Vérification", detail: "Nom, prénom, date de naissance, IPP avec le parent." },
      { titre: "Pose", detail: "Poignet ou cheville, en présence d'un témoin pour le NN." },
      { titre: "Vérification 2", detail: "Contrôle à 4 mains pour le nouveau-né." },
    ],
    precautions: ["Vérifier la lisibilité", "Adapter la taille"],
    surveillance: ["Présence et lisibilité à chaque soin"],
    complications: ["Compression locale", "Allergie"],
    criteresQualite: ["Pose < 30 min après admission", "Lisible à 100%"],
    references: ["HAS Identitovigilance 2023", "OMS Patient Safety 2022"],
  },
];

export const competences: Competence[] = protocols.map((p) => ({
  id: `comp-${p.id}`,
  protocolId: p.id,
  domain: p.category,
  criteria: [
    { label: "Préparation du matériel conforme", weight: 2 },
    { label: "Respect des règles d'asepsie", weight: 3 },
    { label: "Communication avec l'enfant et la famille", weight: 2 },
    { label: "Exécution technique correcte", weight: 4 },
    { label: "Surveillance post-soin", weight: 2 },
    { label: "Traçabilité dans le dossier", weight: 2 },
    { label: "Gestion des complications", weight: 3 },
  ],
}));

export const quizzes: QuizQuestion[] = [
  {
    id: "q1",
    moduleId: "neonatologie",
    question: "À quel délai doit être réalisée la première évaluation du score d'Apgar ?",
    options: ["30 secondes", "1 minute", "5 minutes", "10 minutes"],
    answer: 1,
    explanation: "Le score d'Apgar est évalué à 1, 5 et 10 minutes de vie.",
  },
  {
    id: "q2",
    moduleId: "neonatologie",
    question: "Quelle est la température cible axillaire du nouveau-né ?",
    options: ["35,5 - 36°C", "36,5 - 37,5°C", "37,5 - 38°C", "38 - 38,5°C"],
    answer: 1,
    explanation: "La normothermie néonatale se situe entre 36,5 et 37,5°C en axillaire.",
  },
  {
    id: "q3",
    moduleId: "respiratoire",
    question: "Quelle est la durée maximale recommandée d'une aspiration trachéale ?",
    options: ["5 secondes", "10 secondes", "20 secondes", "30 secondes"],
    answer: 1,
    explanation: "Une aspiration ne doit pas dépasser 10 secondes pour éviter la désaturation.",
  },
  {
    id: "q4",
    moduleId: "respiratoire",
    question: "Cible de SpO2 chez un prématuré sous oxygène ?",
    options: ["85-90%", "90-95%", "95-100%", "> 98%"],
    answer: 1,
    explanation: "Chez le prématuré, on vise 90-95% pour éviter la rétinopathie liée à l'hyperoxie.",
  },
  {
    id: "q5",
    moduleId: "hygiene",
    question: "Durée minimale d'une friction hydro-alcoolique efficace ?",
    options: ["10 sec", "20 sec", "30 sec", "60 sec"],
    answer: 2,
    explanation: "L'OMS recommande une friction jusqu'au séchage complet, soit au minimum 30 secondes.",
  },
  {
    id: "q6",
    moduleId: "medicaments",
    question: "Site d'injection IM recommandé chez un nourrisson de 6 mois ?",
    options: ["Deltoïde", "Vaste externe (cuisse)", "Fessier", "Avant-bras"],
    answer: 1,
    explanation: "Avant 12 mois, le site recommandé est le muscle vaste externe (face antéro-latérale de la cuisse).",
  },
  {
    id: "q7",
    moduleId: "examen",
    question: "FC normale au repos chez un nourrisson de 6 mois ?",
    options: ["60-100 bpm", "80-140 bpm", "100-160 bpm", "140-180 bpm"],
    answer: 2,
    explanation: "Chez le nourrisson, la FC normale se situe entre 100 et 160 bpm.",
  },
  {
    id: "q8",
    moduleId: "cardio",
    question: "Calibre de cathéter recommandé chez un nouveau-né ?",
    options: ["18G", "20G", "22G", "24G ou 26G"],
    answer: 3,
    explanation: "Chez le nouveau-né, on utilise des cathéters 24G voire 26G.",
  },
];

export const algorithms = [
  {
    id: "nrp",
    title: "Algorithme de réanimation néonatale (NRP)",
    moduleId: "neonatologie",
    description: "Décision clinique structurée pour la prise en charge d'un nouveau-né en détresse",
    steps: [
      { id: 1, label: "Naissance", type: "start", next: [2] },
      { id: 2, label: "À terme ? Tonique ? Pleure ?", type: "decision", next: [3, 4] },
      { id: 3, label: "Soins de routine + peau à peau", type: "action", next: [] },
      { id: 4, label: "Sécher, stimuler, position neutre", type: "action", next: [5] },
      { id: 5, label: "FC < 100 ou apnée ?", type: "decision", next: [6, 3] },
      { id: 6, label: "VPP au masque 40-60/min", type: "action", next: [7] },
      { id: 7, label: "FC < 60 après 30s VPP ?", type: "decision", next: [8, 9] },
      { id: 8, label: "Intubation + MCE 3:1 + Adrénaline", type: "urgent", next: [] },
      { id: 9, label: "Poursuivre VPP, surveillance", type: "action", next: [] },
    ],
  },
];

/* ════════════════════════════════════════════════════════════
 * GOD-TIER ARCHITECTURE — Manuel ISPITS Béni Mellal 2024-2025
 * ════════════════════════════════════════════════════════════ */

export type Pole = {
  id: string; number: string; icon: string; tag: string;
  name: string; description: string; procedures: string[];
  accent: string; gradient: string;
};

export const poles: Pole[] = [
  {
    id: "accueil-homeostasie", number: "01", icon: "🫀", tag: "6 Fiches · Fondationnel",
    name: "Accueil & Homéostasie",
    description: "Le pôle fondateur sur lequel repose l'intégralité du parcours de soins. L'instabilité physiologique initiale compromet l'efficacité de toute intervention ultérieure — thermorégulation, hémodynamique, oxygénothérapie titrée.",
    procedures: ["Stabilisation initiale", "Thermorégulation active", "Monitorage hémodynamique", "Oxygénothérapie FiO₂", "Soins du cordon", "Prophylaxie ophtalmique"],
    accent: "text-primary", gradient: "linear-gradient(90deg, #00C6C6, #007C7C)",
  },
  {
    id: "nutrition-metabolisme", number: "02", icon: "🧪", tag: "5 Fiches · Métabolique",
    name: "Nutrition & Métabolisme",
    description: "Fondamental pour la croissance somatique et le développement neurologique. La gestion minutieuse — entérale et parentérale — prévient la surcharge hydrique et la déshydratation, respectant l'immaturité enzymatique du nouveau-né.",
    procedures: ["Abord nasogastrique", "Nutrition entérale progressive", "Nutriments parentéraux", "Hyperglycémie néonatale", "Bilan azoté"],
    accent: "text-gold", gradient: "linear-gradient(90deg, #C9A84C, #8B6914)",
  },
  {
    id: "abord-vasculaire", number: "03", icon: "💉", tag: "3 Fiches · Vasculaire",
    name: "Abord Vasculaire & Prélèvements",
    description: "Sécurisation systématique des voies d'accès vasculaire. Minimisation de l'anémie iatrogène par optimisation des techniques de prélèvement capillaire. Maintien du cathéter veineux central avec surveillance des complications.",
    procedures: ["Abord veineux périphérique", "Prélèvements capillaires", "Cathéter veineux central"],
    accent: "text-pink-400", gradient: "linear-gradient(90deg, #E85D9A, #8B2355)",
  },
  {
    id: "support-respiratoire", number: "04", icon: "🫁", tag: "4 Fiches · Respiratoire",
    name: "Support Respiratoire & Élimination",
    description: "Prise en charge du syndrome de détresse respiratoire néonatale. Le support ventilatoire non invasif (CPAP) et l'aspiration trachéale sont guidés par des algorithmes décisionnels rigoureux fondés sur les données probantes.",
    procedures: ["CPAP non invasif", "Aspiration trachéale", "Photothérapie", "Sondage vésical"],
    accent: "text-sky-400", gradient: "linear-gradient(90deg, #5D9AE8, #234F8B)",
  },
  {
    id: "neurodeveloppement", number: "05", icon: "🧠", tag: "1 Fiche Transversale · Développemental",
    name: "Neurodéveloppement & Confort",
    description: "Pôle transversal qui irrigue l'ensemble du référentiel. L'évaluation systématique de la douleur et du stress néonatal via des échelles validées — PIPP-R, COMFORT, DAN — constitue un impératif éthique et clinique. La douleur non traitée engendre des séquelles neurodéveloppementales mesurables. Intègre les principes du NIDCAP, ancrant les soins dans le paradigme des Soins Centrés sur la Famille.",
    procedures: ["Évaluation douleur (PIPP-R, DAN, COMFORT)", "Gestion du stress néonatal", "Soutien neurodéveloppemental (NIDCAP)", "Analgésie non pharmacologique", "Intégration parentale"],
    accent: "text-emerald-400", gradient: "linear-gradient(90deg, #7AE85D, #2B8B23)",
  },
];

export type Rubrique = { num: string; icon: string; title: string; sub: string };
export const matriceRubriques: Rubrique[] = [
  { num: "01", icon: "📋", title: "Titre de la Procédure", sub: "Intitulé normalisé selon nomenclature internationale" },
  { num: "02", icon: "🏥", title: "Domaine Clinique", sub: "Classification par pôle et spécialité" },
  { num: "03", icon: "🎯", title: "Objectif", sub: "Finalité clinique et attendu de résultats" },
  { num: "04", icon: "🔬", title: "Physiopathologie", sub: "Ancrage mécanistique — le « pourquoi » de chaque geste" },
  { num: "05", icon: "✅", title: "Indications", sub: "Critères décisionnels d'initiation de la procédure" },
  { num: "06", icon: "⛔", title: "Contre-indications", sub: "Situations cliniques interdisant la procédure" },
  { num: "07", icon: "🛠️", title: "Pré-requis", sub: "Matériel, personnel qualifié, environnement sécurisé" },
  { num: "08", icon: "📐", title: "Procédure Pas à Pas", sub: "Algorithme séquentiel standardisé et reproductible" },
  { num: "09", icon: "👁️", title: "Surveillance Post-Procédure", sub: "Paramètres de monitoring et seuils d'alerte" },
  { num: "10", icon: "⚠️", title: "Complications & Gestion", sub: "Conduite à tenir en cas d'événement indésirable" },
  { num: "11", icon: "🗓️", title: "Planification des Soins", sub: "Continuité du parcours de soins post-procédure" },
  { num: "12", icon: "⚖️", title: "Traçabilité Médico-légale", sub: "Chaîne de responsabilités vérifiable et documentée" },
  { num: "13", icon: "👨‍👩‍👧", title: "Intégration des Parents", sub: "Modèle des Soins Centrés sur la Famille (SCF · NIDCAP)" },
  { num: "14", icon: "📚", title: "Références & Lignes Directrices", sub: "SFN · AAP · OMS · HAS · Evidence-Based Medicine" },
];

export const methodologie = [
  { icon: "🔍", num: "Étape 01", title: "Identification des Domaines Critiques", body: "Sur la base des indicateurs de qualité et de sécurité en néonatologie, les cinq pôles cliniques ont été définis. Le choix des 20 procédures fut guidé par leur fréquence d'application, leur potentiel d'impact sur les résultats du patient et leur variabilité de pratique rapportée dans la littérature (SFN, 2022 ; AAP, 2018)." },
  { icon: "📖", num: "Étape 02", title: "Revue Systématique de la Littérature", body: "Identification de tous les documents pertinents : essais cliniques randomisés, méta-analyses, revues systématiques (notamment Cochrane Neonatal), études observationnelles et rapports de sociétés savantes internationales. PubMed · Cochrane · Embase." },
  { icon: "⚖️", num: "Étape 03", title: "Confrontation aux Recommandations", body: "Les données probantes recueillies ont été confrontées aux recommandations de la SFN, de l'AAP, de l'OMS et de la HAS, permettant de classer les recommandations selon un niveau de preuve et une force d'avis reconnus internationalement." },
  { icon: "🤝", num: "Étape 04", title: "Consensus Expert", body: "Lorsque l'évidence était insuffisante ou contradictoire, un consensus expert fut mobilisé pour formuler des recommandations basées sur l'expérience collective et la meilleure compréhension physiopathologique disponible." },
  { icon: "🏗️", num: "Étape 05", title: "Structuration en Matrice 14 Rubriques", body: "Conception de l'architecture documentaire garantissant l'exhaustivité méthodique : dimensions scientifiques, techniques, cliniques et relationnelles. Le résultat transcende le simple mode opératoire pour constituer un véritable outil de décision clinique." },
];

export const organismes = [
  "SFN · Société Française de Néonatologie",
  "AAP · American Academy of Pediatrics",
  "OMS · Organisation Mondiale de la Santé",
  "HAS · Haute Autorité de Santé",
  "Cochrane Neonatal Group",
  "ILCOR · Neonatal Life Support",
  "EFCNI · European Foundation for Newborns",
  "SFAR · Société Française d'Anesthésie",
  "NICE · UK Clinical Excellence",
  "JCI · Joint Commission International",
  "Ministère de la Santé du Maroc",
  "ANSM · Agence du Médicament",
  "CNRHP · Hémobiologie Périnatale",
  "Réseau Périnatal Méditerranée",
  "AP-HP · Necker-Enfants Malades",
  "HUG · Hôpitaux Universitaires Genève",
];

export const tickerTerms = [
  "Stabilisation néonatale", "Thermorégulation active", "Nutrition entérale progressive",
  "Support ventilatoire CPAP", "Soins centrés sur la famille", "Traçabilité médico-légale",
  "Photothérapie néonatale", "Médecine fondée sur les preuves", "Homéostasie du nouveau-né",
  "NIDCAP · Soins développementaux", "Échelles PIPP-R · DAN · COMFORT", "Cathéter veineux central",
];

export const author = {
  name: "Aimad Aslaoui",
  role: "Étudiant-chercheur · Licence INP · Soins Infirmiers",
  institution: "ISPITS Béni Mellal · 2024–2025",
  encadrants: "Pr. Ouakhir Hassan · Dr. Kannane Soukaina",
  bio: "Auteur du Manuel de Fiches Techniques Standardisées en Néonatologie et Pédiatrie — un référentiel élaboré selon le paradigme de la médecine fondée sur les preuves. Travail centré sur l'harmonisation des pratiques infantiles et la sécurisation du parcours de soins néonatal.",
  citation: "« Le soin néonatal n'est pas la simple exécution d'un geste : c'est l'orchestration d'une physiologie immature, d'une famille bouleversée et d'une éthique de la vulnérabilité. »",
};

export const resumes = {
  fr: {
    label: "Français", dir: "ltr" as const,
    paragraphs: [
      "La néonatologie se positionne comme une discipline médicale de haute complexité, où la prise en charge de patients dont les systèmes physiologiques sont intrinsèquement immatures exige un niveau d'expertise et de vigilance exceptionnel. La vulnérabilité fondamentale du nouveau-né, particulièrement celui qui est prématuré ou souffre de comorbidités sévères, implique une dépendance absolue vis-à-vis de l'environnement de soins pour assurer son adaptation extra-utérine.",
      "Ce travail de recherche s'inscrit directement dans le paradigme de la médecine fondée sur les preuves, avec pour objectif premier de concevoir un manuel normatif conçu pour agir comme un levier efficace d'harmonisation des pratiques et de sécurisation du parcours de soins pour les nouveau-nés. Le référentiel de 20 fiches techniques a été mené selon une approche méthodologique rigoureuse, structurée autour d'une revue systématique et critique de la littérature scientifique internationale.",
      "Ce référentiel ne se contente pas de fournir des instructions techniques ; il offre un cadre complet qui prend en compte l'ensemble de l'écosystème de soins — reconnaissant que la famille est un facteur protecteur essentiel, et que la sécurité et la responsabilité sont primordiales dans la pratique clinique contemporaine.",
    ],
    keywords: ["Néonatologie", "Pédiatrie", "Fiches Techniques", "Standardisation", "Qualité", "Sécurité des Soins", "Evidence-Based Medicine"],
  },
  en: {
    label: "English", dir: "ltr" as const,
    paragraphs: [
      "Neonatology constitutes a highly complex medical discipline wherein the management of patients with intrinsically immature physiological systems demands exceptional expertise and clinical vigilance. The fundamental vulnerability of the newborn, particularly those born preterm or presenting with severe comorbidities, entails an absolute dependence on the care environment to ensure successful extrauterine adaptation.",
      "This research is anchored in the evidence-based medicine paradigm, aiming to design a normative manual conceived as an effective lever for harmonising practice and securing the care pathway of newborns. The reference corpus of 20 standardised technical sheets was developed through a rigorous methodology — a systematic and critical review of the international scientific literature.",
      "Beyond technical instructions, the referential offers a comprehensive framework accounting for the entire care ecosystem — recognising that the family is an essential protective factor, and that safety and accountability are paramount in contemporary clinical practice.",
    ],
    keywords: ["Neonatology", "Pediatrics", "Technical Sheets", "Standardisation", "Quality", "Patient Safety", "Evidence-Based Medicine"],
  },
  ar: {
    label: "العربية", dir: "rtl" as const,
    paragraphs: [
      "يُعدُّ طبُّ حديثي الولادة تخصصاً طبياً بالغ التعقيد، حيث تقتضي رعايةُ مرضى ذوي أجهزة فسيولوجية غير مكتملة النضج مستوى استثنائياً من الخبرة العلمية واليقظة السريرية. إنَّ الضعفَ الجوهريَ لدى المولود الجديد، لا سيما الخدج أو أولئك المصابين باعتلالات مشتركة وخيمة، يستلزم اعتماداً كلياً على بيئة الرعاية لضمان التكيُّف الفسيولوجي الناجح بعد الخروج من الرحم.",
      "يتمحور التحدّي المركزي لهذا المشروع حول تعزيز حالة الاستتباب الداخلي (Homeostasis) لدى المولود الجديد — الحالة الفسيولوجية المستقرة للكائن الحي والعمليات الديناميكية التي يحافظ من خلالها على هذا التوازن في مواجهة الضغوط البيئية.",
      "يقدِّم هذا المرجع إطاراً شاملاً يأخذ بعين الاعتبار منظومة الرعاية بأكملها — مع الاعتراف بأن الأسرة عامل وقائي جوهري، وأن السلامة والمساءلة من الأولويات القصوى في الممارسة السريرية المعاصرة.",
    ],
    keywords: ["طب حديثي الولادة", "التوحيد المعياري", "الجودة والسلامة", "الاستتباب الداخلي", "الطب القائم على الأدلة"],
  },
};

export type Flashcard = { id: string; front: string; back: string; category: string };
export const flashcards: Flashcard[] = [
  { id: "fc1", category: "Néonatologie", front: "Score d'Apgar — moments d'évaluation ?", back: "1 min, 5 min, 10 min de vie. Cinq items : FC, respiration, tonus, réactivité, coloration (0-2 chacun)." },
  { id: "fc2", category: "Thermorégulation", front: "Cible thermique axillaire du nouveau-né ?", back: "36,5 – 37,5 °C. En-dessous : hypothermie → risque d'acidose, hypoglycémie, troubles de coagulation." },
  { id: "fc3", category: "Respiratoire", front: "Cible SpO₂ chez le prématuré sous O₂ ?", back: "90 – 95 % (éviter l'hyperoxie → rétinopathie du prématuré, dysplasie broncho-pulmonaire)." },
  { id: "fc4", category: "Réanimation", front: "Délai maximal avant ventilation positive (VPP) ?", back: "60 secondes — règle d'or NRP 8e édition. VPP au masque 40-60/min, FiO₂ 21 % (terme) ou 30 % (prématuré)." },
  { id: "fc5", category: "Douleur", front: "Échelle de douleur validée pour le prématuré ?", back: "PIPP-R (Premature Infant Pain Profile - Revised). Items : âge gestationnel, état d'éveil, FC, SpO₂, expressions faciales." },
  { id: "fc6", category: "Hygiène", front: "Les 5 indications OMS du lavage des mains ?", back: "1) Avant contact patient · 2) Avant geste aseptique · 3) Après risque d'exposition liquide biologique · 4) Après contact patient · 5) Après contact environnement." },
  { id: "fc7", category: "Nutrition", front: "Volume initial d'alimentation entérale du prématuré ?", back: "10-20 mL/kg/j, augmentation progressive de 15-20 mL/kg/j selon tolérance. Lait maternel à privilégier (réduit l'ECUN)." },
  { id: "fc8", category: "Médicaments", front: "Règle des 7 B en administration médicamenteuse ?", back: "Bon patient · Bon médicament · Bonne dose · Bonne voie · Bon moment · Bonne documentation · Bonne réponse." },
  { id: "fc9", category: "Cardio", front: "Calibre cathéter veineux périphérique du nouveau-né ?", back: "24G ou 26G. Sites privilégiés : dos de la main, avant-bras, pied, cuir chevelu (< 6 mois)." },
  { id: "fc10", category: "Examen clinique", front: "FC normale du nourrisson de 6 mois au repos ?", back: "100 – 160 bpm. À mesurer sur 1 minute pleine (auscultation ou palpation), pas d'extrapolation." },
];

export type Scenario = {
  id: string; title: string; pole: string;
  level: "Débutant" | "Intermédiaire" | "Expert";
  duration: string; vitals: { fc: number; spo2: number; fr: number; temp: number };
  briefing: string; objectives: string[]; triggers: string[];
};

export const scenarios: Scenario[] = [
  {
    id: "sim-detresse-resp",
    title: "Détresse respiratoire d'un prématuré 32 SA",
    pole: "Support Respiratoire",
    level: "Intermédiaire", duration: "25 min",
    vitals: { fc: 178, spo2: 84, fr: 72, temp: 36.1 },
    briefing: "Vous prenez en charge un nouveau-né de 32 SA, poids 1 650 g, à H+2 de vie. Geignement expiratoire, tirage intercostal, battement des ailes du nez. Le score de Silverman est à 6/10.",
    objectives: [
      "Reconnaître les signes cliniques d'un SDRA néonatal",
      "Initier un support ventilatoire CPAP avec PEEP adaptée",
      "Titrer la FiO₂ pour cible SpO₂ 90-95%",
      "Documenter l'évolution et alerter le pédiatre selon protocole",
    ],
    triggers: [
      "T0 : SpO₂ chute à 78 % malgré O₂ aux lunettes 2 L/min",
      "T+5 : Apnée > 20 sec avec bradycardie à 88 bpm",
      "T+15 : Si CPAP non instauré, désaturation persistante < 80 %",
    ],
  },
  {
    id: "sim-hypothermie",
    title: "Hypothermie sévère post-naissance",
    pole: "Accueil & Homéostasie",
    level: "Débutant", duration: "15 min",
    vitals: { fc: 110, spo2: 94, fr: 48, temp: 34.8 },
    briefing: "Nouveau-né à terme, accouchement à domicile, transport SAMU. T° axillaire d'admission 34,8 °C. Cyanose des extrémités, marbrures, pleurs faibles.",
    objectives: [
      "Identifier l'hypothermie comme urgence vitale",
      "Mettre en œuvre un réchauffement progressif (max 0,5 °C/h)",
      "Prévenir les complications : hypoglycémie, acidose",
      "Tracer chaque mesure thermique et hémodynamique",
    ],
    triggers: [
      "T+10 : Glycémie capillaire à 1,8 mmol/L",
      "T+20 : Si pas de réchauffement actif → bradycardie 90 bpm",
    ],
  },
  {
    id: "sim-ecun",
    title: "Suspicion d'entérocolite ulcéro-nécrosante",
    pole: "Nutrition & Métabolisme",
    level: "Expert", duration: "30 min",
    vitals: { fc: 165, spo2: 92, fr: 58, temp: 37.9 },
    briefing: "Prématuré 28 SA, J10 de vie. Ballonnement abdominal majeur, résidus gastriques bilieux 8 mL, sang dans les selles, instabilité hémodynamique.",
    objectives: [
      "Stopper immédiatement l'alimentation entérale",
      "Mettre en place une sonde gastrique de décharge",
      "Préparer l'imagerie abdominale et le bilan biologique",
      "Anticiper la prise en charge chirurgicale potentielle",
    ],
    triggers: [
      "T+5 : Apparition de pneumatose intestinale à l'ASP",
      "T+15 : Aggravation hémodynamique → remplissage NaCl 10 mL/kg",
    ],
  },
];

export const faqItems = [
  { q: "À qui s'adresse cette plateforme ?", a: "Aux étudiant·e·s en sciences infirmières (Licence INP, IFSI, ISPITS), aux jeunes infirmier·ère·s en poste en néonatologie/pédiatrie, ainsi qu'aux formateur·trice·s cliniques cherchant un référentiel normalisé pour leurs séances d'enseignement et simulations." },
  { q: "Quelle est la source scientifique des fiches techniques ?", a: "Chaque fiche est issue d'une revue systématique de la littérature internationale (PubMed, Cochrane Neonatal, Embase), confrontée aux recommandations SFN, AAP, OMS, HAS et NICE. Le niveau de preuve est explicitement déclaré pour chaque recommandation." },
  { q: "Les protocoles sont-ils utilisables au lit du patient ?", a: "Oui, mais en complément d'une formation pratique encadrée. Les fiches constituent un référentiel pédagogique normatif — l'expertise clinique de proximité et les protocoles locaux du service restent prioritaires en situation réelle." },
  { q: "Puis-je exporter les fiches en PDF ?", a: "Oui. Chaque page de protocole comporte un bouton « Exporter en PDF » qui génère une fiche imprimable conforme à la matrice des 14 rubriques." },
  { q: "La plateforme est-elle disponible en plusieurs langues ?", a: "Le corpus complet est rédigé en français médical normalisé. Les résumés scientifiques sont également disponibles en anglais et en arabe (avec support RTL natif)." },
  { q: "Comment la confidentialité et l'éthique sont-elles garanties ?", a: "Aucune donnée patient n'est manipulée. Les scénarios de simulation utilisent des cas pédagogiques fictifs. La plateforme respecte les principes du RGPD et de la CNDP marocaine pour les usages éducatifs." },
  { q: "Comment progresser efficacement ?", a: "Une boucle pédagogique : (1) lire la fiche du pôle, (2) tester via flashcards, (3) confronter la décision en simulation, (4) auto-évaluer via la grille de compétences, (5) répéter à 24h puis 7j (espaced repetition)." },
];
