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
