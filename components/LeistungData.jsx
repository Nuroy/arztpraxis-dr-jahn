// All 13 leistung detail data — keyed by URL slug
window.LEISTUNG_DATA = {
  "zahnerhaltung-prophylaxe": {
    parent: { label: "Prophylaxe & Zahnerhaltung", anchor: "prophylaxe" },
    title: "Zahnerhaltung / Prophylaxe",
    titleAccent: "Prophylaxe",
    eyebrow: "Vorsorge",
    lede: "Die professionelle Zahnreinigung ist die Basis Ihrer Zahngesundheit. Wir entfernen Beläge dort, wo die häusliche Pflege nicht hinkommt — sanft, gründlich und mit Zeit.",
    image: "assets/praxis-behandlung.jpg",
    meta: [
      { label: "Dauer", value: "45–60 Min." },
      { label: "Häufigkeit", value: "1–2× pro Jahr" },
      { label: "Kosten", value: "Privatleistung" },
      { label: "Schmerzfrei", value: "Ja" }
    ],
    intro: {
      title: "Vorsorge ist die beste Medizin",
      body: "Selbst bei sorgfältiger häuslicher Pflege bleiben in den Zahnzwischenräumen und unterhalb des Zahnfleischs Bereiche, die Sie zu Hause nicht erreichen können. Genau dort entsteht Karies und Parodontitis. Mit der professionellen Zahnreinigung (PZR) reinigen wir gezielt diese Stellen — und legen damit das Fundament für gesunde Zähne ein Leben lang.\n\nWir nehmen uns für jede Reinigung mindestens 45 Minuten Zeit. Keine Akkord-Behandlung, sondern eine ruhige, gründliche Sitzung mit anschließender Beratung."
    },
    inclusions: [
      { title: "Befundung der Mundhöhle", desc: "Ihr Mund wird auf Karies, Zahnfleischtaschen und Veränderungen untersucht." },
      { title: "Entfernung von Zahnstein", desc: "Mit Ultraschall und Handinstrumenten — auch unterhalb des Zahnfleischs." },
      { title: "Politur und Fluoridierung", desc: "Glatte Oberflächen halten Beläge länger fern; Fluorid härtet den Zahnschmelz." },
      { title: "Individuelle Pflegeberatung", desc: "Tipps zu Bürste, Zahnseide, Interdentalbürste — abgestimmt auf Ihre Situation." }
    ],
    process: [
      { num: "01", title: "Begrüßung & Anamnese", desc: "Wir besprechen Veränderungen seit dem letzten Termin und Ihre aktuellen Pflegegewohnheiten." },
      { num: "02", title: "Befund-Aufnahme", desc: "Inspektion aller Zähne, Messung von Zahnfleischtaschen, Sichtkontrolle der Mundschleimhaut." },
      { num: "03", title: "Reinigung", desc: "Schonende Entfernung von Belägen mit Ultraschall, Handinstrumenten und Pulverstrahl-Verfahren." },
      { num: "04", title: "Politur und Fluoridierung", desc: "Polierte Oberflächen, abschließendes Auftragen eines Fluoridlacks zum Schutz." },
      { num: "05", title: "Beratungsgespräch", desc: "Wir zeigen Ihnen, wo Sie zu Hause noch besser werden können — mit konkreten Empfehlungen." }
    ],
    faqs: [
      { q: "Wie oft sollte ich zur PZR kommen?", a: "Bei gesundem Zahnfleisch reicht 1× pro Jahr. Bei erhöhtem Karies- oder Parodontitis-Risiko empfehlen wir 2× pro Jahr." },
      { q: "Tut die Zahnreinigung weh?", a: "Nein. Die meisten Patient:innen empfinden die PZR als angenehm. Bei empfindlichen Zähnen können wir lokal betäuben." },
      { q: "Wird die PZR von der Krankenkasse übernommen?", a: "Die gesetzlichen Krankenkassen übernehmen die Kosten meist nicht. Viele Zusatzversicherungen erstatten 1–2 PZR pro Jahr." }
    ]
  },
  "parodontologie": {
    parent: { label: "Prophylaxe & Zahnerhaltung", anchor: "prophylaxe" },
    title: "Parodontologie",
    titleAccent: "gesundem Zahnfleisch",
    eyebrow: "Gegen Zahnfleischentzündung",
    lede: "Parodontitis ist die häufigste Ursache für Zahnverlust im Erwachsenenalter — und oft schmerzfrei. Wir behandeln sie in zwei Phasen: gründlich, gezielt und schonend.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80&auto=format&fit=crop",
    meta: [
      { label: "Dauer", value: "60–120 Min." },
      { label: "Sitzungen", value: "2–4 Termine" },
      { label: "Kosten", value: "Kassenleistung" },
      { label: "Erfolgsquote", value: "über 90 %" }
    ],
    intro: {
      title: "Wenn das Zahnfleisch leidet",
      body: "Blutendes Zahnfleisch ist kein Schönheitsfehler — es ist ein Warnsignal. Hinter Zahnfleischentzündungen steckt fast immer eine bakterielle Belastung in den Zahnfleischtaschen. Unbehandelt führt sie zum Knochenabbau und am Ende zum Zahnverlust.\n\nDie gute Nachricht: Parodontitis ist behandelbar. Mit moderner systematischer Therapie können wir den Krankheitsverlauf in den allermeisten Fällen stoppen."
    },
    inclusions: [
      { title: "Vortherapie und Hygienephase", desc: "Reinigung der Zähne und Anleitung zur perfekten häuslichen Pflege." },
      { title: "Geschlossene Reinigung der Zahnfleischtaschen", desc: "Entfernung der Bakterien aus den Taschen mit speziellen Instrumenten." },
      { title: "Antibiotische Therapie", desc: "Bei Bedarf zusätzliche lokale oder systemische Antibiose." },
      { title: "Erhaltungstherapie (UPT)", desc: "Regelmäßige Kontrollen und Reinigungen — der Schlüssel zum Langzeiterfolg." }
    ],
    process: [
      { num: "01", title: "Diagnostik", desc: "Messung aller Zahnfleischtaschen, Röntgenkontrolle, Bakteriendiagnostik wenn nötig." },
      { num: "02", title: "Vorbehandlung", desc: "Professionelle Reinigung und individuelle Pflegeanleitung — Voraussetzung für den Therapie-Erfolg." },
      { num: "03", title: "Geschlossene Therapie", desc: "Sanfte Reinigung der Taschen unter lokaler Betäubung — meist in 1–2 Sitzungen." },
      { num: "04", title: "Re-Evaluation", desc: "Kontrolle nach 8–12 Wochen: bei vereinzelten Resten gegebenenfalls chirurgische Nachsorge." },
      { num: "05", title: "Erhaltungstherapie", desc: "Lebenslange engmaschige Betreuung mit individuellem Recall — oft alle 3–6 Monate." }
    ],
    faqs: [
      { q: "Erkenne ich Parodontitis selbst?", a: "Häufige Anzeichen sind Zahnfleischbluten, Mundgeruch und ein 'längeres' Aussehen der Zähne. Sicher feststellen kann es nur die zahnärztliche Untersuchung." },
      { q: "Übernimmt die Krankenkasse die Behandlung?", a: "Ja, die systematische Parodontitis-Therapie ist seit 2021 vollständige Kassenleistung — inkl. Erhaltungstherapie." },
      { q: "Kann Parodontitis zurückkommen?", a: "Ohne konsequente Nachsorge: ja. Mit regelmäßiger UPT (alle 3–6 Monate) ist die Erfolgsquote über 90 %." }
    ]
  },
  "endodontologie": {
    parent: { label: "Prophylaxe & Zahnerhaltung", anchor: "prophylaxe" },
    title: "Endodontologie",
    titleAccent: "eigenen Zahn erhalten",
    eyebrow: "Wurzelbehandlung",
    lede: "Wurzelbehandlung hat einen schlechten Ruf — zu Unrecht. Mit modernen Verfahren ist sie heute fast immer schmerzarm und in den meisten Fällen erfolgreich.",
    image: "assets/praxis-behandlung-detail.jpg",
    meta: [
      { label: "Dauer", value: "60–90 Min." },
      { label: "Sitzungen", value: "1–2 Termine" },
      { label: "Schmerzarm", value: "Lokale Betäubung" },
      { label: "Erfolgsquote", value: "85–95 %" }
    ],
    intro: {
      title: "Den eigenen Zahn retten",
      body: "Eine Wurzelentzündung entsteht meist durch tiefe Karies oder Verletzungen. Das Innere des Zahns — Nerv und Blutgefäße — entzündet sich. Die einzige Alternative zur Wurzelbehandlung ist das Ziehen des Zahns.\n\nMit modernen, mikroskop-gestützten Verfahren erhalten wir den Zahn in den allermeisten Fällen. Sie behalten Ihren eigenen, fest verwurzelten Zahn — eine Leistung, die kein Zahnersatz vollständig ersetzen kann."
    },
    inclusions: [
      { title: "Diagnose mit moderner Bildgebung", desc: "Digitales Röntgen, gegebenenfalls 3D-DVT für komplexe Fälle." },
      { title: "Behandlung unter lokaler Betäubung", desc: "Sie spüren während der Behandlung nichts." },
      { title: "Maschinelle Wurzelkanal-Aufbereitung", desc: "Mit feinen Nickel-Titan-Instrumenten und Längenmessung." },
      { title: "Bakterienfreie Versiegelung", desc: "Dichte, gewebefreundliche Füllung der Wurzelkanäle." }
    ],
    process: [
      { num: "01", title: "Diagnose und Aufklärung", desc: "Wir prüfen, ob die Wurzelbehandlung sinnvoll ist und besprechen die Erfolgsaussichten." },
      { num: "02", title: "Lokale Betäubung", desc: "Vollständige Schmerzausschaltung — Sie spüren nur leichte Berührung." },
      { num: "03", title: "Eröffnung und Reinigung", desc: "Zugang zum Wurzelkanal-System, mechanische und chemische Reinigung." },
      { num: "04", title: "Wurzelfüllung", desc: "Bakteriendichte Versiegelung — meist in der gleichen oder einer Folge-Sitzung." },
      { num: "05", title: "Definitive Versorgung", desc: "Eine stabile Krone schützt den behandelten Zahn dauerhaft." }
    ],
    faqs: [
      { q: "Wie lange hält ein wurzelbehandelter Zahn?", a: "Bei korrekter Behandlung und stabiler Versorgung (meist Krone): viele Jahrzehnte. Es gibt Statistiken mit Erhaltungsraten von über 90 % nach 10 Jahren." },
      { q: "Tut die Wurzelbehandlung weh?", a: "Während der Behandlung nicht — durch lokale Betäubung. Eine leichte Empfindlichkeit am Tag danach ist normal." },
      { q: "Ist eine Wurzelbehandlung immer sinnvoll?", a: "In den meisten Fällen ja. Bei stark zerstörten Zähnen kann das Ziehen und ein Implantat aber die bessere Lösung sein. Wir beraten Sie ehrlich." }
    ]
  },
  "aesthetik-funktion": {
    parent: { label: "Ästhetik", anchor: "aesthetik" },
    title: "Ästhetik und Funktion",
    titleAccent: "Ihrem Lächeln",
    eyebrow: "Form trifft Funktion",
    lede: "Ein Lächeln, das zu Ihnen passt. Sanfte ästhetische Korrekturen — natürlich, individuell, präzise umgesetzt mit unseren Meisterlabor-Partnern.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80&auto=format&fit=crop",
    meta: [
      { label: "Dauer", value: "60–180 Min." },
      { label: "Sitzungen", value: "2–4 Termine" },
      { label: "Kosten", value: "Privatleistung" },
      { label: "Haltbarkeit", value: "10–15+ Jahre" }
    ],
    intro: {
      title: "Ästhetik beginnt mit Funktion",
      body: "Wir korrigieren mit Veneers, Kronen oder Composite-Bonding — immer im Einklang mit Ihrem Biss, Ihrer Sprache und Ihrer natürlichen Mimik. Schöne Zähne, die nicht funktionieren, sind keine Lösung.\n\nVor jeder Behandlung visualisieren wir digital, wie Ihr Ergebnis aussehen wird. Sie sehen es vorher — und entscheiden mit."
    },
    inclusions: [
      { title: "Beratung und digitale Vorab-Visualisierung", desc: "Sie sehen Ihr neues Lächeln, bevor wir beginnen." },
      { title: "Veneers aus Keramik oder Composite", desc: "Hauchdünne Keramikschalen oder direktes Bonding — je nach Ausgangssituation." },
      { title: "Form- und Farbkorrekturen", desc: "Lücken schließen, Form harmonisieren, Farbe optimieren." },
      { title: "Meisterlabor-Präzisions-Arbeit", desc: "Jede Versorgung wird individuell handgefertigt." }
    ],
    process: [
      { num: "01", title: "Wunschanalyse", desc: "Was stört Sie? Was wünschen Sie sich? Wir hören zu und beraten ehrlich." },
      { num: "02", title: "Digitale Vorschau", desc: "Wir zeigen Ihnen am Bildschirm, wie das Ergebnis aussehen kann." },
      { num: "03", title: "Mock-up", desc: "Auf Wunsch ein Probe-Lächeln direkt auf den Zähnen — ohne Bohren." },
      { num: "04", title: "Behandlung", desc: "Schonende Vorbereitung der Zähne und Eingliederung der Versorgung." },
      { num: "05", title: "Feinanpassung", desc: "Wir kontrollieren Biss und Optik — bis es perfekt sitzt." }
    ],
    faqs: [
      { q: "Wie lange halten Veneers?", a: "Hochwertige Keramikveneers halten 10–15 Jahre und länger, bei guter Pflege auch über 20 Jahre." },
      { q: "Müssen meine Zähne dafür beschliffen werden?", a: "Bei Keramikveneers wird sehr wenig Substanz abgetragen. Bei Composite-Bonding meist gar nichts." },
      { q: "Was kostet eine ästhetische Behandlung?", a: "Das hängt stark vom Umfang ab. In der Erstberatung erstellen wir einen detaillierten Heil- und Kostenplan." }
    ]
  },
  "bleaching": {
    parent: { label: "Ästhetik", anchor: "aesthetik" },
    title: "Bleaching",
    titleAccent: "helleres Lächeln",
    eyebrow: "Sanfte Aufhellung",
    lede: "Sanfte Aufhellung Ihrer Zähne — als In-Office-Behandlung in der Praxis oder als individuell angepasste Home-Bleaching-Schiene für zu Hause.",
    image: "assets/praxis-behandlung-detail.jpg",
    meta: [
      { label: "Dauer", value: "60–90 Min." },
      { label: "Sitzungen", value: "1 Termin" },
      { label: "Kosten", value: "Privatleistung" },
      { label: "Haltbarkeit", value: "1–3 Jahre" }
    ],
    intro: {
      title: "Wieder strahlend — schonend",
      body: "Mit den Jahren verfärben sich Zähne durch Kaffee, Tee, Rotwein und Tabak. Bleaching kann diese Verfärbungen schonend entfernen — ohne den Zahnschmelz zu schädigen.\n\nWir bieten zwei Verfahren: das schnelle In-Office-Bleaching in der Praxis (nach einer Sitzung sichtbares Ergebnis) und das Home-Bleaching mit individuell angefertigter Schiene für sanfte, abend-für-abend-Aufhellung."
    },
    inclusions: [
      { title: "Vorab eine professionelle Reinigung", desc: "Saubere Zähne sind Voraussetzung für gleichmäßiges Bleaching." },
      { title: "Schutz von Zahnfleisch und Lippen", desc: "Sorgfältiges Abdecken aller umliegenden Bereiche." },
      { title: "Klinisch geprüfte Bleaching-Gele", desc: "Konzentrationen und Verfahren auf Ihren Zahnstatus abgestimmt." },
      { title: "Nachsorge-Hinweise", desc: "Welche Lebensmittel Sie 48 Stunden meiden sollten — und wie das Ergebnis lange hält." }
    ],
    process: [
      { num: "01", title: "Beratung und Befund", desc: "Wir prüfen, ob Ihre Zähne und Ihr Zahnfleisch fürs Bleaching geeignet sind." },
      { num: "02", title: "Professionelle Reinigung", desc: "Saubere Zahnoberflächen für ein gleichmäßiges Ergebnis." },
      { num: "03", title: "Bleaching-Sitzung", desc: "In-Office: 60 Min. in der Praxis. Home: individuelle Schiene für 7–14 Abende zu Hause." },
      { num: "04", title: "Ergebniskontrolle", desc: "Wir vergleichen Vorher/Nachher und besprechen die Pflege." }
    ],
    faqs: [
      { q: "Schadet Bleaching dem Zahnschmelz?", a: "Bei zahnärztlich durchgeführtem Bleaching mit geprüften Mitteln: nein. Drogerie-Produkte sind oft schlechter dosiert und können schaden." },
      { q: "Wie lange hält das Ergebnis?", a: "Je nach Lebensgewohnheiten 1–3 Jahre. Eine 'Auffrisch-Sitzung' alle 1–2 Jahre verlängert das Ergebnis." },
      { q: "Sind die Zähne danach empfindlich?", a: "Eine vorübergehende Sensibilität ist normal und klingt meist nach 24–48 Stunden ab." }
    ]
  },
  "implantologie": {
    parent: { label: "Implantologie & Chirurgie", anchor: "chirurgie" },
    title: "Implantologie",
    titleAccent: "feste Zähne — wie eigene",
    eyebrow: "Hochwertiger Zahnersatz",
    lede: "Implantate ersetzen Zähne wie eigene. Aus Titan oder Keramik, mit individuell gefertigter Krone aus dem Meisterlabor — ein Ergebnis, das Jahrzehnte halten kann.",
    image: "assets/praxis-behandlung.jpg",
    meta: [
      { label: "Dauer OP", value: "30–60 Min." },
      { label: "Einheilzeit", value: "3–6 Monate" },
      { label: "Kosten", value: "Privatleistung" },
      { label: "Haltbarkeit", value: "20+ Jahre" }
    ],
    intro: {
      title: "Die natürlichste Form des Zahnersatzes",
      body: "Ein Implantat ist eine künstliche Zahnwurzel aus Titan oder Keramik, die in den Kieferknochen eingesetzt wird. Darauf wird die Krone befestigt — fest, wie ein eigener Zahn. Sie spüren kein Fremdkörper, kein Klemmen, kein Verschieben.\n\nWir planen jedes Implantat dreidimensional am Computer. Das Ergebnis: maximale Präzision, minimaler Eingriff, vorhersehbares Ergebnis."
    },
    inclusions: [
      { title: "3D-Diagnostik und Planung", desc: "DVT-Aufnahme und computergestützte Implantat-Planung." },
      { title: "Schonendes Einsetzen", desc: "Unter lokaler Betäubung — auf Wunsch mit Lachgas oder leichter Sedierung." },
      { title: "Versorgung mit Krone, Brücke oder Prothese", desc: "Individuell gefertigt im Meisterlabor — passgenau und natürlich." },
      { title: "Nachsorge und Garantie", desc: "Engmaschige Kontrollen — wir stehen für unsere Arbeit ein." }
    ],
    process: [
      { num: "01", title: "Beratung und 3D-Diagnostik", desc: "DVT-Scan, Knochenanalyse, individueller Therapieplan." },
      { num: "02", title: "Implantat-Operation", desc: "Schonende Operation unter lokaler Betäubung — meist in 30–60 Min." },
      { num: "03", title: "Einheilzeit", desc: "3–6 Monate, in denen das Implantat fest in den Knochen einwächst." },
      { num: "04", title: "Eingliederung der Krone", desc: "Anfertigung und Befestigung der individuellen Krone — keine Schmerzen." },
      { num: "05", title: "Recall und Nachsorge", desc: "Lebenslange engmaschige Betreuung schützt Ihre Investition." }
    ],
    faqs: [
      { q: "Tut die OP weh?", a: "Nein — durch lokale Betäubung spüren Sie nichts. Auch danach sind die meisten Patient:innen erstaunt, wie wenig Beschwerden auftreten." },
      { q: "Wie lange hält ein Implantat?", a: "Bei guter Pflege und regelmäßiger Nachsorge oft 20 Jahre und länger. Studien zeigen Erhaltungsraten über 95 % nach 10 Jahren." },
      { q: "Bin ich für ein Implantat geeignet?", a: "Die meisten Patient:innen sind geeignet. Bei wenig Knochen können wir oft mit Knochenaufbau die Voraussetzungen schaffen." }
    ]
  },
  "oralchirurgie": {
    parent: { label: "Implantologie & Chirurgie", anchor: "chirurgie" },
    title: "Oralchirurgie / Kieferchirurgie",
    titleAccent: "schonende Eingriffe",
    eyebrow: "Mikrochirurgie",
    lede: "Weisheitszähne, Wurzelspitzenresektion, Knochenaufbau — schonende Verfahren mit kurzer Heilungszeit, geplant mit moderner 3D-Diagnostik.",
    image: "assets/praxis-behandlung-detail.jpg",
    meta: [
      { label: "Dauer", value: "30–90 Min." },
      { label: "Heilung", value: "1–2 Wochen" },
      { label: "Kosten", value: "Großteils Kasse" },
      { label: "Betäubung", value: "Lokal/Lachgas" }
    ],
    intro: {
      title: "Wenn ein Eingriff nötig ist",
      body: "Manchmal ist ein chirurgischer Eingriff unvermeidbar — sei es zur Entfernung eines Weisheitszahns, zur Wurzelspitzen-Resektion oder zum Knochenaufbau vor einer Implantation. Mit modernen mikrochirurgischen Verfahren halten wir die Eingriffe so klein wie möglich und die Heilungszeit kurz."
    },
    inclusions: [
      { title: "3D-Planung", desc: "Vor jedem komplexen Eingriff erstellen wir eine dreidimensionale Aufnahme." },
      { title: "Schonende Technik", desc: "Mikrochirurgische Instrumente, kleinste Schnitte, atraumatisches Vorgehen." },
      { title: "Effektive Betäubung", desc: "Lokale Betäubung, auf Wunsch mit Lachgas oder Sedierung." },
      { title: "Strukturierte Nachsorge", desc: "Klare Anweisungen, Kontrolltermine, schnelle Erreichbarkeit bei Fragen." }
    ],
    process: [
      { num: "01", title: "Diagnostik und Aufklärung", desc: "Klinische Untersuchung, Röntgen, ggf. DVT, ausführliche Aufklärung." },
      { num: "02", title: "OP-Planung", desc: "Individuelle Planung des Eingriffs — bei komplexen Fällen mit 3D-Software." },
      { num: "03", title: "Eingriff", desc: "Schonende Durchführung unter lokaler Betäubung — Sie sind wach, spüren aber nichts." },
      { num: "04", title: "Nachsorge", desc: "Kontrolle nach 24h, Fadenentfernung nach 7–10 Tagen, weitere Kontrolle nach 4 Wochen." }
    ],
    faqs: [
      { q: "Werde ich starke Schmerzen haben?", a: "Während des Eingriffs nicht — durch Betäubung. Danach reicht meist ein leichtes Schmerzmittel für 1–2 Tage." },
      { q: "Wie lange bin ich krankgeschrieben?", a: "Je nach Eingriff 1–5 Tage. Wir stellen Ihnen direkt nach der OP eine Bescheinigung aus." },
      { q: "Was ist mit Vollnarkose?", a: "Bei sehr ängstlichen Patient:innen oder größeren Eingriffen ist Vollnarkose über einen Anästhesie-Partner möglich." }
    ]
  },
  "schienentherapie": {
    parent: { label: "Schienentherapie", anchor: "schienen" },
    title: "Schienentherapie",
    titleAccent: "ruhigem Kiefergelenk",
    eyebrow: "Knirsch-Schiene",
    lede: "Bruxismus — das nächtliche Knirschen — schadet Zähnen und Kiefergelenk. Eine individuell angepasste Knirsch-Schiene schützt zuverlässig und entlastet die Muskulatur.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&q=80&auto=format&fit=crop",
    meta: [
      { label: "Dauer", value: "2 Termine" },
      { label: "Tragezeit", value: "Nachts" },
      { label: "Kosten", value: "Kassenleistung" },
      { label: "Anpassung", value: "Individuell" }
    ],
    intro: {
      title: "Knirschen Sie nachts?",
      body: "Schätzungsweise jede:r dritte Erwachsene knirscht oder presst nachts mit den Zähnen — meist unbewusst. Folgen sind abgeschliffene Zähne, Kiefergelenkschmerzen, Kopfschmerzen und Verspannungen.\n\nEine individuell angefertigte Aufbiss-Schiene schützt die Zähne, entlastet die Kaumuskulatur und kann viele Beschwerden deutlich reduzieren."
    },
    inclusions: [
      { title: "Funktionsdiagnostik", desc: "Analyse von Biss, Kiefergelenk und Muskulatur." },
      { title: "Individuelle Anfertigung im Meisterlabor", desc: "Präzise Abformung, exakte Passung — keine Standard-Lösung." },
      { title: "Anpassung und Kontrolle", desc: "Wir passen die Schiene auf 0,1 mm genau ein." },
      { title: "Kombinierbar mit Physiotherapie", desc: "Bei muskulären Beschwerden empfehlen wir gezielte Physiotherapie." }
    ],
    process: [
      { num: "01", title: "Anamnese und Diagnostik", desc: "Symptom-Aufnahme, Inspektion der Zähne, Funktionsbefund." },
      { num: "02", title: "Abformung", desc: "Präzise digitale oder konventionelle Abformung beider Kiefer." },
      { num: "03", title: "Anfertigung im Meisterlabor", desc: "1–2 Wochen Herstellungszeit für die individuelle Schiene." },
      { num: "04", title: "Eingliederung", desc: "Feinanpassung am Patient:in — bis sie perfekt sitzt und der Biss stimmt." },
      { num: "05", title: "Kontrolle nach 4–6 Wochen", desc: "Wir prüfen Sitz, Abrieb und Wirkung — bei Bedarf Nachjustierung." }
    ],
    faqs: [
      { q: "Wie lange hält eine Knirsch-Schiene?", a: "Bei nächtlichem Tragen typischerweise 3–7 Jahre, je nach Knirsch-Intensität." },
      { q: "Ist die Schiene unangenehm?", a: "Nach 1–2 Wochen Eingewöhnung ist sie kaum noch spürbar. Die meisten Patient:innen schlafen damit gut." },
      { q: "Übernimmt die Krankenkasse die Kosten?", a: "Ja, eine Standard-Knirsch-Schiene ist Kassenleistung. Bei Spezialausführungen kann ein Eigenanteil anfallen." }
    ]
  },
  "schnarchschienen": {
    parent: { label: "Schienentherapie", anchor: "schienen" },
    title: "Schnarchschienen",
    titleAccent: "ruhigeren Nächten",
    eyebrow: "Gegen Schnarchen",
    lede: "Sanfte Vorverlagerung des Unterkiefers während des Schlafs — wirksam bei leichter bis mittlerer Schlafapnoe und Schnarchen.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=80&auto=format&fit=crop",
    meta: [
      { label: "Dauer", value: "2 Termine" },
      { label: "Tragezeit", value: "Nachts" },
      { label: "Kosten", value: "ggf. Kasse" },
      { label: "Wirkung", value: "Sofort" }
    ],
    intro: {
      title: "Ruhe für Sie und Ihre Partner:in",
      body: "Schnarchen ist nicht nur störend — es kann ein Anzeichen für obstruktive Schlafapnoe sein. Eine Unterkiefer-Protrusionsschiene (UPS) verlagert den Unterkiefer leicht nach vorn und hält die Atemwege frei.\n\nWir arbeiten eng mit Schlaflaboren und HNO-Ärzt:innen zusammen — wenn nötig, klären wir vorab die Diagnose."
    },
    inclusions: [
      { title: "Diagnostische Abklärung", desc: "Auf Wunsch mit schlafmedizinischem Partner-Zentrum." },
      { title: "Individuelle Schienen-Anfertigung", desc: "Zwei verbundene Schienen — präzise auf Ihren Biss abgestimmt." },
      { title: "Stufenweise Anpassung", desc: "Langsame Vorverlagerung bis zum optimalen Effekt." },
      { title: "Kontrolle und Wirksamkeitsprüfung", desc: "Mit App-basierter Aufzeichnung oder im Schlaflabor." }
    ],
    process: [
      { num: "01", title: "Erstgespräch und Befund", desc: "Wir prüfen, ob die UPS für Sie geeignet ist." },
      { num: "02", title: "Schlafdiagnostik (optional)", desc: "Ausschluss von Schlafapnoe in Zusammenarbeit mit Schlaflabor." },
      { num: "03", title: "Abformung und Anfertigung", desc: "Präzise digitale Abformung, Anfertigung im Meisterlabor." },
      { num: "04", title: "Eingliederung", desc: "Anpassung und Schulung im Umgang." },
      { num: "05", title: "Nachkontrolle", desc: "Nach 4–6 Wochen prüfen wir Wirkung und passen ggf. an." }
    ],
    faqs: [
      { q: "Wirkt die Schiene bei jedem?", a: "Bei leichter bis mittelgradiger Schlafapnoe und einfachem Schnarchen: in 70–90 % der Fälle." },
      { q: "Übernimmt die Krankenkasse?", a: "Bei nachgewiesener Schlafapnoe können gesetzliche Krankenkassen die Kosten übernehmen — wir helfen beim Antrag." },
      { q: "Was ist mit der CPAP-Maske?", a: "Bei schwerer Schlafapnoe ist die CPAP-Maske weiter Goldstandard. Die Schiene ist eine Alternative für leichtere Fälle oder bei Maskenunverträglichkeit." }
    ]
  },
  "nti-aufbiss-schienen": {
    parent: { label: "Schienentherapie", anchor: "schienen" },
    title: "NTI Aufbiss-Schienen",
    titleAccent: "weniger Migräne",
    eyebrow: "Gegen Spannungs-Kopfschmerz",
    lede: "Kleine Aufbiss-Schiene gegen Spannungs-Kopfschmerz und Migräne — entlastet die Kaumuskulatur gezielt.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80&auto=format&fit=crop",
    meta: [
      { label: "Dauer", value: "2 Termine" },
      { label: "Tragezeit", value: "Nachts" },
      { label: "Größe", value: "Sehr klein" },
      { label: "Wirkung", value: "Nach 2–4 Wo" }
    ],
    intro: {
      title: "Klein, aber wirkungsvoll",
      body: "Die NTI-Schiene ist eine sehr kleine Aufbiss-Schiene, die nur die Frontzähne abdeckt. Sie verhindert das maximale Zusammenpressen der Kaumuskulatur — und kann so spannungsbedingte Kopfschmerzen und Migräne deutlich reduzieren.\n\nFür viele Patient:innen ist sie eine Lebensveränderung — gerade, wenn klassische Schienen nicht vertragen werden."
    },
    inclusions: [
      { title: "Sorgfältige Diagnostik", desc: "Klärung, ob NTI für Sie geeignet ist — sie ist nicht für alle Fälle die richtige Wahl." },
      { title: "Individuelle Anpassung", desc: "Präzise auf Ihre Frontzähne abgestimmt." },
      { title: "Engmaschige Kontrolle", desc: "Anfangs Kontrolle nach 2 und 6 Wochen — die Schiene hat Wirkung auf den ganzen Biss." },
      { title: "Beratung zu Ergänzungen", desc: "Auf Wunsch Empfehlungen zu Physiotherapie, Stressmanagement, Schlafhygiene." }
    ],
    process: [
      { num: "01", title: "Diagnostik und Beratung", desc: "Anamnese der Kopfschmerzen, Funktionsbefund, Aufklärung über NTI." },
      { num: "02", title: "Abformung", desc: "Präzise Abformung der Frontzähne." },
      { num: "03", title: "Anfertigung", desc: "Individuelle Herstellung im Labor." },
      { num: "04", title: "Eingliederung", desc: "Anpassung und genaue Trage-Schulung." },
      { num: "05", title: "Engmaschige Kontrollen", desc: "Erste Kontrolle nach 2 Wochen, dann nach 6 Wochen — Bissverhältnisse können sich ändern." }
    ],
    faqs: [
      { q: "Wirkt die NTI bei Migräne?", a: "Bei spannungsbedingter Migräne und Spannungskopfschmerz: ja, in vielen Fällen sehr deutlich. Bei rein vaskulärer Migräne nicht." },
      { q: "Sind Nebenwirkungen bekannt?", a: "Bei nicht-engmaschiger Kontrolle kann sich der Biss verändern. Deshalb sind regelmäßige Kontrollen wichtig." },
      { q: "Wie lange muss ich sie tragen?", a: "In der Regel nachts auf Dauer. Die Beschwerden bessern sich oft schon nach 2–4 Wochen." }
    ]
  },
  "zahnkorrektur-schienen": {
    parent: { label: "Schienentherapie", anchor: "schienen" },
    title: "Zahnkorrektur Schienen",
    titleAccent: "geraderem Lächeln",
    eyebrow: "Unsichtbare Aligner",
    lede: "Unsichtbare Aligner für sanfte Zahnkorrektur — herausnehmbar, transparent, alltagstauglich.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&q=80&auto=format&fit=crop",
    meta: [
      { label: "Dauer", value: "6–18 Monate" },
      { label: "Tragezeit", value: "22h/Tag" },
      { label: "Sichtbar?", value: "Kaum" },
      { label: "Kosten", value: "ab 2.500 €" }
    ],
    intro: {
      title: "Korrektur ohne Klammer",
      body: "Aligner sind transparente, herausnehmbare Schienen, die Zähne sanft in die gewünschte Position bewegen. Sie tragen jede Schiene ca. zwei Wochen und wechseln dann auf die nächste — bis zum Endergebnis.\n\nIdeal für leichte bis mittlere Korrekturen, Engstand oder Lückenschluss. Wir prüfen ehrlich, ob Aligner für Ihre Situation die richtige Wahl sind oder ob klassische Kieferorthopädie besser passt."
    },
    inclusions: [
      { title: "Digitaler Scan und 3D-Planung", desc: "Sie sehen vorab am Bildschirm, wie Ihr Lächeln nachher aussehen wird." },
      { title: "Individuelle Aligner-Serie", desc: "Bis zu 30+ Schienen, präzise berechnet für Ihre Korrektur." },
      { title: "Engmaschige Kontrollen", desc: "Alle 6–8 Wochen Kontrolle in der Praxis." },
      { title: "Stabilisierung mit Retainer", desc: "Nach Behandlungsende: feiner Retainer, damit das Ergebnis hält." }
    ],
    process: [
      { num: "01", title: "Beratung und 3D-Scan", desc: "Wir scannen Ihre Zähne und zeigen Ihnen das geplante Endergebnis." },
      { num: "02", title: "Therapie-Plan", desc: "Anzahl der Aligner, Behandlungsdauer, Kostenvoranschlag." },
      { num: "03", title: "Aligner-Behandlung", desc: "Sie tragen jede Schiene 1–2 Wochen, 22h pro Tag — auch nachts." },
      { num: "04", title: "Kontrollen", desc: "Alle 6–8 Wochen in der Praxis: Fortschritt prüfen, neue Aligner ausgeben." },
      { num: "05", title: "Retention", desc: "Festsitzender oder herausnehmbarer Retainer hält das Ergebnis dauerhaft." }
    ],
    faqs: [
      { q: "Tragen die Aligner sich auf?", a: "Sehr leicht — kaum sichtbar und kein Material in der Lippe. Beim Sprechen gewöhnen Sie sich nach 1–2 Tagen." },
      { q: "Kann ich damit essen?", a: "Sie nehmen die Aligner zum Essen heraus. Trinken (außer heißer Getränke) ist mit Aligner möglich." },
      { q: "Was kostet die Behandlung?", a: "Je nach Komplexität ab ca. 2.500 € bis ca. 6.000 €. Wir erstellen einen individuellen Plan." }
    ]
  },
  "kinderzahnheilkunde": {
    parent: { label: "Kinderzahnheilkunde", anchor: "kinder" },
    title: "Kinderzahnheilkunde",
    titleAccent: "ihre Kinder",
    eyebrow: "Für die Kleinen",
    lede: "Wir wollen, dass Ihr Kind den Zahnarzt-Besuch in guter Erinnerung behält. Mit ruhigem Tempo, kindgerechter Sprache und kleinen Mutproben statt großer Behandlungen.",
    image: "https://images.unsplash.com/photo-1581585504013-9eb45c4d8f63?w=1200&q=80&auto=format&fit=crop",
    meta: [
      { label: "Dauer", value: "30–45 Min." },
      { label: "Ab Alter", value: "ab 1. Zahn" },
      { label: "Kosten", value: "Kassenleistung" },
      { label: "Eltern dabei", value: "Selbstverständlich" }
    ],
    intro: {
      title: "Ein guter erster Eindruck wirkt ein Leben lang",
      body: "Die ersten Zahnarztbesuche prägen oft das ganze Leben. Wir nehmen uns Zeit, erklären spielerisch und schaffen positive Erinnerungen — schon ab dem ersten Zahn.\n\nKinder dürfen alles anschauen und ausprobieren, bevor irgendetwas passiert. Wir erklären jeden Schritt mit kindgerechter Sprache. Und das wichtigste: Wir machen keine Behandlung, wenn Ihr Kind nicht bereit ist."
    },
    inclusions: [
      { title: "Kennenlern-Termine", desc: "Erster Besuch oft nur zum Anschauen und Spielen — ohne Untersuchung." },
      { title: "Kindgerechte Untersuchung", desc: "Mit 'Zauber-Lupe' (Spiegel) und 'Kitzel-Pinsel' (Sonde)." },
      { title: "Versiegelung der bleibenden Zähne", desc: "Schützt die Kauflächen der ersten bleibenden Backenzähne." },
      { title: "Eltern-Beratung zu Pflege und Ernährung", desc: "Konkrete Tipps für jeden Altersabschnitt." }
    ],
    process: [
      { num: "01", title: "Erstkontakt", desc: "Mit Eltern und Kind — entspannt, ohne Termin-Druck. Anschauen, fragen, kennenlernen." },
      { num: "02", title: "Erste Untersuchung", desc: "Spielerisch im Sitzen oder Liegen — wann immer Ihr Kind bereit ist." },
      { num: "03", title: "Putzschule", desc: "Wir zeigen Ihrem Kind und Ihnen, wie's richtig geht." },
      { num: "04", title: "Recall", desc: "Alle 6 Monate ein freundlicher Besuch — Routine statt Ausnahmesituation." }
    ],
    faqs: [
      { q: "Ab wann sollte mein Kind zum Zahnarzt?", a: "Ab dem ersten Zahn — etwa ab 6 Monaten. Auch wenn die Untersuchung kurz ist, lernt Ihr Kind die Praxis als entspannten Ort kennen." },
      { q: "Was, wenn mein Kind Angst hat?", a: "Wir machen keine Behandlung gegen den Willen Ihres Kindes. Manchmal brauchen wir 2–3 Termine, bis sich Ihr Kind traut. Das ist okay." },
      { q: "Werden Milchzähne überhaupt behandelt?", a: "Ja, denn sie halten den Platz für die bleibenden Zähne und sind zum Kauen wichtig. Karies an Milchzähnen wird behandelt — kindgerecht." }
    ]
  },
  "zahnarztangst": {
    parent: { label: "Hilfe bei Zahnarztangst", anchor: "angst" },
    title: "Hilfe bei Zahnarztangst",
    titleAccent: "Ihrem Tempo",
    eyebrow: "Mit Verständnis",
    lede: "Etwa 7 % der Erwachsenen vermeiden den Zahnarzt aus Angst. Bei uns ist das anders. Wir nehmen Ihre Angst ernst — und behandeln in Ihrem Tempo.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=80&auto=format&fit=crop",
    meta: [
      { label: "Erstgespräch", value: "Ohne Behandlung" },
      { label: "Pausen-Signal", value: "Jederzeit" },
      { label: "Kosten", value: "Kassenleistung" },
      { label: "Lachgas", value: "Auf Wunsch" }
    ],
    intro: {
      title: "Ihre Angst ist berechtigt — und ernstzunehmen",
      body: "Wer Angst vor dem Zahnarzt hat, hat fast immer einen Grund: schlechte Erfahrungen, das Gefühl der Hilflosigkeit, Schmerzen, die nicht ernst genommen wurden. Wir machen es anders.\n\nWir beginnen mit einem Erstgespräch — ohne Behandlung, ohne Druck. Sie zeigen uns, wie weit wir gehen dürfen. Pausen-Signal jederzeit. Keine Überraschungen. Sie haben die Kontrolle."
    },
    inclusions: [
      { title: "Erstgespräch ausschließlich zum Kennenlernen", desc: "Sie kommen, sehen die Praxis, lernen das Team kennen — keine Behandlung." },
      { title: "Schritt-für-Schritt-Ankündigung", desc: "Wir kündigen jeden einzelnen Schritt an. Nichts geschieht ohne Ihre Zustimmung." },
      { title: "Pausen-Signal — Sie haben die Kontrolle", desc: "Heben Sie die Hand, und wir stoppen sofort. Immer." },
      { title: "Auf Wunsch Lachgas oder Sedierung", desc: "Sanfte Entspannungsverfahren — bei Bedarf auch Sedierung mit Anästhesist:in." }
    ],
    process: [
      { num: "01", title: "Telefonisches Vorgespräch", desc: "Wenn schon Anrufen schwer ist: schreiben Sie uns. Wir antworten persönlich." },
      { num: "02", title: "Erstgespräch in der Praxis", desc: "Kein Behandlungsstuhl, keine Untersuchung — nur reden, kennenlernen, Fragen klären." },
      { num: "03", title: "Vorsichtige erste Untersuchung", desc: "Wenn Sie soweit sind: zunächst nur schauen, kein Anfassen, kein Bohren." },
      { num: "04", title: "Behandlungs-Plan in Ihrem Tempo", desc: "Wir teilen größere Behandlungen in kleine, gut verkraftbare Schritte." },
      { num: "05", title: "Begleitung beim Recall", desc: "Auch nach erfolgreicher Behandlung: enge Betreuung, damit Vermeidung nicht zurückkehrt." }
    ],
    faqs: [
      { q: "Was, wenn ich es nicht schaffe in die Praxis zu kommen?", a: "Schreiben Sie uns oder rufen Sie an — wir vereinbaren ein Telefon-Vorgespräch. Sie müssen nicht direkt kommen." },
      { q: "Können Sie mich auch in Vollnarkose behandeln?", a: "Ja, in Zusammenarbeit mit einem Anästhesie-Partner. Wir besprechen, ob das wirklich die beste Lösung für Sie ist." },
      { q: "Werde ich verurteilt, wenn meine Zähne in schlechtem Zustand sind?", a: "Niemals. Wir machen keine Vorwürfe — wir lösen Probleme. Punkt." }
    ]
  }
};
