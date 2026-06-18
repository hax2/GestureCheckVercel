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
      consentTitle: "Information Sheet for Participation in the Study",
      consentIntro: "Please read this information carefully before deciding whether to participate.",
      consentSections: [
        {
          title: "",
          body: [
            "Dear Sir/Madam,",
            "We would like to inform you that we are conducting a study entitled \"Normative Data on Gestures,\" organized by Linz University. We invite you to participate in this study, which is being conducted under the responsibility of Dr. Manuela Macedonia. Before deciding whether to participate, please read this document carefully.",
          ],
        },
        {
          title: "Are you required to participate in the study?",
          body: [
            "Participation is entirely voluntary. Furthermore, if at any time you change your mind and wish to withdraw from the study, you are free to do so.",
          ],
        },
        {
          title: "Background and Purpose of the Study",
          body: [
            "Purpose: The main objective of this project is to collect evaluations of gestures that may be used in cognitive tasks.",
            "Study Design: You will be asked to evaluate approximately 20 gestures on several dimensions, such as how recognizable, dynamic, and emotionally expressive they are.",
            "Expected Duration: Participation in the study is expected to take approximately 10-15 minutes.",
            "Number of Participants: Approximately 150 participants will take part in the study.",
          ],
        },
        {
          title: "What Will Happen If You Decide to Participate?",
          body: ["The procedure includes:"],
          steps: [
            "Initial information and digital consent.",
            "Completion of a brief anonymous questionnaire containing demographic information (age, gender, etc.).",
            "Task: You will be shown several gestures and asked to rate each one on a scale from 1 to 5 across several dimensions that will be explained beforehand. There are no right or wrong answers. Please respond according to your personal judgment.",
          ],
        },
        {
          title: "What Are the Possible Benefits of Participating?",
          body: [
            "There are no direct benefits associated with participation in this study.",
          ],
        },
        {
          title: "What Are the Possible Risks or Side Effects?",
          body: [
            "This research presents no risk to the participant's physical or psychological well-being.",
          ],
        },
        {
          title: "Other Important Information",
          body: [
            "The study will be conducted in accordance with internationally recognized Good Clinical Practice (GCP) guidelines and with the ethical principles established in the Declaration of Helsinki (1964) and its subsequent revisions.",
          ],
        },
        {
          title: "Participation in the Study",
          body: [
            "Your participation is entirely voluntary.",
            "If you agree to participate, you will be asked to provide digital consent before beginning the study procedures.",
            "Providing consent serves only to confirm that you have received complete information and have freely agreed to participate. Your consent does not commit you to continue in the study, does not constitute a contractual obligation, and does not involve the waiver of any rights.",
            "If you initially agree to participate but later decide to withdraw, you may discontinue your participation at any time by notifying the Principal Investigator without providing any justification. Choosing not to participate or withdrawing after initially consenting will not result in any negative consequences or penalties in your relationship with the study staff.",
            "Should new information or findings arise that could influence your participation, you will be informed promptly. Furthermore, the Principal Investigator may withdraw you from the study if it is considered to be in your best interest.",
            "Participation in the study involves no costs or financial burden for you.",
            "Please note that participation in this study is not intended to provide clinical care or any personal diagnostic benefit.",
          ],
        },
        {
          title: "Processing of Personal Data",
          body: [
            "The researcher will ask you to provide certain personal data, such as age, gender, and possibly other information. These data are necessary for the proper conduct of the study.",
            "All personal data collected during the study will be processed in full compliance with Regulation (EU) 2016/679 (General Data Protection Regulation - GDPR) and the applicable provisions of Italian Legislative Decree No. 196/2003 concerning personal data protection.",
            "The Data Controller for your personal data will remain the Catholic University of the Sacred Heart of Milan (Università Cattolica del Sacro Cuore di Milano).",
          ],
        },
        {
          title: "Nature of the Data and Processing Methods",
          body: [
            "All personal information collected during this study is confidential and will be processed in accordance with the applicable regulations mentioned above.",
            "The data you provide will be made non-identifiable; that is, the collected material will be anonymized and cannot be linked back to the identity of the participant. This material will be analyzed and used solely for scientific research purposes by personnel authorized to conduct the study.",
            "The data, including data processed electronically, may be presented in strictly anonymous form at meetings, conferences, and in scientific publications. In any case, your name or any identifying details will never be disclosed, as the data will be presented only in aggregate form or in a manner that does not permit identification of individual participants.",
            "The processing of data does not involve automated decision-making or profiling.",
            "Appropriate security measures will be implemented to ensure the protection, security, integrity, and accessibility of personal data.",
            "Personal data will be retained only for as long as necessary to achieve the purposes for which they were collected, or for any other legitimate related purpose, and in any event for a minimum period of five years.",
            "Personal data that are no longer necessary or for which there is no longer a legal basis for retention will be irreversibly anonymized or securely destroyed.",
          ],
        },
        {
          title: "Exercise of Your Rights",
          body: [
            "The GDPR (EU Regulation 2016/679) strengthens the protection and processing of personal data according to the principles of fairness, lawfulness, transparency, confidentiality, and protection of data subject rights.",
            "You may exercise the rights provided under applicable legislation, including the right to:",
          ],
          steps: [
            "Access your personal data,",
            "Request correction, updating, or completion of your data,",
            "Request deletion,",
            "Request restriction of processing,",
            "Request data portability,",
            "Object to data processing.",
          ],
        },
        {
          title: "Withdrawal",
          body: [
            "These rights may be exercised by contacting the Data Controller directly or through authorized personnel.",
            "If you withdraw, no further data about you will be collected. Data already collected may still be used in the analysis where necessary.",
            "We thank you for your availability and cooperation.",
          ],
        },
        {
          title: "Informed Consent Form for Participation in the Study and Data Processing",
          body: [
            "Study Title: Normative Data on Gestures",
            "I, the undersigned, declare the following:",
            "Pursuant to Legislative Decree No. 196/2003 and GDPR (EU Regulation 2016/679), having received the information regarding the processing of personal data and understanding the purposes and methods described therein, I freely express my consent to the processing of personal data.",
            "Pursuant to Legislative Decree No. 196/2003 and GDPR (EU Regulation 2016/679), having received the information regarding the processing of sensitive health-related data and understanding the purposes and methods described therein, I freely express my consent to the processing of sensitive health-related data.",
          ],
          steps: [
            "I have read and understood the information sheet of which this form is an integral part.",
            "I have been informed about the nature, purpose, and duration of the study, the procedures to be followed, the treatment of participants, and the type of cooperation required.",
            "I understand that participation in the study is voluntary and that I may withdraw myself from the study at any time without any negative consequences and without affecting my rights or my relationship with the personnel involved.",
            "Having considered the above information, I agree to participate in the study described in this document.",
          ],
        },
      ],
      consentStatements: {
        adult: "I am 18 or older.",
        read: "I have read and understood the information sheet above.",
        voluntary: "I understand participation is voluntary and I can stop at any time.",
        research_use: "I consent to participation in the study and to the processing of my data as described.",
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
      notesPlaceholder: "Anything unclear about this gesture? Do not include names, contact details, or private information.",
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
      consentTitle: "Information zur Studienteilnahme",
      consentIntro: "Bitte lesen Sie diese Informationen sorgfältig, bevor Sie entscheiden, ob Sie teilnehmen möchten.",
      consentSections: [
        {
          title: "",
          body: [
            "Sehr geehrte Dame, sehr geehrter Herr,",
            "wir möchten Sie darüber informieren, dass wir eine Studie mit dem Titel \"Normative Daten zu Gesten\" durchführen, die von der Universität Linz organisiert wird. Aus diesem Grund möchten wir Sie zur Teilnahme an dieser Studie einladen, die unter der Verantwortung von Dr. Manuela Macedonia durchgeführt wird. Bevor Sie entscheiden, ob Sie teilnehmen oder nicht, bitten wir Sie, dieses Dokument sorgfältig zu lesen.",
          ],
        },
        {
          title: "Sind Sie verpflichtet, an der Studie teilzunehmen?",
          body: [
            "Die Teilnahme ist vollkommen freiwillig. Sollten Sie Ihre Meinung zu irgendeinem Zeitpunkt ändern und die Teilnahme abbrechen wollen, steht es Ihnen frei, dies jederzeit zu tun.",
          ],
        },
        {
          title: "Hintergrund und Ziel der Studie",
          body: [
            "Ziel: Das Hauptziel des Projekts besteht darin, Bewertungen von Gesten zu sammeln, die in kognitiven Aufgaben eingesetzt werden können.",
            "Studiendesign: Sie werden gebeten, etwa 20 Gesten anhand verschiedener Merkmale zu bewerten, beispielsweise hinsichtlich ihrer Erkennbarkeit, Dynamik und emotionalen Ausdruckskraft.",
            "Voraussichtliche Dauer: Die Teilnahme dauert etwa 10-15 Minuten.",
            "Anzahl der Teilnehmenden: Etwa 150 Personen werden an der Studie teilnehmen.",
          ],
        },
        {
          title: "Was passiert, wenn Sie an der Studie teilnehmen?",
          body: ["Die Studie umfasst folgende Schritte:"],
          steps: [
            "Einführung und digitale Einwilligung",
            "Ausfüllen eines kurzen anonymen Fragebogens mit einigen demografischen Angaben (Alter, Geschlecht usw.)",
            "Aufgabe: Ihnen werden verschiedene Gesten gezeigt. Für jede Geste vergeben Sie auf einer Skala von 0 bis 5 Bewertungen für mehrere Merkmale, die zuvor erläutert werden. Es gibt keine richtigen oder falschen Antworten. Bitte antworten Sie entsprechend Ihrer individuellen persönlichen Einschätzung.",
          ],
        },
        {
          title: "Welche Vorteile bringt die Teilnahme?",
          body: [
            "Es gibt keinen direkten persönlichen Nutzen durch die Teilnahme an dieser Studie.",
          ],
        },
        {
          title: "Welche Risiken oder Nebenwirkungen bestehen?",
          body: [
            "Die Forschung birgt keine Risiken für die körperliche oder psychische Unversehrtheit der Teilnehmenden.",
          ],
        },
        {
          title: "Weitere wichtige Informationen",
          body: [
            "Die Studie wird gemäß den international anerkannten Grundsätzen der Guten Klinischen Praxis (Good Clinical Practice) sowie unter Beachtung der ethischen Prinzipien der Deklaration von Helsinki (1964) und ihrer späteren Überarbeitungen durchgeführt.",
          ],
        },
        {
          title: "Teilnahme an der Studie",
          body: [
            "Ihre Teilnahme ist vollständig freiwillig.",
            "Wenn Sie teilnehmen möchten, werden Sie gebeten, vor Beginn der Studie das diesem Dokument beigefügte Formular zur informierten Einwilligung und zur Datenverarbeitung zu unterzeichnen.",
            "Mit Ihrer Unterschrift bestätigen Sie lediglich, dass Sie umfassend informiert wurden und freiwillig an der Studie teilnehmen möchten. Die Unterschrift verpflichtet Sie nicht zur Fortsetzung der Studie, stellt keinen Vertrag dar und bedeutet keinen Verzicht auf Ihre Rechte.",
            "Sollten Sie sich nach einer anfänglichen Zustimmung dazu entscheiden, die Studie zu verlassen, können Sie Ihre Teilnahme jederzeit ohne Angabe von Gründen beenden, indem Sie die Studienleitung informieren. Die Entscheidung, nicht teilzunehmen oder die Teilnahme abzubrechen, hat keinerlei negative Konsequenzen und führt zu keinerlei Benachteiligung im Verhältnis zu den betreuenden Personen.",
            "Sollten neue Informationen oder Ergebnisse bekannt werden, die Ihre Teilnahme beeinflussen könnten, werden Sie unverzüglich informiert. Die Studienleitung kann Ihre Teilnahme außerdem beenden, wenn dies in Ihrem besten Interesse erscheint.",
            "Die Teilnahme verursacht für Sie keine Kosten oder sonstigen finanziellen Belastungen.",
            "Wir weisen darauf hin, dass die Teilnahme an dieser Studie nicht der klinischen Versorgung dient und keinen diagnostischen oder persönlichen medizinischen Nutzen bietet.",
          ],
        },
        {
          title: "Verarbeitung personenbezogener Daten",
          body: [
            "Der Forschende wird einige personenbezogene Daten von Ihnen erheben, beispielsweise Geschlecht, Geburtsdatum und gegebenenfalls weitere Angaben. Diese Informationen sind für die ordnungsgemäße Durchführung der Studie erforderlich.",
            "Alle im Rahmen dieser Studie erhobenen personenbezogenen Daten werden unter vollständiger Einhaltung der Vorschriften der Datenschutz-Grundverordnung (EU) 2016/679 (DSGVO) sowie des italienischen Datenschutzgesetzes (D.lgs. Nr. 196/2003) verarbeitet.",
            "Verantwortliche Stelle für die Verarbeitung Ihrer personenbezogenen Daten ist die Katholische Universität vom Heiligen Herzen in Mailand (Università Cattolica del Sacro Cuore di Milano).",
          ],
        },
        {
          title: "Art der Daten und Verarbeitung",
          body: [
            "Alle personenbezogenen Informationen, die im Rahmen dieser Studie erhoben werden, sind vertraulich und werden gemäß den geltenden Datenschutzbestimmungen verarbeitet.",
            "Die von Ihnen bereitgestellten Daten werden anonymisiert, sodass die erhobenen Informationen nicht mehr Ihrer Identität zugeordnet werden können. Das Material wird ausschließlich von den mit der Studie betrauten Mitarbeitenden zu wissenschaftlichen Forschungszwecken ausgewertet.",
            "Die Daten können mithilfe elektronischer Systeme verarbeitet und in streng anonymisierter Form bei Tagungen, Konferenzen oder in wissenschaftlichen Veröffentlichungen präsentiert werden. Ihr Name oder andere Angaben, die Ihre Identifizierung ermöglichen würden, werden niemals veröffentlicht.",
            "Die Datenverarbeitung umfasst keine automatisierten Entscheidungsverfahren oder Profiling.",
            "Geeignete Sicherheitsmaßnahmen gewährleisten Schutz, Sicherheit, Integrität und Zugänglichkeit der personenbezogenen Daten.",
            "Die personenbezogenen Daten werden nur so lange gespeichert, wie es für die Erreichung der Forschungsziele erforderlich ist, mindestens jedoch fünf Jahre.",
            "Nicht mehr benötigte Daten werden dauerhaft anonymisiert oder sicher vernichtet.",
          ],
        },
        {
          title: "Ihre Rechte",
          body: [
            "Die DSGVO stärkt den Schutz personenbezogener Daten auf Grundlage der Prinzipien von Rechtmäßigkeit, Fairness, Transparenz und Datenschutz.",
            "Sie haben das Recht:",
          ],
          steps: [
            "Auskunft über Ihre Daten zu erhalten,",
            "deren Ergänzung, Aktualisierung oder Berichtigung zu verlangen,",
            "die Löschung zu beantragen,",
            "die Verarbeitung einzuschränken,",
            "Datenübertragbarkeit zu verlangen,",
            "der Verarbeitung zu widersprechen.",
          ],
        },
        {
          title: "Beendigung der Teilnahme",
          body: [
            "Hierzu können Sie sich direkt an die verantwortliche Stelle oder deren beauftragte Mitarbeitende wenden.",
            "Wenn Sie Ihre Teilnahme an der Studie beenden, werden keine weiteren Daten über Sie erhoben. Bereits erhobene Daten dürfen jedoch weiterhin verwendet werden, soweit dies erforderlich ist, um die Ergebnisse der Studie unverändert auszuwerten.",
            "Wir danken Ihnen für Ihre Bereitschaft und Ihre Mitarbeit.",
          ],
        },
        {
          title: "Formular zur informierten Einwilligung für die Teilnahme an der Studie und zur Datenverarbeitung",
          body: [
            "Titel der Studie: \"Normative Daten zu Gesten\"",
            "Ich, die unterzeichnende Person, erkläre Folgendes:",
            "Gemäß dem Gesetzesdekret Nr. 196/2003 und der DSGVO (EU 2016/679) habe ich die Informationen zur Verarbeitung personenbezogener Daten erhalten und erkläre meine freiwillige Zustimmung zur Verarbeitung personenbezogener Daten.",
            "Gemäß dem Gesetzesdekret Nr. 196/2003 und der DSGVO (EU 2016/679) habe ich die Informationen zur Verarbeitung sensibler Gesundheitsdaten erhalten und erkläre meine freiwillige Zustimmung zur Verarbeitung sensibler Gesundheitsdaten.",
          ],
          steps: [
            "Ich habe das Informationsblatt, dessen Bestandteil dieses Formular ist, gelesen und verstanden.",
            "Mir wurden Art, Zweck und Dauer der Studie, die vorgesehenen Verfahren, die Behandlung der Teilnehmenden sowie die erwartete Mitwirkung erläutert.",
            "Ich habe verstanden, dass die Teilnahme freiwillig ist und dass ich jederzeit ohne negative Folgen und ohne Beeinträchtigung meiner Rechte oder meines Verhältnisses zu den beteiligten Personen von der Studie zurücktreten kann.",
            "Nach Kenntnisnahme dieser Informationen erkläre ich mich bereit, an der in diesem Dokument beschriebenen Studie teilzunehmen.",
          ],
        },
      ],
      consentStatements: {
        adult: "Ich bin mindestens 18 Jahre alt.",
        read: "Ich habe das Informationsblatt gelesen und verstanden.",
        voluntary: "Ich habe verstanden, dass die Teilnahme freiwillig ist und dass ich jederzeit ohne negative Folgen zurücktreten kann.",
        research_use: "Ich stimme der Teilnahme an der Studie und der Verarbeitung meiner Daten wie beschrieben zu.",
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
      notesPlaceholder: "War etwas an dieser Geste unklar? Bitte keine Namen, Kontaktdaten oder privaten Informationen eingeben.",
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
      consentSections: [
        {
          title: "Panoramica dello studio",
          body: [
            "Le proponiamo di partecipare allo studio \"Dati normativi sui gesti\", organizzato dall'Università di Linz e condotto sotto la responsabilità della Dott.ssa Manuela Macedonia.",
            "L'obiettivo è raccogliere valutazioni su gesti che potranno essere utilizzati in compiti cognitivi. Le verrà chiesto di valutare circa 20 video di gesti su dimensioni come riconoscibilità, dinamismo ed espressività emotiva.",
          ],
        },
        {
          title: "Cosa prevede la partecipazione",
          body: ["Lo studio dura circa 10-15 minuti e prevede questi passaggi:"],
          steps: [
            "Leggere queste informazioni e fornire il consenso digitale.",
            "Compilare una breve scheda demografica anonima, per esempio età e genere.",
            "Guardare i video dei gesti e valutare ciascuno sulle scale mostrate nel compito. Non esistono risposte giuste o sbagliate.",
          ],
        },
        {
          title: "Partecipazione volontaria",
          body: [
            "La partecipazione è completamente libera e volontaria. Può decidere di non partecipare o interrompere in qualsiasi momento, senza fornire una motivazione e senza conseguenze negative.",
            "Non sono previsti benefici personali diretti. Lo studio non è finalizzato a fornire assistenza clinica né un beneficio diagnostico personale.",
          ],
        },
        {
          title: "Rischi e svolgimento dello studio",
          body: [
            "La ricerca non presenta rischi per l'integrità fisica o psicologica del partecipante. Lo studio sarà condotto secondo le norme di Buona Pratica Clinica e i principi etici della Dichiarazione di Helsinki.",
            "Qualora emergessero nuove informazioni che possano influenzare la partecipazione, ne sarà informato/a. Il Responsabile dello studio potrà inoltre ritirarla dallo studio se lo riterrà nel suo migliore interesse.",
          ],
        },
        {
          title: "Protezione dei dati",
          body: [
            "Il ricercatore raccoglierà alcune informazioni di base necessarie allo svolgimento dello studio. I dati saranno trattati secondo il Regolamento (UE) 2016/679 (GDPR) e la normativa applicabile in materia di protezione dei dati personali.",
            "I dati forniti saranno resi anonimi e utilizzati esclusivamente per finalità di ricerca scientifica da personale autorizzato. I risultati potranno essere condivisi in riunioni, convegni e pubblicazioni scientifiche solo in forma anonima o aggregata.",
            "I dati non saranno usati per processi decisionali automatizzati o profilazione. Saranno adottate misure di sicurezza adeguate e i dati saranno conservati solo per il tempo necessario alle finalità dello studio, comunque per un periodo minimo di 5 anni.",
          ],
        },
        {
          title: "I suoi diritti",
          body: [
            "Può rivolgersi al Titolare del trattamento, direttamente o tramite personale autorizzato, per esercitare i diritti di accesso, rettifica, cancellazione, limitazione, portabilità o opposizione previsti dalla normativa applicabile.",
            "Se decide di ritirarsi, non saranno raccolti ulteriori dati che la riguardano. I dati già acquisiti potranno comunque essere utilizzati per determinare i risultati dello studio senza alterarli.",
          ],
        },
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
      notesPlaceholder: "Qualcosa non era chiaro in questo gesto? Non inserire nomi, contatti o informazioni private.",
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
    ja: {
      appTitle: "ジェスチャー評価タスク",
      pageTitle: "ジェスチャー評価タスク",
      language: "言語",
      participantId: "参加者ID",
      participantPlaceholder: "任意",
      instructionsKicker: "説明",
      instructionsTitle: "ジェスチャー評価タスクの説明",
      instructionsBody: [
        "このタスクでは、一連のジェスチャー動画を視聴していただきます。",
        "動画ごとに、単語とジェスチャーが表示されます。",
        "各動画について、1から5の尺度を用いて以下の質問に回答してください。",
        "正解や不正解はありません。直感的な印象に基づいて回答してください。",
      ],
      scaleRating: "評価値",
      scaleMeaning: "意味",
      consentKicker: "インフォームド・コンセント",
      consentTitle: "研究への参加に関する情報説明書",
      consentIntro: "参加を決定する前に、この情報をよくお読みください。",
      consentSections: [
        {
          title: "",
          body: [
            "皆様へ",
            "リンツ大学が主催する「ジェスチャーに関する基準データ」と題する研究についてお知らせいたします。マヌエラ・マケドニア（Manuela Macedonia）博士の責任のもとで実施されるこの研究へのご参加をご案内いたします。参加するかどうかを決める前に、この文書をよくお読みください。",
          ],
        },
        {
          title: "研究への参加は必須ですか？",
          body: [
            "参加は完全に任意です。また、途中で気が変わり参加を辞退したくなった場合でも、いつでも自由に行うことができます。",
          ],
        },
        {
          title: "研究の背景と目的",
          body: [
            "目的: このプロジェクトの主な目的は、認知タスクで使用される可能性のあるジェスチャーの評価を収集することです。",
            "研究デザイン: 約20個のジェスチャーについて、認識しやすさ、躍動感（ダイナミックさ）、感情表現の豊かさなど、いくつかの側面から評価していただきます。",
            "所要時間: 研究への参加には、約10〜15分かかる見込みです。",
            "参加人数: 約150名がこの研究に参加する予定です。",
          ],
        },
        {
          title: "参加することを決めた場合、何が行われますか？",
          body: ["手順には以下の内容が含まれます。"],
          steps: [
            "初期情報とデジタルコンセント（同意書）。",
            "人口統計学的情報（年齢、性別など）を含む、簡単な匿名のアンケートへの回答。",
            "タスク: いくつかのジェスチャーが表示され、事前に説明されるいくつかの側面について、それぞれ1から5の尺度で評価していただきます。正解や不正解はありません。ご自身の判断に従って回答してください。",
          ],
        },
        {
          title: "参加することによる利益は何ですか？",
          body: [
            "この研究への参加による直接的な利益はありません。",
          ],
        },
        {
          title: "起こりうるリスクや副作用は何ですか？",
          body: [
            "この研究は、参加者の身体的または精神的健康に対するいかなるリスクも伴いません。",
          ],
        },
        {
          title: "その他の重要な情報",
          body: [
            "本研究は、国際的に認められた医薬品の臨床試験の実施の基準（GCP）ガイドライン、およびヘルシンキ宣言（1964年）とその後の改訂で確立された倫理原則に従って実施されます。",
          ],
        },
        {
          title: "研究への参加について",
          body: [
            "あなたの参加は完全に任意です。",
            "参加に同意される場合は、研究を開始する前にデジタル同意を提供していただく必要があります。",
            "同意を提供することは、あなたが完全な説明を受け、自発的に参加することに同意したことを確認するためのものです。あなたの同意は、研究の継続を義務付けるものではなく、契約上の義務を構成するものでもなく、いかなる権利の放棄も伴いません。",
            "最初に同意した場合でも、後に辞退することを決定した場合は、理由を開示することなく、責任研究者に通知することでいつでも参加を中止できます。参加しないことを選択したり、同意後に辞退したりしても、研究スタッフとの関係においていかなる不利益やペナルティも生じません。",
            "参加の意思決定に影響を与える可能性のある新しい情報や知見が得られた場合は、速やかに通知されます。さらに、責任研究者はあなたを研究から離脱させることがあります。",
            "研究への参加には、費用や金銭的な負担は一切かかりません。",
            "この研究への参加は、臨床治療や個人の診断上の利益を提供することを目的としたものではありませんのでご注意ください。",
          ],
        },
        {
          title: "個人データの処理",
          body: [
            "研究者は、年齢、性別、および必要に応じてその他の特定の個人データの提供をお願いします。これらのデータは、研究を適切に実施するために不可欠なものです。",
            "研究中に収集されたすべての個人データは、規則 (EU) 2016/679 (一般データ保護規則 - GDPR) および個人データ保護に関するイタリア立法令第196/2003号の適用規定に完全に準拠して処理されます。",
            "個人データのデータ管理者は、ミラノ・聖心カトリック大学（Università Cattolica del Sacro Cuore di Milano）のままとなります。",
          ],
        },
        {
          title: "データの性質と処理方法",
          body: [
            "この研究中に収集されたすべての個人情報は機密であり、上記の適用規則に従って処理されます。",
            "提供されたデータは識別不可能（匿名化）にされ、収集された資料が参加者の身元と結びつくことはありません。この資料は、研究の実施を許可された担当者によって、科学的研究目的のためだけに分析および使用されます。",
            "電子的に処理されるデータを含むデータは、学会、会議、および科学的出版物において、厳密に匿名化された形式で提示される場合があります。どのような場合でも、氏名や個人を特定できる詳細情報が開示されることはありません。データは集計された形式、または個人を特定できない方法でのみ提示されます。",
            "データの処理には、自動化された意思決定やプロファイリングは含まれません。",
            "個人データの保護、セキュリティ、完全性、およびアクセス可能性を確保するために、適切なセキュリティ対策が実施されます。",
            "個人データは、収集された目的を達成するために必要な期間、またはその他の合法的な関連目的のために必要な期間（いずれの場合も最低5年間）のみ保持されます。",
            "不要になった個人データ、または保持するための法的根拠がなくなった個人データは、不可逆的に匿名化されるか、安全に破棄されます。",
          ],
        },
        {
          title: "あなたの権利の行使",
          body: [
            "GDPR（EU規則 2016/679）は、公平性、適法性、透明性、機密性、およびデータ主体の権利保護の原則に従って、個人データの保護と処理を強化しています。",
            "あなたは、適用法の下で提供される以下のような権利を行使できます。",
          ],
          steps: [
            "個人データへのアクセス",
            "データの訂正、更新、または追加の要請",
            "データの消去の要請",
            "処理の制限の要請",
            "データポータビリティの要請",
            "データ処理に対する異議申し立て",
          ],
        },
        {
          title: "辞退について",
          body: [
            "これらの権利は、データ管理者に直接、または認可されたスタッフを通じて連絡することにより行使できます。",
            "参加を辞退した場合、それ以降あなたに関するデータが収集されることはありません。すでに収集されたデータについては、結果を歪めないために必要な範囲で引き続き分析に使用される場合があります。",
            "ご協力いただき誠にありがとうございます。",
          ],
        },
        {
          title: "研究への参加およびデータ処理に関するインフォームド・コンセント同意書",
          body: [
            "研究のタイトル: ジェスチャーに関する基準データ",
            "私（署名者）は以下を宣言します。",
            "立法令第196/2003号およびGDPR（EU規則 2016/679）に基づき、個人データの処理に関する情報を受け取り、そこに記載されている目的と方法を理解した上で、個人データの処理に自発的に同意します。",
            "立法令第196/2003号およびGDPR（EU規則 2016/679）に基づき、健康に関する要配慮個人データの処理に関する情報を受け取り、そこに記載されている目的と方法を理解した上で、健康に関する要配慮個人データの処理に自発的に同意します。",
          ],
          steps: [
            "私は、このフォームが不可欠な一部を構成する情報説明書を読み、理解しました。",
            "私は、研究の性質、目的、期間、従うべき手順、参加者の扱い、および求められる協力のタイプについて説明を受けました。",
            "私は、研究への参加が任意であり、いかなる不利益も被ることなく、また権利や関係者との関係に影響を与えることなく、いつでも研究から辞退できることを理解しています。",
            "上記の情報を考慮した上で、私はこの文書に記載されている研究に参加することに同意します。",
          ],
        },
      ],
      consentStatements: {
        adult: "私は18歳以上です。",
        read: "私は上記の情報を読み、理解しました。",
        voluntary: "私は参加が任意であり、いつでも中止できることを理解しています。",
        research_use: "私は研究への参加、および説明された通りに私のデータが処理されることに同意します。",
      },
      consentSaved: "同意が記録されました。",
      consentContinue: "続行",
      dimensionHead: "質問",
      chooseAll: "各行で評価を1つ選択してください。",
      completeAll: "続行する前に、6つの評価すべてを完了させてください。",
      watchVideoFirst: "評価する前に動画を視聴してください。",
      complete: "ブロック完了。評価はブラウザに保存されました。",
      autoSubmitted: "保存された回答は自動的に送信されます。",
      savedLocalFailed: "ローカルには保存されましたが、サーバーへの送信に失敗しました: {message}",
      demographicsKicker: "開始する前に",
      demographicsTitle: "参加者情報",
      demographicsSaved: "参加者情報が保存されました。",
      start: "開始",
      age: "年齢",
      gender: "性別",
      nativeLanguage: "母国語（母語）",
      education: "最終学歴",
      handedness: "利き手",
      gestureCultureFamiliarity: "ヨーロッパのジェスチャー文化に対する習熟度",
      options: {
        gender: {
          woman: "女性",
          man: "男性",
          non_binary: "ノンバイナリー",
          prefer_not_to_say: "回答しない",
          self_describe: "その他（自由記述）",
        },
        education: {
          secondary: "中等学校（高校など）",
          vocational: "職業訓練学校",
          bachelor: "学士",
          master: "修士",
          doctorate: "博士",
          other: "その他",
        },
        handedness: {
          right: "右利き",
          left: "左利き",
          both: "両利き",
        },
        familiarity: {
          none: "知らない / 全く馴染みがない",
          low: "少し知っている / 多少の馴染みがある",
          moderate: "ある程度知っている / 中程度の馴染みがある",
          high: "非常によく知っている / 強い馴染みがある",
        },
      },
      progress: "動画 {current} / {total}",
      blockSummary: "ブロック {block}: 動画 {start}〜{end} / 全体 {total}",
      assignmentSummary: "適応的割り当て: 全セットから {count} 本の動画が選ばれました。",
      saveContinue: "保存して次へ",
      finish: "終了",
      back: "戻る",
      notes: "メモ（任意）",
      notesPlaceholder: "このジェスチャーについて不明な点はありましたか？名前、連絡先、個人情報は入力しないでください。",
      likert: {
        1: "全く思わない",
        2: "少し思う",
        3: "ある程度思う",
        4: "とても思う",
        5: "極めて強く思う",
      },
      dimensions: [
        ["iconicity", "ジェスチャーはその単語の意味と視覚的にどの程度似ていますか？"],
        ["sensorimotor_imagery", "ジェスチャーは実際の動作や体験であるとどの程度感じられますか？"],
        ["motional_salience_gesture", "その動きはどの程度大きく、躍動感（ダイナミック）がありますか？"],
        ["emotional_salience_facial_expression", "顔の表情はどの程度の感情を伝えていますか？"],
        ["cultural_familiarity", "そのジェスチャーは、あなたの国においてどの程度馴染みがある、または一般的ですか？"],
        ["enactment_potential", "そのジェスチャーを自分で行うのはどの程度簡単ですか？"],
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
    language: ["en", "de", "it", "ja"].includes(new URLSearchParams(window.location.search).get("lang"))
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
    state.consent = {
      version: "2026-05-25",
      language: state.language,
      statements: {
        accepted: true,
      },
      consented_at: new Date().toISOString(),
    };
    state.consentComplete = true;
    localStorage.setItem(consentKey(), JSON.stringify({
      complete: state.consentComplete,
      consent: state.consent,
    }));
  }

  function renderConsent() {
    const renderParagraphs = (paragraphs) => paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
    const renderSteps = (steps = []) => steps.length
      ? `<ol class="consent-steps">${steps.map((step) => `<li>${step}</li>`).join("")}</ol>`
      : "";
    consentBody.innerHTML = `
      <p>${t().consentIntro}</p>
      <div class="consent-sections">
        ${t().consentSections.map((section) => `
          <section class="consent-section">
            ${section.title ? `<h3>${section.title}</h3>` : ""}
            ${renderParagraphs(section.body || [])}
            ${renderSteps(section.steps)}
          </section>
        `).join("")}
      </div>
    `;
    consentChecks.innerHTML = "";
  }

  function renderFlowState() {
    consentPanel.classList.toggle("hidden", state.consentComplete);
    demographicsPanel.classList.toggle("hidden", !state.consentComplete || state.demographicsComplete);
    workbench.classList.toggle("hidden", !state.consentComplete || !state.demographicsComplete);
  }

  function taskIsActive() {
    return state.consentComplete && state.demographicsComplete;
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
    if (!taskIsActive()) {
      targetWord.textContent = state.consentComplete ? t().demographicsTitle : t().consentTitle;
      videoTitle.textContent = "";
      stimulusWord.textContent = "";
      videoPlayer.removeAttribute("src");
      videoPlayer.load();
      return;
    }

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
    renderRows();
    renderVideo();
    requestAnimationFrame(() => demographicsPanel.scrollIntoView({ behavior: "smooth", block: "start" }));
  });

  demographicsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveDemographics();
    demographicsStatus.textContent = t().demographicsSaved;
    renderFlowState();
    renderRows();
    renderVideo();
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
