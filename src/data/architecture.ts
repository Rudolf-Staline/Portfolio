export type Locale = 'fr' | 'en'
export type Architecture = {
  title: string
  description: string
  nodes: { title: string; detail: string; owner?: string }[]
  checks: string[]
  note: string
}

export const architecture: Record<string, Record<Locale, Architecture>> = {
  risksim: {
    fr: {
      title: 'Du registre à la réserve budgétaire',
      description: 'Les hypothèses restent modifiables ; la restitution permet de comprendre leur effet sur le budget.',
      nodes: [
        { title: 'Registre Excel', detail: 'Risques, distributions et corrélations', owner: 'Rudolf' },
        { title: 'Moteur Python', detail: 'Scénarios de coûts Monte Carlo', owner: 'Daniel Awaga' },
        { title: 'Analyse', detail: 'P50 / P80 / P90 et sensibilité', owner: 'Restitution : Rudolf' },
        { title: 'Interface React', detail: 'Comparer, ajuster, relancer', owner: 'Rudolf' }
      ],
      checks: ['Matrice invalide refusée', 'Scénarios synthétiques', 'Distribution Windows locale'],
      note: 'Vue fonctionnelle simplifiée. Ma contribution couvre le registre, la restitution, l’analyse de sensibilité, l’interface et la distribution ; le moteur de calcul est porté par Daniel Awaga.'
    },
    en: {
      title: 'From risk register to budget reserve',
      description: 'Assumptions remain editable; the results expose their effect on the budget.',
      nodes: [
        { title: 'Excel register', detail: 'Risks, distributions and correlations', owner: 'Rudolf' },
        { title: 'Python engine', detail: 'Monte Carlo cost scenarios', owner: 'Daniel Awaga' },
        { title: 'Analysis', detail: 'P50 / P80 / P90 and sensitivity', owner: 'Presentation: Rudolf' },
        { title: 'React interface', detail: 'Compare, adjust, rerun', owner: 'Rudolf' }
      ],
      checks: ['Invalid matrices rejected', 'Synthetic scenarios', 'Local Windows distribution'],
      note: 'Simplified functional view. I handled the register, visualisation, sensitivity analysis, interface and distribution; Daniel Awaga led the calculation engine.'
    }
  },
  automl: {
    fr: {
      title: 'Une évaluation encadrée, du CSV à l’export',
      description: 'Les contrôles font partie du pipeline, y compris après l’entraînement.',
      nodes: [
        { title: 'CSV et cible', detail: 'Audit des variables et fuites suspectes' },
        { title: 'Validation', detail: 'Prétraitements ajustés dans chaque fold' },
        { title: 'Recherche Optuna', detail: 'Budget fixé et essais suivis dans SQLite' },
        { title: 'Exports', detail: 'Pipeline, prédictions et rapport HTML' }
      ],
      checks: ['393 tests', 'Essais reprenables', 'Empreintes et relecture des exports'],
      note: 'Projet individuel, avec Codex comme assistant au développement. Les démonstrations portent sur la classification, la régression et une fuite synthétique.'
    },
    en: {
      title: 'A checked evaluation, from CSV to export',
      description: 'Checks are part of the pipeline, including after model training.',
      nodes: [
        { title: 'CSV and target', detail: 'Feature audit and suspected leakage' },
        { title: 'Validation', detail: 'Preprocessing fitted inside each fold' },
        { title: 'Optuna search', detail: 'Fixed budget and SQLite trial tracking' },
        { title: 'Exports', detail: 'Pipeline, predictions and HTML report' }
      ],
      checks: ['393 tests', 'Resumable trials', 'File hashes and export readback'],
      note: 'Individual project, with Codex assisting development. Demonstrations cover classification, regression and synthetic leakage.'
    }
  },
  '01': {
    fr: {
      title: 'Du dossier tabulaire à une prédiction examinable',
      description: 'Comparer le modèle et ses explications dans un même prototype académique.',
      nodes: [
        { title: 'Données', detail: '782 patients, 53 variables brutes' },
        { title: 'Comparaison', detail: 'SVM, RF, LightGBM et CatBoost' },
        { title: 'Évaluation et SHAP', detail: 'Rappel et facteurs de la prédiction' },
        { title: 'Interface Flask', detail: 'Consulter prédictions et explications' }
      ],
      checks: ['4 familles de modèles', 'Tests automatisés', 'Prototype académique'],
      note: 'Schéma fonctionnel simplifié. Aucune validation clinique ; le prototype n’est pas destiné aux soins.'
    },
    en: {
      title: 'From tabular records to an inspectable prediction',
      description: 'Bring model evaluation and explanations into one academic prototype.',
      nodes: [
        { title: 'Data', detail: '782 patients, 53 raw variables' },
        { title: 'Comparison', detail: 'SVM, RF, LightGBM and CatBoost' },
        { title: 'Evaluation and SHAP', detail: 'Recall and prediction factors' },
        { title: 'Flask interface', detail: 'Inspect predictions and explanations' }
      ],
      checks: ['4 model families', 'Automated tests', 'Academic prototype'],
      note: 'Simplified functional view. No clinical validation; this prototype is not intended for patient care.'
    }
  }
}
