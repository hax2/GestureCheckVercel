(function () {
  const config = {
    manifestUrl: "all_rating_videos.json",
    assetBaseUrl: "assets/rating-videos/",
    assignmentUrl: "/api/assignment",
    participantUrl: "/api/participants",
    submitUrl: "/api/responses",
    submitMode: "cors",
    submitEachResponse: true,
    completionUrl: "",
    completionCode: "GESTURE-RATING-COMPLETE",
    blockSize: 20,
    targetQuota: 20,
    ...(window.GESTURE_RATING_TASK_CONFIG || {}),
  };

  const copy = {
    en: {
      appTitle: "Gesture Rating Task",
      pageTitle: "Gesture Rating Task",
      language: "Language",
      participantId: "Participant ID",
      participantPlaceholder: "Optional",
      instructionsKicker: "Instructions",
      instructionsTitle: "Gesture Rating Task Instructions",
      instructionsBody: [
        "In this task, you will watch a series of gesture videos.",
        "For each video, a word and a gesture will be presented.",
        "Please answer the following question for each video using a scale from 1 to 5:",
        "There are no right or wrong answers. Please respond based on your immediate impression.",
      ],
      scaleRating: "Rating",
      scaleMeaning: "Meaning",
      consentKicker: "Informed consent",
      consentTitle: "Participant consent",
      consentIntro: "Please read this information before continuing.",
      consentItems: [
        "Responsible organisation: the research team or institution named in the study invitation is responsible for this study and should provide contact details for questions or data requests.",
        "Purpose: this academic study asks how people perceive gesture videos used in vocabulary learning.",
        "What you will do: provide background information, watch gesture videos, and rate each video.",
        "Data collected: participant ID if provided, session ID, background survey answers, ratings, optional notes, video assignment metadata, timestamps, and technical submission records.",
        "Legal basis: your consent is used as the basis for collecting and using your survey responses for the research purpose described here.",
        "Voluntary participation: taking part is voluntary. You can stop at any time by closing this page.",
        "Withdrawal: if you provided a participant ID, contact the research team with that ID to request withdrawal where possible.",
        "Data use: responses may be analysed for academic research and reported in aggregate or anonymised form.",
        "Retention, recipients, and transfers: the study invitation or privacy sheet should state how long data is kept, who can receive it, and whether it is transferred outside the EU/EEA.",
        "Your rights: you may have rights to access, correct, delete, restrict, or object to processing of your personal data, and to complain to a data protection authority.",
        "Automated decisions: this survey does not make automated decisions about you.",
      ],
      consentStatements: {
        adult: "I am 18 or older.",
        read: "I have read and understood the study information above.",
        voluntary: "I understand participation is voluntary and I can stop at any time.",
        research_use: "I consent to my responses and background information being used for academic research as described.",
      },
      consentSaved: "Consent recorded.",
      consentContinue: "Continue",
      dimensionHead: "Question",
      chooseAll: "Choose one score for each row.",
      completeAll: "Please complete all six ratings before continuing.",
      watchVideoFirst: "Please watch the video before rating.",
      complete: "Block complete. Your ratings are saved in this browser.",
      autoSubmitted: "Each saved response is submitted automatically.",
      savedLocalFailed: "Saved locally, but server submission failed: {message}.",
      demographicsKicker: "Before you start",
      demographicsTitle: "Participant information",
      demographicsSaved: "Participant information saved.",
      start: "Start",
      age: "Age",
      gender: "Gender",
      nativeLanguage: "Native language",
      education: "Highest level of education",
      handedness: "Handedness",
      gestureCultureFamiliarity: "Familiarity with European gesture cultures",
      options: {
        gender: {
          woman: "Woman",
          man: "Man",
          non_binary: "Non-binary",
          prefer_not_to_say: "Prefer not to say",
          self_describe: "Self-describe",
        },
        education: {
          secondary: "Secondary school",
          vocational: "Vocational training",
          bachelor: "Bachelor's degree",
          master: "Master's degree",
          doctorate: "Doctorate",
          other: "Other",
        },
        handedness: {
          right: "Right-handed",
          left: "Left-handed",
          both: "Both / ambidextrous",
        },
        familiarity: {
          none: "Not familiar",
          low: "Slightly familiar",
          moderate: "Moderately familiar",
          high: "Very familiar",
        },
      },
      progress: "Video {current} of {total}",
      blockSummary: "Block {block}: videos {start}-{end} of {total}",
      assignmentSummary: "Adaptive assignment: {count} videos selected from the full set.",
      saveContinue: "Save and continue",
      finish: "Finish",
      back: "Back",
      notes: "Notes, optional",
      notesPlaceholder: "Anything unclear about this gesture?",
      likert: {
        1: "Not at all",
        2: "A little / Slightly",
        3: "Moderately / Somewhat",
        4: "Very",
        5: "Extremely",
      },
      dimensions: [
        ["iconicity", "How much does the gesture visually resemble the meaning of the word?"],
        ["sensorimotor_imagery", "How much does the gesture feel like a real action or experience?"],
        ["motional_salience_gesture", "How big and dynamic is the movement?"],
        ["emotional_salience_facial_expression", "How much emotion is the face conveying?"],
        ["cultural_familiarity", "How familiar or common does the gesture seem in your country?"],
        ["enactment_potential", "How easy would it be to perform this gesture?"],
      ],
    },
    de: {
      appTitle: "Gestenbewertung",
      pageTitle: "Gestenbewertung",
      language: "Sprache",
      participantId: "Teilnehmer-ID",
      participantPlaceholder: "Optional",
      instructionsKicker: "Anleitung",
      instructionsTitle: "Anleitung zur Gestenbewertung",
      instructionsBody: [
        "In dieser Aufgabe werden Ihnen mehrere Videos mit Gesten gezeigt.",
        "Für jedes Video werden ein Wort und eine Geste präsentiert.",
        "Bitte beantworten Sie die folgende Frage für jedes Video anhand einer Skala von 1 bis 5:",
        "Es gibt keine richtigen oder falschen Antworten. Bitte antworten Sie basierend auf Ihrem unmittelbaren Eindruck.",
      ],
      scaleRating: "Bewertung",
      scaleMeaning: "Bedeutung",
      consentKicker: "Einwilligung",
      consentTitle: "Einwilligung zur Teilnahme",
      consentIntro: "Bitte lesen Sie diese Informationen, bevor Sie fortfahren.",
      consentItems: [
        "Verantwortliche Organisation: Das in der Studieneinladung genannte Forschungsteam oder die dort genannte Institution ist für diese Studie verantwortlich und sollte Kontaktdaten für Fragen oder Datenanfragen bereitstellen.",
        "Zweck: Diese akademische Studie untersucht, wie Menschen Gestenvideos für das Vokabellernen wahrnehmen.",
        "Ablauf: Sie geben Hintergrundinformationen an, sehen sich Gestenvideos an und bewerten jedes Video.",
        "Erhobene Daten: Teilnehmer-ID, falls angegeben, Sitzungs-ID, Antworten aus dem Hintergrundfragebogen, Bewertungen, optionale Notizen, Metadaten zur Videozuweisung, Zeitstempel und technische Übermittlungsdaten.",
        "Rechtsgrundlage: Ihre Einwilligung dient als Grundlage für die Erhebung und Nutzung Ihrer Umfrageantworten für den hier beschriebenen Forschungszweck.",
        "Freiwilligkeit: Die Teilnahme ist freiwillig. Sie können jederzeit abbrechen, indem Sie diese Seite schließen.",
        "Widerruf: Wenn Sie eine Teilnehmer-ID angegeben haben, kontaktieren Sie das Forschungsteam mit dieser ID, um nach Möglichkeit einen Widerruf zu beantragen.",
        "Datennutzung: Antworten können für akademische Forschung analysiert und in aggregierter oder anonymisierter Form berichtet werden.",
        "Aufbewahrung, Empfänger und Übermittlungen: Die Studieneinladung oder Datenschutzhinweise sollten angeben, wie lange Daten gespeichert werden, wer sie erhalten kann und ob sie außerhalb der EU/des EWR übermittelt werden.",
        "Ihre Rechte: Sie können Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung oder Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten sowie ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde haben.",
        "Automatisierte Entscheidungen: Diese Umfrage trifft keine automatisierten Entscheidungen über Sie.",
      ],
      consentStatements: {
        adult: "Ich bin mindestens 18 Jahre alt.",
        read: "Ich habe die Studieninformationen oben gelesen und verstanden.",
        voluntary: "Ich verstehe, dass die Teilnahme freiwillig ist und ich jederzeit abbrechen kann.",
        research_use: "Ich willige ein, dass meine Antworten und Hintergrundinformationen wie beschrieben für akademische Forschung verwendet werden.",
      },
      consentSaved: "Einwilligung gespeichert.",
      consentContinue: "Weiter",
      dimensionHead: "Frage",
      chooseAll: "Wählen Sie für jede Zeile eine Bewertung aus.",
      completeAll: "Bitte vervollständigen Sie alle sechs Bewertungen, bevor Sie fortfahren.",
      watchVideoFirst: "Bitte sehen Sie sich zuerst das Video an.",
      complete: "Block abgeschlossen. Ihre Bewertungen sind in diesem Browser gespeichert.",
      autoSubmitted: "Jede gespeicherte Antwort wird automatisch übermittelt.",
      savedLocalFailed: "Lokal gespeichert, aber die Übermittlung an den Server ist fehlgeschlagen: {message}.",
      demographicsKicker: "Vor dem Start",
      demographicsTitle: "Angaben zur Person",
      demographicsSaved: "Angaben zur Person gespeichert.",
      start: "Start",
      age: "Alter",
      gender: "Geschlecht",
      nativeLanguage: "Muttersprache",
      education: "Höchster Bildungsabschluss",
      handedness: "Händigkeit",
      gestureCultureFamiliarity: "Vertrautheit mit europäischen Gestenkulturen",
      options: {
        gender: {
          woman: "Frau",
          man: "Mann",
          non_binary: "Nicht-binär",
          prefer_not_to_say: "Keine Angabe",
          self_describe: "Selbstbeschreibung",
        },
        education: {
          secondary: "Sekundarschule",
          vocational: "Berufsausbildung",
          bachelor: "Bachelorabschluss",
          master: "Masterabschluss",
          doctorate: "Promotion",
          other: "Andere",
        },
        handedness: {
          right: "Rechtshändig",
          left: "Linkshändig",
          both: "Beidhändig / ambidexter",
        },
        familiarity: {
          none: "Nicht vertraut",
          low: "Etwas vertraut",
          moderate: "Mäßig vertraut",
          high: "Sehr vertraut",
        },
      },
      progress: "Video {current} von {total}",
      blockSummary: "Block {block}: Videos {start}-{end} von {total}",
      assignmentSummary: "Adaptive Zuweisung: {count} Videos aus dem gesamten Set ausgewählt.",
      saveContinue: "Speichern und fortfahren",
      finish: "Beenden",
      back: "Zurück",
      notes: "Notizen, optional",
      notesPlaceholder: "War etwas an dieser Geste unklar?",
      likert: {
        1: "Überhaupt nicht",
        2: "Ein wenig / Leicht",
        3: "Mäßig",
        4: "Sehr",
        5: "Äußerst",
      },
      dimensions: [
        ["iconicity", "Wie sehr ähnelt die Geste visuell der Bedeutung des Wortes?"],
        ["sensorimotor_imagery", "Wie sehr fühlt sich die Geste wie eine reale Handlung oder Erfahrung an?"],
        ["motional_salience_gesture", "Wie groß und dynamisch ist die Bewegung?"],
        ["emotional_salience_facial_expression", "Wie viel Emotion vermittelt das Gesicht?"],
        ["cultural_familiarity", "Wie vertraut oder verbreitet erscheint dir diese Geste in deinem Land?"],
        ["enactment_potential", "Wie leicht wäre es, diese Geste auszuführen?"],
      ],
    },
    it: {
      appTitle: "Valutazione dei Gesti",
      pageTitle: "Valutazione dei Gesti",
      language: "Lingua",
      participantId: "ID partecipante",
      participantPlaceholder: "Facoltativo",
      instructionsKicker: "Istruzioni",
      instructionsTitle: "Istruzioni per la valutazione dei gesti",
      instructionsBody: [
        "In questo compito verranno mostrati diversi video di gesti.",
        "Per ogni video saranno presentati una parola e un gesto.",
        "Si prega di rispondere alla seguente domanda per ciascun video utilizzando una scala da 1 a 5:",
        "Non ci sono risposte giuste o sbagliate. Si prega di rispondere in base alla propria impressione immediata.",
      ],
      scaleRating: "Valutazione",
      scaleMeaning: "Significato",
      consentKicker: "Consenso informato",
      consentTitle: "Consenso alla partecipazione",
      consentIntro: "Si prega di leggere queste informazioni prima di continuare.",
      consentItems: [
        "Organizzazione responsabile: il team di ricerca o l'istituzione indicati nell'invito allo studio sono responsabili di questo studio e dovrebbero fornire i contatti per domande o richieste sui dati.",
        "Scopo: questo studio accademico esamina come le persone percepiscono video di gesti usati nell'apprendimento del vocabolario.",
        "Cosa farai: fornirai informazioni di base, guarderai video di gesti e valuterai ogni video.",
        "Dati raccolti: ID partecipante se fornito, ID sessione, risposte al questionario iniziale, valutazioni, note facoltative, metadati dell'assegnazione dei video, timestamp e dati tecnici di invio.",
        "Base giuridica: il tuo consenso viene usato come base per raccogliere e utilizzare le risposte al sondaggio per lo scopo di ricerca descritto qui.",
        "Partecipazione volontaria: la partecipazione è volontaria. Puoi interrompere in qualsiasi momento chiudendo questa pagina.",
        "Ritiro: se hai fornito un ID partecipante, contatta il team di ricerca con quell'ID per richiedere il ritiro, ove possibile.",
        "Uso dei dati: le risposte possono essere analizzate per ricerca accademica e riportate in forma aggregata o anonimizzata.",
        "Conservazione, destinatari e trasferimenti: l'invito allo studio o l'informativa sulla privacy dovrebbero indicare per quanto tempo i dati saranno conservati, chi può riceverli e se saranno trasferiti fuori dall'UE/SEE.",
        "I tuoi diritti: potresti avere il diritto di accedere, correggere, cancellare, limitare od opporti al trattamento dei tuoi dati personali, e di presentare reclamo a un'autorità per la protezione dei dati.",
        "Decisioni automatizzate: questo sondaggio non prende decisioni automatizzate su di te.",
      ],
      consentStatements: {
        adult: "Ho almeno 18 anni.",
        read: "Ho letto e compreso le informazioni sullo studio sopra.",
        voluntary: "Comprendo che la partecipazione è volontaria e che posso interrompere in qualsiasi momento.",
        research_use: "Acconsento all'uso delle mie risposte e informazioni di base per la ricerca accademica come descritto.",
      },
      consentSaved: "Consenso registrato.",
      consentContinue: "Continua",
      dimensionHead: "Domanda",
      chooseAll: "Scegli un punteggio per ogni riga.",
      completeAll: "Completa tutte e sei le valutazioni prima di continuare.",
      watchVideoFirst: "Guarda prima il video.",
      complete: "Blocco completato. Le valutazioni sono salvate in questo browser.",
      autoSubmitted: "Ogni risposta salvata viene inviata automaticamente.",
      savedLocalFailed: "Salvato localmente, ma l'invio al server non è riuscito: {message}.",
      demographicsKicker: "Prima di iniziare",
      demographicsTitle: "Informazioni sul partecipante",
      demographicsSaved: "Informazioni sul partecipante salvate.",
      start: "Inizia",
      age: "Età",
      gender: "Genere",
      nativeLanguage: "Lingua madre",
      education: "Livello di istruzione più alto",
      handedness: "Manualità",
      gestureCultureFamiliarity: "Familiarità con le culture gestuali europee",
      options: {
        gender: {
          woman: "Donna",
          man: "Uomo",
          non_binary: "Non binario",
          prefer_not_to_say: "Preferisco non rispondere",
          self_describe: "Autodescrizione",
        },
        education: {
          secondary: "Scuola secondaria",
          vocational: "Formazione professionale",
          bachelor: "Laurea triennale",
          master: "Laurea magistrale",
          doctorate: "Dottorato",
          other: "Altro",
        },
        handedness: {
          right: "Destrimane",
          left: "Mancino/a",
          both: "Entrambe / ambidestro/a",
        },
        familiarity: {
          none: "Non familiare",
          low: "Poco familiare",
          moderate: "Moderatamente familiare",
          high: "Molto familiare",
        },
      },
      progress: "Video {current} di {total}",
      blockSummary: "Blocco {block}: video {start}-{end} di {total}",
      assignmentSummary: "Assegnazione adattiva: {count} video selezionati dall'intero set.",
      saveContinue: "Salva e continua",
      finish: "Fine",
      back: "Indietro",
      notes: "Note, facoltative",
      notesPlaceholder: "Qualcosa non era chiaro in questo gesto?",
      likert: {
        1: "Per nulla",
        2: "Poco",
        3: "Abbastanza",
        4: "Molto",
        5: "Moltissimo",
      },
      dimensions: [
        ["iconicity", "Quanto assomiglia il gesto visivamente al significato della parola?"],
        ["sensorimotor_imagery", "Quanto sembra il gesto una vera azione o esperienza?"],
        ["motional_salience_gesture", "Quanto il movimento è ampio e dinamico?"],
        ["emotional_salience_facial_expression", "Quanta emozione trasmette il volto?"],
        ["cultural_familiarity", "Quanto è familiare o comune questo gesto nel tuo Paese?"],
        ["enactment_potential", "Quanto sarebbe facile eseguire questo gesto?"],
      ],
    },
  };

  const state = {
    videos: [],
    totalVideos: 0,
    block: 1,
    blockStart: 0,
    blockEnd: 0,
    assignmentId: "",
    sessionId: "",
    consent: {},
    consentComplete: false,
    demographics: {},
    demographicsComplete: false,
    index: 0,
    responses: {},
    watchedKeys: new Set(),
    language: ["en", "de", "it"].includes(new URLSearchParams(window.location.search).get("lang"))
      ? new URLSearchParams(window.location.search).get("lang")
      : "en",
  };

  const $ = (id) => document.getElementById(id);
  const appTitle = $("appTitle");
  const targetWord = $("targetWord");
  const videoTitle = $("videoTitle");
  const stimulusWord = $("stimulusWord");
  const videoPlayer = $("videoPlayer");
  const progressText = $("progressText");
  const progressBar = $("progressBar");
  const saveStatus = $("saveStatus");
  const blockSummary = $("blockSummary");
  const languageSelect = $("languageSelect");
  const participantId = $("participantId");
  const ratingForm = $("ratingForm");
  const ratingRows = $("ratingRows");
  const notes = $("notes");
  const notesLabel = $("notesLabel");
  const backButton = $("backButton");
  const nextButton = $("nextButton");
  const instructionsKicker = $("instructionsKicker");
  const instructionsTitle = $("instructionsTitle");
  const instructionsBody = $("instructionsBody");
  const scaleRatingHead = $("scaleRatingHead");
  const scaleMeaningHead = $("scaleMeaningHead");
  const scaleRows = $("scaleRows");
  const dimensionHead = $("dimensionHead");
  const consentPanel = $("consentPanel");
  const consentForm = $("consentForm");
  const consentKicker = $("consentKicker");
  const consentTitle = $("consentTitle");
  const consentBody = $("consentBody");
  const consentChecks = $("consentChecks");
  const consentStatus = $("consentStatus");
  const consentButton = $("consentButton");
  const demographicsPanel = $("demographicsPanel");
  const demographicsForm = $("demographicsForm");
  const demographicsKicker = $("demographicsKicker");
  const demographicsTitle = $("demographicsTitle");
  const demographicsStatus = $("demographicsStatus");
  const startButton = $("startButton");
  const ageInput = $("ageInput");
  const genderInput = $("genderInput");
  const nativeLanguageInput = $("nativeLanguageInput");
  const educationInput = $("educationInput");
  const handednessInput = $("handednessInput");
  const familiarityInput = $("familiarityInput");
  const workbench = $("workbench");

  function slug(title) {
    return title
      .replace(/\.[^.]+$/, "")
      .replace(/\.mov$/i, "")
      .replace(/[^A-Za-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  function videoUrl(item) {
    if (item.video_url) return item.video_url;
    if (item.video) return item.video;
    if (item.github_pages_path) return item.github_pages_path;
    return `${config.assetBaseUrl}${slug(item.title)}.mp4`;
  }

  function displayTargetWord(item) {
    if (!item) return "";
    if (item.target_words && item.target_words[state.language]) return item.target_words[state.language];
    return item.target_word || item.title;
  }

  function t() {
    return copy[state.language] || copy.en;
  }

  function format(text, values) {
    return text.replaceAll(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
  }

  function query() {
    return new URLSearchParams(window.location.search);
  }

  function syncUrl(overrides = {}) {
    const url = new URL(window.location.href);
    const current = query();
    const next = {
      manifest: current.get("manifest") || null,
      block_size: state.assignmentId ? null : current.get("block_size") || String(config.blockSize),
      block: state.assignmentId ? null : String(state.block),
      lang: state.language,
      ...overrides,
    };
    Object.entries(next).forEach(([key, value]) => {
      if (value == null || value === "") {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });
    window.history.replaceState({}, "", url.toString());
  }

  function storageKey() {
    const scope = state.assignmentId || `block-${state.block}`;
    return `gesture-rating-task:${participantId.value.trim() || state.sessionId || "anonymous"}:${scope}`;
  }

  function responseKey(item) {
    return `${item.collection || "video"}::${item.title}`;
  }

  function sessionId() {
    const key = "gesture-rating-task:session-id";
    let value = sessionStorage.getItem(key);
    if (!value) {
      const id = window.crypto && window.crypto.randomUUID
        ? window.crypto.randomUUID()
        : Math.random().toString(36).slice(2);
      value = `session_${id}`;
      sessionStorage.setItem(key, value);
    }
    return value;
  }

  function assignmentStorageKey(blockSize) {
    return `gesture-rating-task:assignment:${state.language}:${blockSize}:${config.targetQuota}:${state.sessionId}`;
  }

  function loadStoredAssignment(blockSize) {
    try {
      const stored = JSON.parse(sessionStorage.getItem(assignmentStorageKey(blockSize)) || "null");
      if (!stored || !Array.isArray(stored.videos) || !stored.videos.length) return null;
      return stored;
    } catch {
      sessionStorage.removeItem(assignmentStorageKey(blockSize));
      return null;
    }
  }

  function storeAssignment(blockSize, assignment) {
    sessionStorage.setItem(assignmentStorageKey(blockSize), JSON.stringify(assignment));
  }

  function consentKey() {
    return `gesture-rating-task:consent:${state.sessionId}`;
  }

  function demographicsKey() {
    return `gesture-rating-task:demographics:${state.sessionId}`;
  }

  function updateSelectOptions(select, labels) {
    Array.from(select.options).forEach((option) => {
      if (option.value && labels[option.value]) option.textContent = labels[option.value];
    });
  }

  function demographicsFromForm() {
    return {
      age: ageInput.value.trim(),
      gender: genderInput.value,
      native_language: nativeLanguageInput.value.trim(),
      education: educationInput.value,
      handedness: handednessInput.value,
      gesture_culture_familiarity: familiarityInput.value,
    };
  }

  function applyDemographics(values) {
    ageInput.value = values.age || "";
    genderInput.value = values.gender || "";
    nativeLanguageInput.value = values.native_language || "";
    educationInput.value = values.education || "";
    handednessInput.value = values.handedness || "";
    familiarityInput.value = values.gesture_culture_familiarity || "";
  }

  function loadDemographics() {
    try {
      const saved = JSON.parse(localStorage.getItem(demographicsKey()) || "null");
      if (!saved) return;
      state.demographics = saved.demographics || {};
      state.demographicsComplete = Boolean(saved.complete);
      applyDemographics(state.demographics);
    } catch {
      localStorage.removeItem(demographicsKey());
    }
  }

  function saveDemographics() {
    state.demographics = demographicsFromForm();
    state.demographicsComplete = true;
    localStorage.setItem(demographicsKey(), JSON.stringify({
      complete: true,
      demographics: state.demographics,
      saved_at: new Date().toISOString(),
    }));
  }

  function loadConsent() {
    try {
      const saved = JSON.parse(localStorage.getItem(consentKey()) || "null");
      if (!saved) return;
      state.consent = saved.consent || {};
      state.consentComplete = Boolean(saved.complete);
    } catch {
      localStorage.removeItem(consentKey());
    }
  }

  function saveConsent() {
    const checks = {};
    consentChecks.querySelectorAll("[data-consent]").forEach((input) => {
      checks[input.dataset.consent] = input.checked;
    });
    state.consent = {
      version: "2026-05-25",
      language: state.language,
      statements: checks,
      consented_at: new Date().toISOString(),
    };
    state.consentComplete = Object.values(checks).every(Boolean);
    localStorage.setItem(consentKey(), JSON.stringify({
      complete: state.consentComplete,
      consent: state.consent,
    }));
  }

  function renderConsent() {
    consentBody.innerHTML = `
      <p>${t().consentIntro}</p>
      <ul class="consent-list">
        ${t().consentItems.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
    consentChecks.innerHTML = Object.entries(t().consentStatements).map(([key, label]) => `
      <label class="checkbox-label">
        <input type="checkbox" data-consent="${key}" required ${state.consent.statements?.[key] ? "checked" : ""}>
        <span>${label}</span>
      </label>
    `).join("");
  }

  function renderFlowState() {
    consentPanel.classList.toggle("hidden", state.consentComplete);
    demographicsPanel.classList.toggle("hidden", !state.consentComplete || state.demographicsComplete);
    workbench.classList.toggle("hidden", !state.consentComplete || !state.demographicsComplete);
  }

  function currentItem() {
    return state.videos[state.index];
  }

  function currentResponseKey() {
    const item = currentItem();
    return item ? responseKey(item) : "";
  }

  function canRateCurrent() {
    const key = currentResponseKey();
    return Boolean(key && (state.watchedKeys.has(key) || state.responses[key]));
  }

  function setRatingEnabled(enabled) {
    ratingForm.classList.toggle("locked", !enabled);
    ratingRows.querySelectorAll("input[type='radio']").forEach((input) => {
      input.disabled = !enabled;
    });
    nextButton.disabled = !enabled;
    if (!enabled) {
      saveStatus.textContent = t().watchVideoFirst;
      saveStatus.classList.add("warning");
    } else if (saveStatus.textContent === t().watchVideoFirst) {
      saveStatus.textContent = config.submitUrl ? t().autoSubmitted : t().chooseAll;
      saveStatus.classList.remove("warning");
    }
  }

  function updateRatingLock() {
    if (!currentItem()) return;
    setRatingEnabled(canRateCurrent());
  }

  function markCurrentVideoWatched() {
    const key = currentResponseKey();
    if (!key || state.watchedKeys.has(key)) return;
    state.watchedKeys.add(key);
    updateRatingLock();
  }

  function setSelectedStyles() {
    ratingRows.querySelectorAll(".choice").forEach((label) => {
      const input = label.querySelector("input");
      label.classList.toggle("selected", input.checked);
    });
  }

  function renderInstructions() {
    const labels = t().likert;
    instructionsBody.innerHTML = t().instructionsBody.map((paragraph) => `<p>${paragraph}</p>`).join("");
    scaleRows.innerHTML = Object.entries(labels).map(([score, meaning]) => `
      <tr>
        <td>${score}</td>
        <td>${meaning}</td>
      </tr>
    `).join("");
  }

  function applyLanguage() {
    document.documentElement.lang = state.language;
    document.title = t().pageTitle;
    appTitle.textContent = t().appTitle;
    languageSelect.previousElementSibling.textContent = t().language;
    participantId.previousElementSibling.textContent = t().participantId;
    participantId.placeholder = t().participantPlaceholder;
    instructionsKicker.textContent = t().instructionsKicker;
    instructionsTitle.textContent = t().instructionsTitle;
    scaleRatingHead.textContent = t().scaleRating;
    scaleMeaningHead.textContent = t().scaleMeaning;
    dimensionHead.textContent = t().dimensionHead;
    const labels = t().likert;
    Object.entries(labels).forEach(([score, label]) => {
      document.querySelector(`[data-label="${score}"]`).textContent = label;
    });
    notesLabel.textContent = t().notes;
    notes.placeholder = t().notesPlaceholder;
    backButton.textContent = t().back;
    consentKicker.textContent = t().consentKicker;
    consentTitle.textContent = t().consentTitle;
    consentButton.textContent = t().consentContinue;
    demographicsKicker.textContent = t().demographicsKicker;
    demographicsTitle.textContent = t().demographicsTitle;
    $("ageLabel").textContent = t().age;
    $("genderLabel").textContent = t().gender;
    $("nativeLanguageLabel").textContent = t().nativeLanguage;
    $("educationLabel").textContent = t().education;
    $("handednessLabel").textContent = t().handedness;
    $("familiarityLabel").textContent = t().gestureCultureFamiliarity;
    startButton.textContent = t().start;
    updateSelectOptions(genderInput, t().options.gender);
    updateSelectOptions(educationInput, t().options.education);
    updateSelectOptions(handednessInput, t().options.handedness);
    updateSelectOptions(familiarityInput, t().options.familiarity);
    saveStatus.textContent = config.submitUrl ? t().autoSubmitted : t().chooseAll;
    renderConsent();
    renderFlowState();
    renderInstructions();
    renderRows();
    renderVideo();
  }

  function renderRows() {
    const item = currentItem();
    const saved = item ? state.responses[responseKey(item)] : null;
    const ratings = saved?.ratings || {};
    ratingRows.innerHTML = "";

    t().dimensions.forEach(([key, question]) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="dimension-cell">
          <span class="question">${question}</span>
        </td>
        ${[1, 2, 3, 4, 5].map((score) => `
          <td class="choice-cell">
            <label class="choice" aria-label="${question}: ${score}" data-score="${score}" data-scale-label="${t().likert[score]}">
              <input type="radio" name="${key}" value="${score}" ${ratings[key] === score ? "checked" : ""}>
              <span class="choice-text" aria-hidden="true">
                <span class="choice-score">${score}</span>
                <span class="choice-label">${t().likert[score]}</span>
              </span>
              <span class="choice-mark"></span>
            </label>
          </td>
        `).join("")}
      `;
      ratingRows.appendChild(row);
    });
    setSelectedStyles();
  }

  function renderVideo() {
    const item = currentItem();
    if (!item) {
      targetWord.textContent = "Complete";
      videoTitle.textContent = "";
      stimulusWord.textContent = "";
      videoPlayer.removeAttribute("src");
      videoPlayer.load();
      progressText.textContent = format(t().progress, { current: state.videos.length, total: state.videos.length });
      blockSummary.textContent = state.assignmentId
        ? format(t().assignmentSummary, { count: state.videos.length })
        : format(t().blockSummary, { block: state.block, start: state.blockStart + 1, end: state.blockEnd, total: state.totalVideos });
      progressBar.style.width = "100%";
      saveStatus.textContent = t().complete;
      nextButton.disabled = true;
      backButton.disabled = state.videos.length === 0;
      return;
    }

    targetWord.textContent = displayTargetWord(item);
    stimulusWord.textContent = displayTargetWord(item);
    videoTitle.textContent = item.title;
    progressText.textContent = format(t().progress, { current: state.index + 1, total: state.videos.length });
    blockSummary.textContent = state.assignmentId
      ? format(t().assignmentSummary, { count: state.videos.length })
      : format(t().blockSummary, { block: state.block, start: state.blockStart + 1, end: state.blockEnd, total: state.totalVideos });
    progressBar.style.width = `${Math.round((state.index / Math.max(state.videos.length, 1)) * 100)}%`;
    backButton.disabled = state.index === 0;
    nextButton.disabled = false;
    nextButton.textContent = state.index >= state.videos.length - 1 ? t().finish : t().saveContinue;

    const saved = state.responses[responseKey(item)];
    notes.value = saved?.notes || "";
    videoPlayer.src = videoUrl(item);
    videoPlayer.load();
    updateRatingLock();
  }

  function scrollToCurrentVideo() {
    requestAnimationFrame(() => {
      const top = Math.max(0, window.scrollY + videoPlayer.getBoundingClientRect().top - 12);
      window.scrollTo({ top, behavior: "smooth" });
    });
  }

  function selectedRatings() {
    const ratings = {};
    for (const [key] of t().dimensions) {
      const selected = ratingForm.querySelector(`input[name="${key}"]:checked`);
      if (!selected) return null;
      ratings[key] = Number(selected.value);
    }
    return ratings;
  }

  function saveCurrent() {
    const item = currentItem();
    if (!item) return true;
    if (!canRateCurrent()) {
      saveStatus.textContent = t().watchVideoFirst;
      saveStatus.classList.add("warning");
      return false;
    }
    const ratings = selectedRatings();
    if (!ratings) {
      saveStatus.textContent = t().completeAll;
      saveStatus.classList.add("warning");
      return false;
    }
    saveStatus.classList.remove("warning");
    const response = {
      participant_id: participantId.value.trim(),
      session_id: state.sessionId,
      assignment_id: state.assignmentId,
      language: state.language,
      collection: item.collection || "",
      source: item.source || "",
      title: item.title,
      target_word: displayTargetWord(item),
      target_word_source: item.target_word || item.title,
      video_url: videoUrl(item),
      order_index: Number.isFinite(Number(item.order_index)) ? Number(item.order_index) : state.index,
      ratings,
      notes: notes.value.trim(),
      saved_at: new Date().toISOString(),
    };
    state.responses[responseKey(item)] = response;
    localStorage.setItem(storageKey(), JSON.stringify({ index: state.index, responses: state.responses }));
    submitResponseInBackground(response);
    return true;
  }

  function loadSaved() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey()) || "null");
      if (!saved) return;
      state.index = Math.min(saved.index || 0, Math.max(state.videos.length - 1, 0));
      state.responses = saved.responses || {};
    } catch {
      localStorage.removeItem(storageKey());
    }
  }

  function payloadFor(responses) {
    return {
      participant: {
        participantId: participantId.value.trim(),
        sessionId: state.sessionId,
        assignmentId: state.assignmentId,
        language: state.language,
        block: state.block,
        consent: state.consent,
        demographics: state.demographics,
      },
      session_started_at: new Date().toISOString(),
      exported_at: new Date().toISOString(),
      block: state.block,
      responses,
    };
  }

  async function postResponses(responses) {
    const response = await fetch(config.submitUrl, {
      method: "POST",
      mode: config.submitMode,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payloadFor(responses)),
    });
    if (config.submitMode !== "no-cors" && !response.ok) throw new Error(`HTTP ${response.status}`);
  }

  function submitResponseInBackground(response) {
    if (!config.submitUrl || !config.submitEachResponse) return;
    postResponses([response]).catch((error) => {
      saveStatus.textContent = format(t().savedLocalFailed, { message: error.message });
      saveStatus.classList.add("warning");
    });
  }

  async function postDemographics() {
    if (!config.participantUrl) return;
    await fetch(config.participantUrl, {
      method: "POST",
      mode: config.submitMode,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        participant: {
          participantId: participantId.value.trim(),
          sessionId: state.sessionId,
          assignmentId: state.assignmentId,
          language: state.language,
          consent: state.consent,
          demographics: state.demographics,
        },
      }),
    });
  }

  ratingForm.addEventListener("change", () => {
    if (!canRateCurrent()) {
      saveStatus.textContent = t().watchVideoFirst;
      saveStatus.classList.add("warning");
      return;
    }
    saveStatus.classList.remove("warning");
    saveStatus.textContent = config.submitUrl ? t().autoSubmitted : t().chooseAll;
    setSelectedStyles();
  });

  ratingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!saveCurrent()) return;
    if (state.index >= state.videos.length - 1) {
      state.index = state.videos.length;
      renderVideo();
      return;
    }
    state.index += 1;
    renderRows();
    renderVideo();
    scrollToCurrentVideo();
  });

  backButton.addEventListener("click", () => {
    if (canRateCurrent()) saveCurrent();
    state.index = Math.max(0, state.index - 1);
    renderRows();
    renderVideo();
    scrollToCurrentVideo();
  });

  videoPlayer.addEventListener("ended", markCurrentVideoWatched);

  videoPlayer.addEventListener("timeupdate", () => {
    if (!Number.isFinite(videoPlayer.duration) || videoPlayer.duration <= 0) return;
    if (videoPlayer.currentTime >= videoPlayer.duration * 0.5) {
      markCurrentVideoWatched();
    }
  });

  languageSelect.addEventListener("change", () => {
    state.language = languageSelect.value;
    syncUrl({ lang: state.language });
    applyLanguage();
  });

  participantId.addEventListener("change", () => {
    loadSaved();
    renderRows();
    renderVideo();
  });

  consentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveConsent();
    if (!state.consentComplete) return;
    consentStatus.textContent = t().consentSaved;
    renderFlowState();
    requestAnimationFrame(() => demographicsPanel.scrollIntoView({ behavior: "smooth", block: "start" }));
  });

  demographicsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveDemographics();
    demographicsStatus.textContent = t().demographicsSaved;
    renderFlowState();
    postDemographics().catch(() => {});
  });

  async function init() {
    languageSelect.value = state.language;
    state.sessionId = sessionId();
    const params = query();
    const manifestUrl = params.get("manifest") || config.manifestUrl;
    const blockSize = Math.max(1, Number(params.get("block_size") || config.blockSize));
    const useAdaptiveAssignment = config.assignmentUrl && params.get("assignment") !== "static" && !params.get("block");

    if (useAdaptiveAssignment) {
      let assignment = loadStoredAssignment(blockSize);
      if (!assignment) {
        const assignmentUrl = new URL(config.assignmentUrl, window.location.href);
        assignmentUrl.searchParams.set("lang", state.language);
        assignmentUrl.searchParams.set("count", String(blockSize));
        assignmentUrl.searchParams.set("target_quota", String(config.targetQuota));
        assignmentUrl.searchParams.set("session_id", state.sessionId);
        if (participantId.value.trim()) assignmentUrl.searchParams.set("participant_id", participantId.value.trim());

        const assignmentResponse = await fetch(assignmentUrl.toString());
        if (!assignmentResponse.ok) throw new Error("Could not load adaptive assignment");
        assignment = await assignmentResponse.json();
        if (!assignment.ok) throw new Error(assignment.error || "Could not load adaptive assignment");
        storeAssignment(blockSize, assignment);
      }

      state.assignmentId = assignment.assignment_id || "";
      state.sessionId = assignment.session_id || state.sessionId;
      state.videos = assignment.videos || [];
      state.totalVideos = assignment.total_videos || state.videos.length;
      state.block = 0;
      state.blockStart = 0;
      state.blockEnd = state.videos.length;

      if (!state.videos.length) {
        throw new Error("Adaptive assignment returned no videos.");
      }

      syncUrl({
        lang: state.language,
        block: null,
        block_size: String(blockSize),
        manifest: null,
      });
    } else {
      const response = await fetch(manifestUrl);
      if (!response.ok) throw new Error("Could not load video manifest");
      const videos = await response.json();
      state.totalVideos = videos.length;
      state.block = Math.max(1, Number(params.get("block") || 1));
      state.blockStart = (state.block - 1) * blockSize;
      state.blockEnd = Math.min(state.blockStart + blockSize, state.totalVideos);
      state.videos = videos.slice(state.blockStart, state.blockEnd);
      if (!state.videos.length) {
        throw new Error(`Block ${state.block} has no videos. This manifest has ${Math.ceil(state.totalVideos / blockSize)} blocks.`);
      }
      syncUrl({
        lang: state.language,
        block: String(state.block),
        block_size: String(blockSize),
        manifest: manifestUrl === config.manifestUrl ? null : manifestUrl,
      });
    }
    loadConsent();
    loadDemographics();
    loadSaved();
    applyLanguage();
  }

  init().catch((error) => {
    targetWord.textContent = "Could not load videos";
    videoTitle.textContent = error.message;
  });
})();
