// AnamnesePDF — generates the real practice Anamnesebogen as a filled PDF via jsPDF.
// Also exposes the shared bilingual CONTENT used by AnamneseForm.jsx (window.ANAMNESE_CONTENT),
// so the online form and the generated PDF never drift apart.
// Note: PDF strings use straight quotes / hyphens / middot only (jsPDF Helvetica = Latin-1).

(function() {

  // ---- Shared, bilingual content (consumed by AnamneseForm.jsx too) ----
  var CONTENT = {
    de: {
      ui: {
        formTitle: "Anamnesebogen",
        formSubtitle: "Bitte füllen Sie den Bogen sorgfältig aus. Anschließend können Sie ihn als PDF herunterladen und ausdrucken.",
        required: "Pflichtfeld",
        downloadPDF: "Als PDF herunterladen",
        back: "Zurück zur Übersicht",
        fillRequired: "Bitte füllen Sie mindestens Name und Vorname aus.",
        note: "Das Unterschriftsfeld bleibt frei — bitte nach dem Ausdruck handschriftlich unterschreiben."
      },
      yes: "Ja",
      no: "Nein",
      sign: "Datum / Unterschrift Patient/in",
      welcome: {
        title: "Herzlich Willkommen in unserer Zahnarztpraxis.",
        intro: "Für die komplikationslose Behandlung und eine bestmögliche Organisation benötigen wir von Ihnen einige Informationen. Alle Angaben unterliegen der Schweigepflicht und dem Datenschutz. Falls Sie zu diesem Informationsblatt Fragen haben, klären wir dies gerne in einem persönlichen Gespräch."
      },
      masterTitle: "Patientendaten",
      masters: {
        patient: "Patient/in",
        member: "Mitglied (falls abweichend)",
        address: "Anschrift",
        phone: "Telefon",
        occupation: "Beruf",
        insurance: "Krankenkasse"
      },
      f: {
        name: "Name", vorname: "Vorname", birthPlace: "Geburtstag / -ort", birth: "Geburtstag",
        street: "Straße, Hausnummer", plzOrt: "PLZ, Ort",
        telPrivat: "Privat", telMobil: "Mobil", telBeruf: "Beruflich",
        email: "E-Mail", beruf: "Tätigkeit", arbeitgeber: "Anschrift des Arbeitgebers",
        kasse: "Name der Krankenkasse"
      },
      insuranceOptions: [
        "Pflichtversichert", "Freiwillig versichert", "Zusatzversicherung",
        "Basisversicherung", "Privat versichert", "Privat versichert, beihilfeberechtigt"
      ],
      paymentNotice: "Bitte nehmen Sie zur Kenntnis, dass Sie zur Bezahlung Ihrer gesamten Rechnung verpflichtet sind, auch wenn Ihre Krankenkasse (bzw. Privat- oder Zusatzversicherung) nicht immer in vollem Umfang erstattet.",
      sms: {
        heading: "Einverständniserklärung Terminerinnerung per SMS",
        sub: "Einwilligung zur elektronischen Datenübermittlung",
        body: "Für den Service der SMS-Terminerinnerung am Tag vorher arbeiten wir mit dem Dienstleister 3steps2web, Gordon Seipold zusammen, mit dem wir eine Datenschutzvereinbarung nach der EU-DS-GVO getroffen haben. Diese ist bei uns jederzeit auf Anforderung einsehbar.",
        consent: "Ich erkläre mich damit einverstanden, dass ich Terminerinnerungen per SMS von der unten genannten Praxis erhalte."
      },
      health: {
        eyebrow: "Für eine komplikationslose Behandlung bitte ausfüllen",
        title: "Fragen zum allgemeinen Gesundheitszustand"
      },
      healthQuestions: [
        { q: "Stehen Sie zur Zeit in ärztlicher Behandlung? Wenn ja, weshalb?", detail: true },
        { q: "Gab es in den letzten 2 Jahren Krankenhausaufenthalte? Wenn ja, weswegen?", detail: true },
        { q: "Nehmen Sie regelmäßig Medikamente ein? Wenn ja, welche und wofür?", detail: true },
        { q: "Besteht eine Allergie gegen Medikamente oder Materialien? (z.B. Penicillin, Jod, Nickel etc.) Wenn ja, gegen welche?", detail: true },
        { q: "Haben Sie einen Allergiepass?", detail: false },
        { q: "Leiden Sie unter Herzerkrankungen (z.B. Herzschwäche, unregelm. Herzschlag, Herzasthma)? Tragen Sie einen Herzschrittmacher? Zustand nach Herzinfarkt?", detail: false },
        { q: "Neigen Sie zu Ohnmachtsanfällen? Nehmen Sie Beruhigungsmittel (z.B. Valium)? Sonstiges:", detail: true }
      ],
      disease: {
        q: "Leiden Sie an folgenden Krankheiten?",
        hint: "(Bitte schreiben Sie im Falle einer Erkrankung die Jahresangabe dahinter, seit wann Sie an der Krankheit leiden.)",
        none: "Nein",
        yearLabel: "seit (Jahr)",
        list: [
          "Diabetes", "Asthma", "Tuberkulose", "Epilepsie", "Rheuma",
          "Schilddrüsenerkrankung", "Magen-Darmerkrankungen", "Nierenleiden",
          "HIV/Aids", "Bluthochdruck", "Hepatitis A, B, C", "Andere"
        ]
      },
      pregnancyQ: "Bei Frauen: Besteht eine Schwangerschaft? Wenn ja, welcher Monat?",
      orthoQ: "Wurden/werden Sie kieferorthopädisch behandelt?",
      orthoYes: "Ja, ich habe/hatte eine herausnehmbare oder festsitzende Zahnspange.",
      perioQ: "Fand schon einmal eine Parodontose-Behandlung (tiefe Zahntaschenreinigung) statt?",
      perioDetail: "Wann?",
      complicationsQ: "Sind schon einmal bei einem Zahnarztbesuch Komplikationen aufgetreten?",
      complicationsDetail: "Welche?",
      accidentQ: "Haben oder hatten Sie schon einmal einen Unfall, bei dem Mund oder Gesicht verletzt wurden?",
      accidentDetail: "Wann und welche Art?",
      teethQ: "Welche Veränderungen beobachten Sie an Ihren Zähnen?",
      teethNone: "Keine",
      teethOptions: [
        "Zahnfleischbluten",
        "Zahnlockerung / Zahnbeweglichkeit",
        "Empfindliche Reaktion auf Hitze, Kälte, Süßes oder beim Kauen",
        "Schmerzhaft freiliegende Zahnhälse",
        "Abnutzung der Zahnsubstanz durch Zähneknirschen",
        "Verformung / Verfärbung von Füllungen und Kronen"
      ],
      jawQ: "Leiden Sie unter Kieferschmerzen/-knacken, Gesichts-, Kopf- oder Schulterschmerzen?",
      jawDetail: "Wo?",
      xrayQ: "Wurden in den letzten 12 Monaten Röntgenaufnahmen Ihrer Zähne oder des Kiefers gemacht?",
      xrayDetail: "Von wem?",
      heardQ: "Wie sind Sie auf uns aufmerksam geworden?",
      heard: {
        internet: "Internet",
        bekannt: "Empfehlung eines Bekannten",
        bekanntDetail: "Wenn ja, welcher?",
        schild: "Straßenschild",
        arzt: "Empfehlung eines Arztes",
        arztDetail: "Wenn ja, welcher?"
      },
      service: {
        heading: "Ein besonderer kostenloser Service unserer Praxis",
        q: "Möchten Sie durch uns regelmäßig an Ihre Vorsorgeuntersuchung (Bonusheft) oder an die gesetzlich empfohlene Kinderprophylaxe erinnert werden?",
        optYes: "Ja, bitte erinnern Sie mich."
      },
      notice: {
        heading: "Wichtige Mitteilung",
        body: "Unsere Praxis wird nach dem Bestellsystem geführt. Das bedeutet, dass wir für Ihre notwendige Behandlung speziell für Sie Behandlungszeit reservieren. Umgekehrt bitten wir Sie, wenn Sie den vereinbarten Termin nicht einhalten können, unbedingt spätestens 48 Stunden vorher abzusagen, da Ihnen sonst die ungenutzte Zeit in Rechnung gestellt werden kann (§§ 304, 615 BGB).",
        thanks: "Vielen Dank für Ihre Mithilfe zu einem reibungslosen Praxisablauf. Ihr Praxisteam"
      },
      dsgvo: {
        heading: "Datenschutzrechtliche Einwilligungserklärung",
        sub: "für die Verarbeitung personenbezogener Patientendaten gemäß Art. 6 Abs. 1 Buchst. a), Art. 7 DSGVO",
        body: "Ich stimme hiermit der Speicherung meiner personenbezogenen Daten zum Zweck sämtlicher zahnärztlicher Behandlungen und Verwaltung durch die Praxis zu. Ich bin darauf hingewiesen worden, dass ich diese Zustimmung jederzeit schriftlich oder durch E-Mail an die Praxis widerrufen kann (Art. 7 Abs. 3 DSGVO). Mir ist bekannt, dass ein möglicher Widerruf der Einwilligung die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt (Art. 7 Abs. 3 Satz 2 DSGVO)."
      },
      filename: "Anamnesebogen.pdf"
    },

    en: {
      ui: {
        formTitle: "Medical History Form",
        formSubtitle: "Please complete the form carefully. You can then download and print it as a PDF.",
        required: "Required",
        downloadPDF: "Download as PDF",
        back: "Back to overview",
        fillRequired: "Please fill in at least last name and first name.",
        note: "The signature field is left blank — please sign by hand after printing."
      },
      yes: "Yes",
      no: "No",
      sign: "Date / signature of patient",
      welcome: {
        title: "Welcome to our dental practice.",
        intro: "To ensure smooth treatment and the best possible organisation, we need some information from you. All details are subject to medical confidentiality and data protection. If you have any questions about this form, we are happy to discuss them with you in person."
      },
      masterTitle: "Patient details",
      masters: {
        patient: "Patient",
        member: "Insured member (if different)",
        address: "Address",
        phone: "Phone",
        occupation: "Occupation",
        insurance: "Health insurance"
      },
      f: {
        name: "Last name", vorname: "First name", birthPlace: "Date / place of birth", birth: "Date of birth",
        street: "Street, house number", plzOrt: "Postal code, city",
        telPrivat: "Private", telMobil: "Mobile", telBeruf: "Work",
        email: "Email", beruf: "Occupation", arbeitgeber: "Employer's address",
        kasse: "Name of health insurance"
      },
      insuranceOptions: [
        "Compulsorily insured", "Voluntarily insured", "Supplementary insurance",
        "Basic insurance", "Privately insured", "Privately insured, eligible for subsidy"
      ],
      paymentNotice: "Please note that you are obliged to pay your entire invoice, even if your health insurance (or private/supplementary insurance) does not always reimburse the full amount.",
      sms: {
        heading: "Consent to appointment reminders by SMS",
        sub: "Consent to electronic data transmission",
        body: "For the SMS appointment reminder service (sent the day before), we work with the service provider 3steps2web, Gordon Seipold, with whom we have concluded a data protection agreement in accordance with the EU GDPR. This is available for inspection at any time on request.",
        consent: "I agree to receive appointment reminders by SMS from the practice named below."
      },
      health: {
        eyebrow: "Please complete for smooth treatment",
        title: "Questions about your general state of health"
      },
      healthQuestions: [
        { q: "Are you currently undergoing medical treatment? If yes, why?", detail: true },
        { q: "Have you been hospitalised in the last 2 years? If yes, why?", detail: true },
        { q: "Do you take medication regularly? If yes, which and what for?", detail: true },
        { q: "Do you have any allergy to medications or materials? (e.g. penicillin, iodine, nickel, etc.) If yes, to which?", detail: true },
        { q: "Do you have an allergy passport?", detail: false },
        { q: "Do you suffer from heart conditions (e.g. heart failure, irregular heartbeat, cardiac asthma)? Do you have a pacemaker? Have you had a heart attack?", detail: false },
        { q: "Are you prone to fainting? Do you take sedatives (e.g. Valium)? Other:", detail: true }
      ],
      disease: {
        q: "Do you suffer from any of the following diseases?",
        hint: "(In case of illness, please add the year since when you have had the condition.)",
        none: "No",
        yearLabel: "since (year)",
        list: [
          "Diabetes", "Asthma", "Tuberculosis", "Epilepsy", "Rheumatism",
          "Thyroid disease", "Gastrointestinal diseases", "Kidney disease",
          "HIV/AIDS", "High blood pressure", "Hepatitis A, B, C", "Other"
        ]
      },
      pregnancyQ: "For women: Are you pregnant? If yes, which month?",
      orthoQ: "Have you had / are you having orthodontic treatment?",
      orthoYes: "Yes, I have/had removable or fixed braces.",
      perioQ: "Have you ever had periodontal treatment (deep gum-pocket cleaning)?",
      perioDetail: "When?",
      complicationsQ: "Have any complications ever occurred during a dental visit?",
      complicationsDetail: "Which?",
      accidentQ: "Have you ever had an accident in which your mouth or face was injured?",
      accidentDetail: "When and what kind?",
      teethQ: "What changes do you notice in your teeth?",
      teethNone: "None",
      teethOptions: [
        "Bleeding gums",
        "Loose teeth / tooth mobility",
        "Sensitivity to heat, cold, sweets or when chewing",
        "Painfully exposed tooth necks",
        "Wear of tooth substance from grinding",
        "Deformation / discolouration of fillings and crowns"
      ],
      jawQ: "Do you suffer from jaw pain/clicking, facial, head or shoulder pain?",
      jawDetail: "Where?",
      xrayQ: "Have X-rays of your teeth or jaw been taken in the last 12 months?",
      xrayDetail: "By whom?",
      heardQ: "How did you hear about us?",
      heard: {
        internet: "Internet",
        bekannt: "Recommendation by an acquaintance",
        bekanntDetail: "If yes, who?",
        schild: "Street sign",
        arzt: "Recommendation by a doctor",
        arztDetail: "If yes, who?"
      },
      service: {
        heading: "A special free service of our practice",
        q: "Would you like us to remind you regularly about your check-up (bonus booklet) or the legally recommended children's prophylaxis?",
        optYes: "Yes, please remind me."
      },
      notice: {
        heading: "Important notice",
        body: "Our practice operates by appointment. This means we reserve treatment time specifically for you. In return, if you cannot keep the agreed appointment, please cancel at least 48 hours in advance, otherwise the unused time may be charged to you (Sections 304, 615 German Civil Code).",
        thanks: "Thank you for your cooperation in ensuring a smooth practice routine. Your practice team"
      },
      dsgvo: {
        heading: "Data protection consent declaration",
        sub: "for the processing of personal patient data pursuant to Art. 6(1)(a), Art. 7 GDPR",
        body: "I hereby consent to the storage of my personal data for the purpose of all dental treatments and administration by the practice. I have been informed that I may withdraw this consent at any time in writing or by email to the practice (Art. 7(3) GDPR). I am aware that any withdrawal of consent does not affect the lawfulness of the processing carried out on the basis of the consent up to the withdrawal (Art. 7(3) sentence 2 GDPR)."
      },
      filename: "Medical-History-Form.pdf"
    }
  };

  // Practice header (language-independent)
  var HEADER = {
    name: "Zahnärztliche Praxisgemeinschaft Dr. Birte Hancock-Diener · Dr. Irene Jahn",
    address: "Friedrichstraße 33 · 80801 München",
    phones: "Dr. Hancock 089 38 88 95 00 · Dr. Jahn 089 38 80 86 87",
    contact: "Fax 089 38 88 89 84 · empfang@zahnarztpraxis-schwabing.de"
  };

  function loadLogoAsDataURL() {
    return new Promise(function(resolve) {
      var img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = function() { resolve(null); };
      img.src = "assets/logo.png";
    });
  }

  function generateAnamnesePDF(formData, lang) {
    loadLogoAsDataURL().then(function(logoDataURL) {
      _buildPDF(formData || {}, lang, logoDataURL);
    });
  }

  function _buildPDF(fd, lang, logoDataURL) {
    var L = lang === "en" ? CONTENT.en : CONTENT.de;
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ unit: "mm", format: "a4" });
    var pw = 210, ph = 297;
    var ml = 20, mr = 20, mt = 20;
    var cw = pw - ml - mr;
    var y = mt;
    var fontSize = 10;
    var lineH = 5.5;

    var health = fd.health || {};
    var diseases = fd.diseases || {};
    var teeth = fd.teeth || {};
    var heard = fd.heard || {};

    function footerText() {
      return HEADER.name + " · " + HEADER.address;
    }
    function drawFooter() {
      doc.setFontSize(7);
      doc.setTextColor(140);
      doc.text(footerText(), pw / 2, ph - 10, { align: "center" });
      doc.setTextColor(0);
      doc.setFontSize(fontSize);
    }
    function checkPage(needed) {
      if (y + needed > ph - 18) {
        doc.addPage();
        y = mt;
      }
    }
    function sectionTitle(text) {
      checkPage(18);
      y += 4;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(31, 58, 40);
      doc.text(text, ml, y);
      y += 2;
      doc.setDrawColor(58, 157, 80);
      doc.setLineWidth(0.5);
      doc.line(ml, y, ml + cw, y);
      doc.setDrawColor(0);
      doc.setLineWidth(0.2);
      y += 6;
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0);
    }
    function subhead(t) {
      checkPage(9);
      y += 1;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(58, 157, 80);
      doc.text(t, ml, y);
      doc.setTextColor(0);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(fontSize);
      y += 5;
    }
    function para(str, opts) {
      opts = opts || {};
      var size = opts.size || 9;
      var lh = opts.lh || 4.4;
      doc.setFontSize(size);
      doc.setFont("helvetica", opts.bold ? "bold" : "normal");
      doc.setTextColor(opts.gray ? 110 : 0);
      var lines = doc.splitTextToSize(str, cw);
      checkPage(lines.length * lh + 2);
      doc.text(lines, ml, y);
      y += lines.length * lh + (opts.gap != null ? opts.gap : 2);
      doc.setTextColor(0);
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", "normal");
    }
    function labelValueAt(x, label, value, width) {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(110);
      doc.setFontSize(8);
      doc.text(label, x, y);
      doc.setFontSize(fontSize);
      doc.setTextColor(0);
      var localY = y + 4;
      var val = (value || "").toString();
      if (val) {
        var lines = doc.splitTextToSize(val, width - 3);
        doc.text(lines, x, localY);
        return localY + lines.length * lineH + 2;
      }
      doc.setDrawColor(205);
      doc.line(x, localY, x + width - 4, localY);
      doc.setDrawColor(0);
      return localY + lineH + 2;
    }
    function labelValue(label, value, width) {
      width = width || cw;
      checkPage(12);
      y = labelValueAt(ml, label, value, width);
    }
    function row3(l1, v1, l2, v2, l3, v3) {
      checkPage(12);
      var c = cw / 3, sY = y;
      var a = labelValueAt(ml, l1, v1, c);
      y = sY; var b = labelValueAt(ml + c, l2, v2, c);
      y = sY; var d = labelValueAt(ml + 2 * c, l3, v3, c);
      y = Math.max(a, b, d);
    }
    function row2(l1, v1, l2, v2) {
      checkPage(12);
      var c = cw / 2, sY = y;
      var a = labelValueAt(ml, l1, v1, c);
      y = sY; var b = labelValueAt(ml + c, l2, v2, c);
      y = Math.max(a, b);
    }
    function checkbox(label, checked, x, cy) {
      var bs = 4;
      var by = cy - bs + 0.5;
      doc.setDrawColor(110);
      doc.setLineWidth(0.2);
      doc.rect(x, by, bs, bs);
      if (checked) {
        doc.setDrawColor(58, 157, 80);
        doc.setLineWidth(0.6);
        var p = 0.8;
        doc.line(x + p, by + p, x + bs - p, by + bs - p);
        doc.line(x + p, by + bs - p, x + bs - p, by + p);
        doc.setLineWidth(0.2);
      }
      doc.setDrawColor(0);
      if (label) {
        doc.setFontSize(9);
        doc.text(label, x + bs + 2, cy);
        doc.setFontSize(fontSize);
      }
    }
    function cbRow(label, checked) {
      checkPage(7);
      checkbox(label, checked, ml, y);
      y += 7;
    }
    function qYesNo(qText, ans, hasDetail, detailVal) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(0);
      var lines = doc.splitTextToSize(qText, cw - 46);
      checkPage(Math.max(lines.length * 4.6, 6) + (hasDetail ? 8 : 0) + 3);
      doc.text(lines, ml, y);
      checkbox(L.no, ans === "nein", ml + cw - 42, y);
      checkbox(L.yes, ans === "ja", ml + cw - 16, y);
      y += Math.max(lines.length * 4.6, 6);
      if (hasDetail) {
        var dv = (detailVal || "").toString();
        if (dv) {
          doc.setFontSize(9);
          var dl = doc.splitTextToSize(dv, cw - 8);
          checkPage(dl.length * 4.4 + 4);
          doc.text(dl, ml + 4, y);
          y += dl.length * 4.4;
        } else {
          doc.setDrawColor(205);
          doc.line(ml + 4, y + 1, ml + cw - 4, y + 1);
          doc.setDrawColor(0);
          y += 4;
        }
        y += 3;
      }
      y += 3;
      doc.setFontSize(fontSize);
    }
    function cbDetail(label, checked, detLabel, detVal) {
      checkPage(7);
      checkbox(label, checked, ml, y);
      var dx = ml + 78;
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text(detLabel, dx, y);
      var lw = doc.getTextWidth(detLabel);
      doc.setTextColor(0);
      doc.setFontSize(9);
      var vx = dx + lw + 2;
      if (detVal) {
        doc.text(detVal.toString(), vx, y);
      } else {
        doc.setDrawColor(205);
        doc.line(vx, y + 0.5, ml + cw - 4, y + 0.5);
        doc.setDrawColor(0);
      }
      y += 7;
      doc.setFontSize(fontSize);
    }
    function consentBlock(text, checked) {
      var lines = doc.splitTextToSize(text, cw - 8);
      checkPage(lines.length * 4.4 + 5);
      checkbox("", checked, ml, y);
      doc.setFontSize(9);
      doc.setTextColor(0);
      doc.text(lines, ml + 8, y);
      y += Math.max(lines.length * 4.4, 5) + 2;
      doc.setFontSize(fontSize);
    }
    function signatureLine() {
      checkPage(14);
      y += 5;
      doc.setDrawColor(180);
      doc.line(ml, y, ml + 95, y);
      doc.setDrawColor(0);
      doc.setFontSize(7);
      doc.setTextColor(120);
      doc.text(L.sign, ml, y + 4);
      doc.setTextColor(0);
      doc.setFontSize(fontSize);
      y += 11;
    }

    // ---- Header ----
    var logoW = 14;
    var logoH = 14 * (1558 / 2096);
    var tx = ml;
    if (logoDataURL) {
      doc.addImage(logoDataURL, "PNG", ml, y - 2, logoW, logoH);
      tx = ml + logoW + 4;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(58, 157, 80);
    doc.text(HEADER.name, tx, y + 2);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(110);
    doc.setFontSize(7.5);
    doc.text(HEADER.address, tx, y + 6);
    doc.text(HEADER.phones, tx, y + 9.5);
    doc.text(HEADER.contact, tx, y + 13);
    doc.setTextColor(0);
    y += Math.max(logoH + 2, 22);

    // ---- Title + intro ----
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(31, 58, 40);
    var tLines = doc.splitTextToSize(L.welcome.title, cw);
    doc.text(tLines, ml, y);
    y += tLines.length * 7 + 2;
    doc.setTextColor(0);
    para(L.welcome.intro, { size: 9, gray: true, gap: 3 });

    // ---- Patient master data ----
    sectionTitle(L.masterTitle);
    subhead(L.masters.patient);
    row3(L.f.name, fd.patLast, L.f.vorname, fd.patFirst, L.f.birthPlace, fd.patBirth);
    subhead(L.masters.member);
    row3(L.f.name, fd.memLast, L.f.vorname, fd.memFirst, L.f.birth, fd.memBirth);
    subhead(L.masters.address);
    labelValue(L.f.street, fd.street);
    labelValue(L.f.plzOrt, fd.plzOrt);
    subhead(L.masters.phone);
    row3(L.f.telPrivat, fd.telPrivat, L.f.telMobil, fd.telMobil, L.f.telBeruf, fd.telBeruf);
    labelValue(L.f.email, fd.email);
    subhead(L.masters.occupation);
    row2(L.f.beruf, fd.beruf, L.f.arbeitgeber, fd.arbeitgeber);

    // ---- Insurance ----
    sectionTitle(L.masters.insurance);
    labelValue(L.f.kasse, fd.insuranceName);
    for (var ii = 0; ii < L.insuranceOptions.length; ii++) {
      var col = ii % 2;
      var cx = ml + col * (cw / 2);
      if (col === 0) checkPage(7);
      checkbox(L.insuranceOptions[ii], fd.insuranceType === ii, cx, y);
      if (col === 1 || ii === L.insuranceOptions.length - 1) y += 7;
    }
    y += 2;
    consentBlock(L.paymentNotice, !!fd.consentPayment);
    signatureLine();

    // ---- SMS consent ----
    sectionTitle(L.sms.heading);
    para(L.sms.sub, { size: 9, bold: true, gap: 2 });
    para(L.sms.body, { size: 9, gray: true, gap: 3 });
    consentBlock(L.sms.consent, !!fd.consentSMS);
    signatureLine();

    // ---- Health questions ----
    sectionTitle(L.health.title);
    para(L.health.eyebrow, { size: 8.5, gray: true, gap: 3 });
    for (var hi = 0; hi < L.healthQuestions.length; hi++) {
      var hq = L.healthQuestions[hi];
      var h = health[hi] || {};
      qYesNo(hq.q, h.a, hq.detail, h.detail);
    }

    // ---- Disease list ----
    para(L.disease.q, { size: 9.5, bold: true, gap: 1 });
    cbRow(L.disease.none, !!fd.diseaseNone);
    para(L.disease.hint, { size: 8, gray: true, gap: 2 });
    for (var di = 0; di < L.disease.list.length; di++) {
      checkPage(7);
      var d = diseases[di] || {};
      checkbox(L.disease.list[di], d.checked, ml, y);
      doc.setFontSize(7);
      doc.setTextColor(120);
      doc.text(L.disease.yearLabel + ":", ml + cw - 50, y);
      var ylw = doc.getTextWidth(L.disease.yearLabel + ":");
      doc.setTextColor(0);
      doc.setFontSize(9);
      var yvx = ml + cw - 50 + ylw + 2;
      if (d.year) doc.text(d.year.toString(), yvx, y);
      else { doc.setDrawColor(205); doc.line(yvx, y + 0.5, ml + cw - 4, y + 0.5); doc.setDrawColor(0); }
      y += 7;
    }
    doc.setFontSize(fontSize);
    y += 2;

    // ---- Further questions ----
    qYesNo(L.pregnancyQ, (fd.pregnancy || {}).a, true, (fd.pregnancy || {}).detail);
    qYesNo(L.orthoQ, (fd.ortho || {}).a, true, (fd.ortho || {}).a === "ja" ? L.orthoYes : "");
    qYesNo(L.perioQ, (fd.perio || {}).a, true, (fd.perio || {}).detail);
    qYesNo(L.complicationsQ, (fd.complications || {}).a, true, (fd.complications || {}).detail);
    qYesNo(L.accidentQ, (fd.accident || {}).a, true, (fd.accident || {}).detail);

    // ---- Teeth changes ----
    para(L.teethQ, { size: 9.5, bold: true, gap: 1 });
    cbRow(L.teethNone, !!fd.teethNone);
    for (var ti = 0; ti < L.teethOptions.length; ti++) {
      cbRow(L.teethOptions[ti], (teeth[ti] === true));
    }
    y += 2;

    qYesNo(L.jawQ, (fd.jawPain || {}).a, true, (fd.jawPain || {}).detail);
    qYesNo(L.xrayQ, (fd.xray || {}).a, true, (fd.xray || {}).detail);

    // ---- How did you hear about us ----
    para(L.heardQ, { size: 9.5, bold: true, gap: 2 });
    cbRow(L.heard.internet, !!heard.internet);
    cbDetail(L.heard.bekannt, !!heard.bekannt, L.heard.bekanntDetail, heard.bekanntDetail);
    cbRow(L.heard.schild, !!heard.schild);
    cbDetail(L.heard.arzt, !!heard.arzt, L.heard.arztDetail, heard.arztDetail);
    y += 2;

    // ---- Reminder service ----
    sectionTitle(L.service.heading);
    para(L.service.q, { size: 9, gray: true, gap: 2 });
    cbRow(L.service.optYes, !!fd.reminderService);

    // ---- Important notice ----
    sectionTitle(L.notice.heading);
    para(L.notice.body, { size: 9, gray: true, gap: 2 });
    para(L.notice.thanks, { size: 9, gray: true, gap: 2 });
    signatureLine();

    // ---- GDPR consent ----
    sectionTitle(L.dsgvo.heading);
    para(L.dsgvo.sub, { size: 8, bold: true, gap: 2 });
    consentBlock(L.dsgvo.body, !!fd.consentDSGVO);
    signatureLine();

    // Footer on all pages
    var pages = doc.getNumberOfPages();
    for (var p = 1; p <= pages; p++) {
      doc.setPage(p);
      drawFooter();
    }

    doc.save(L.filename);
  }

  // Blank: German uses the original scanned PDF file; English is generated.
  function downloadStaticPDF() {
    var a = document.createElement("a");
    a.href = "assets/Anamnesebogen.pdf";
    a.download = "Anamnesebogen.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function makeBlank() {
    return {
      patLast: "", patFirst: "", patBirth: "",
      memLast: "", memFirst: "", memBirth: "",
      street: "", plzOrt: "",
      telPrivat: "", telMobil: "", telBeruf: "", email: "",
      beruf: "", arbeitgeber: "",
      insuranceType: "", insuranceName: "",
      consentPayment: false, consentSMS: false, consentDSGVO: false,
      health: {}, diseaseNone: false, diseases: {},
      pregnancy: {}, ortho: {}, perio: {}, complications: {}, accident: {},
      teethNone: false, teeth: {},
      jawPain: {}, xray: {},
      heard: {}, reminderService: false,
      signDate: ""
    };
  }

  function generateBlankPDF(lang) {
    if (lang === "de") { downloadStaticPDF(); return; }
    generateAnamnesePDF(makeBlank(), lang);
  }

  window.ANAMNESE_CONTENT = CONTENT;
  window.generateAnamnesePDF = generateAnamnesePDF;
  window.generateBlankPDF = generateBlankPDF;
})();
