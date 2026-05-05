// AnamnesePDF — generates filled or blank Anamnesebogen PDF via jsPDF
// No React hooks — pure function, loaded as text/babel for JSX compat but uses no JSX

(function() {
  const LABELS_DE = {
    title: "Anamnesebogen",
    subtitle: "Bitte bringen Sie diesen Bogen ausgefüllt zum ersten Termin mit.",
    personal: "Persönliche Daten",
    lastName: "Nachname",
    firstName: "Vorname",
    birthDate: "Geburtsdatum",
    street: "Straße + Hausnr.",
    zip: "PLZ",
    city: "Ort",
    phone: "Telefon",
    email: "E-Mail",
    insurance: "Versicherung",
    insuranceType: "Versicherungsart",
    public: "Gesetzlich",
    private: "Privat",
    selfPay: "Selbstzahler",
    insuranceName: "Krankenkasse",
    conditions: "Allgemeinerkrankungen",
    conditionsIntro: "Bitte kreuzen Sie an, welche Erkrankungen bei Ihnen bekannt sind:",
    conditionsList: [
      "Herz-Kreislauf-Erkrankungen", "Bluthochdruck", "Diabetes",
      "Blutungsneigung / Blutverdünner", "Hepatitis / HIV", "Rheuma",
      "Osteoporose", "Schilddrüsenerkrankungen", "Epilepsie",
      "Asthma / Atemwegserkrankungen", "Magen-Darm-Erkrankungen",
      "Leber- / Nierenerkrankungen", "Psychische Erkrankungen",
      "Schlaganfall", "Tumor / Bestrahlung"
    ],
    medications: "Medikamente",
    medicationsQ: "Welche Medikamente nehmen Sie regelmäßig ein?",
    allergies: "Allergien / Unverträglichkeiten",
    allergyList: ["Penicillin", "Latex", "Betäubungsmittel", "Sonstige"],
    allergyOther: "Sonstige (bitte angeben)",
    women: "Für Frauen",
    pregnant: "Schwangerschaft",
    nursing: "Stillzeit",
    dental: "Zahnärztliche Angaben",
    lastVisit: "Letzter Zahnarztbesuch",
    visitReason: "Grund des heutigen Besuchs",
    specialWishes: "Besondere Probleme / Wünsche",
    other: "Sonstiges",
    signature: "Unterschrift",
    place: "Ort",
    date: "Datum",
    signName: "Name (digitale Unterschrift)",
    consent: "Ich bestätige die Richtigkeit der obigen Angaben.",
    footer: "Praxisgemeinschaft Dr. Hancock-Diener & Dr. Jahn · Friedrichstraße 33 · 80801 München"
  };

  const LABELS_EN = {
    title: "Medical History Form",
    subtitle: "Please fill out this form and bring it to your first appointment.",
    personal: "Personal Information",
    lastName: "Last Name",
    firstName: "First Name",
    birthDate: "Date of Birth",
    street: "Street + No.",
    zip: "Postal Code",
    city: "City",
    phone: "Phone",
    email: "Email",
    insurance: "Insurance",
    insuranceType: "Insurance Type",
    public: "Public",
    private: "Private",
    selfPay: "Self-Pay",
    insuranceName: "Insurance Provider",
    conditions: "Medical Conditions",
    conditionsIntro: "Please check any conditions that apply to you:",
    conditionsList: [
      "Cardiovascular disease", "High blood pressure", "Diabetes",
      "Bleeding tendency / Blood thinners", "Hepatitis / HIV", "Rheumatism",
      "Osteoporosis", "Thyroid disorders", "Epilepsy",
      "Asthma / Respiratory diseases", "Gastrointestinal diseases",
      "Liver / Kidney diseases", "Mental health conditions",
      "Stroke", "Tumor / Radiation therapy"
    ],
    medications: "Medications",
    medicationsQ: "Which medications do you take regularly?",
    allergies: "Allergies / Intolerances",
    allergyList: ["Penicillin", "Latex", "Anesthetics", "Other"],
    allergyOther: "Other (please specify)",
    women: "For Women",
    pregnant: "Pregnancy",
    nursing: "Breastfeeding",
    dental: "Dental Information",
    lastVisit: "Last dental visit",
    visitReason: "Reason for today's visit",
    specialWishes: "Special concerns / wishes",
    other: "Other",
    signature: "Signature",
    place: "Place",
    date: "Date",
    signName: "Name (digital signature)",
    consent: "I confirm that the above information is correct.",
    footer: "Praxisgemeinschaft Dr. Hancock-Diener & Dr. Jahn · Friedrichstr. 33 · 80801 Munich"
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
      _buildPDF(formData, lang, logoDataURL);
    });
  }

  function _buildPDF(formData, lang, logoDataURL) {
    var labels = lang === "en" ? LABELS_EN : LABELS_DE;
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ unit: "mm", format: "a4" });
    var pw = 210, ph = 297;
    var ml = 20, mr = 20, mt = 20;
    var cw = pw - ml - mr;
    var y = mt;
    var fontSize = 10;
    var lineH = 5.5;

    function checkPage(needed) {
      if (y + needed > ph - 25) {
        doc.addPage();
        y = mt;
        drawFooter();
      }
    }

    function drawFooter() {
      doc.setFontSize(7);
      doc.setTextColor(140);
      doc.text(labels.footer, pw / 2, ph - 10, { align: "center" });
      doc.setTextColor(0);
      doc.setFontSize(fontSize);
    }

    function sectionTitle(text) {
      checkPage(16);
      y += 4;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
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
    }

    function labelValue(label, value, width) {
      width = width || cw;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      doc.setFontSize(8);
      doc.text(label, ml, y);
      doc.setFontSize(fontSize);
      doc.setTextColor(0);
      y += 4;
      var val = (value || "").toString();
      if (val) {
        var lines = doc.splitTextToSize(val, width - 2);
        doc.text(lines, ml, y);
        y += lines.length * lineH;
      } else {
        doc.setDrawColor(200);
        doc.line(ml, y, ml + width - 4, y);
        doc.setDrawColor(0);
        y += 2;
      }
      y += 2;
    }

    function labelValueAt(x, label, value, width) {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      doc.setFontSize(8);
      doc.text(label, x, y);
      doc.setFontSize(fontSize);
      doc.setTextColor(0);
      var savedY = y;
      var localY = y + 4;
      var val = (value || "").toString();
      if (val) {
        doc.text(val, x, localY);
      } else {
        doc.setDrawColor(200);
        doc.line(x, localY, x + width - 4, localY);
        doc.setDrawColor(0);
      }
      return localY + lineH + 2;
    }

    function checkbox(label, checked, x, currentY) {
      var boxSize = 4;
      var bx = x;
      var by = currentY - boxSize + 0.5;
      doc.setDrawColor(100);
      doc.setLineWidth(0.2);
      doc.rect(bx, by, boxSize, boxSize);
      if (checked) {
        doc.setDrawColor(58, 157, 80);
        doc.setLineWidth(0.6);
        var p = 0.8;
        doc.line(bx + p, by + p, bx + boxSize - p, by + boxSize - p);
        doc.line(bx + p, by + boxSize - p, bx + boxSize - p, by + p);
        doc.setLineWidth(0.2);
      }
      doc.setDrawColor(0);
      doc.setFontSize(9);
      doc.text(label, x + boxSize + 2, currentY);
      doc.setFontSize(fontSize);
    }

    // --- Header with Logo ---
    var logoW = 14;
    var logoH = 14 * (1558 / 2096); // preserve aspect ratio
    var textOffsetX = ml;
    if (logoDataURL) {
      doc.addImage(logoDataURL, "PNG", ml, y - 2, logoW, logoH);
      textOffsetX = ml + logoW + 4;
    }
    doc.setFontSize(9);
    doc.setTextColor(58, 157, 80);
    doc.setFont("helvetica", "bold");
    doc.text("Praxisgemeinschaft Dr. Hancock-Diener & Dr. Jahn", textOffsetX, y + 2);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.setFontSize(8);
    doc.text("Friedrichstraße 33 · 80801 München · Tel. 089 38 80 86 87 / 089 38 88 95 00", textOffsetX, y + 6);
    y += Math.max(logoH + 2, 12);

    // --- Title ---
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(31, 58, 40);
    doc.text(labels.title, ml, y);
    y += 6;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(labels.subtitle, ml, y);
    doc.setTextColor(0);
    y += 10;

    doc.setFontSize(fontSize);

    // --- Section 1: Personal ---
    sectionTitle(labels.personal);
    checkPage(24);
    var colW = cw / 2;
    var y1 = labelValueAt(ml, labels.lastName, formData.lastName, colW);
    var y2 = labelValueAt(ml + colW, labels.firstName, formData.firstName, colW);
    y = Math.max(y1, y2);

    checkPage(10);
    labelValue(labels.birthDate, formData.birthDate, cw);

    checkPage(18);
    var col3 = cw / 3;
    var startY = y;
    y1 = labelValueAt(ml, labels.street, formData.street, col3 * 1.5);
    y = startY;
    y2 = labelValueAt(ml + col3 * 1.5, labels.zip, formData.zip, col3 * 0.5);
    y = startY;
    var y3 = labelValueAt(ml + col3 * 2, labels.city, formData.city, col3);
    y = Math.max(y1, y2, y3);

    checkPage(10);
    startY = y;
    y1 = labelValueAt(ml, labels.phone, formData.phone, colW);
    y = startY;
    y2 = labelValueAt(ml + colW, labels.email, formData.email, colW);
    y = Math.max(y1, y2);

    // --- Section 2: Insurance ---
    sectionTitle(labels.insurance);
    checkPage(14);
    var types = [
      { key: "public", label: labels.public },
      { key: "private", label: labels.private },
      { key: "selfpay", label: labels.selfPay }
    ];
    var ix = ml;
    types.forEach(function(t) {
      checkbox(t.label, formData.insuranceType === t.key, ix, y);
      ix += 45;
    });
    y += 8;
    labelValue(labels.insuranceName, formData.insuranceName);

    // --- Section 3: Conditions ---
    sectionTitle(labels.conditions);
    checkPage(8);
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(labels.conditionsIntro, ml, y);
    doc.setTextColor(0);
    doc.setFontSize(fontSize);
    y += 6;

    var condPerCol = Math.ceil(labels.conditionsList.length / 2);
    var condData = formData.conditions || {};
    for (var ci = 0; ci < labels.conditionsList.length; ci++) {
      if (ci % 2 === 0) checkPage(7);
      var col = ci % 2;
      var cx = ml + col * (cw / 2);
      checkbox(labels.conditionsList[ci], condData[ci], cx, y);
      if (col === 1 || ci === labels.conditionsList.length - 1) y += 7;
    }

    // --- Section 4: Medications ---
    sectionTitle(labels.medications);
    labelValue(labels.medicationsQ, formData.medications);

    // --- Section 5: Allergies ---
    sectionTitle(labels.allergies);
    checkPage(14);
    var allergyData = formData.allergies || {};
    var ax = ml;
    labels.allergyList.forEach(function(a, i) {
      checkbox(a, allergyData[i], ax, y);
      ax += 40;
      if (ax > ml + cw - 20) { ax = ml; y += 7; }
    });
    y += 8;
    if (allergyData.other) {
      labelValue(labels.allergyOther, allergyData.otherText);
    }

    // --- Section 6: Women ---
    sectionTitle(labels.women);
    checkPage(10);
    checkbox(labels.pregnant, formData.pregnant, ml, y);
    checkbox(labels.nursing, formData.nursing, ml + cw / 2, y);
    y += 8;

    // --- Section 7: Dental ---
    sectionTitle(labels.dental);
    labelValue(labels.lastVisit, formData.lastVisit);
    labelValue(labels.visitReason, formData.visitReason);
    labelValue(labels.specialWishes, formData.specialWishes);

    // --- Section 8: Other ---
    sectionTitle(labels.other);
    labelValue("", formData.other);

    // --- Section 9: Signature ---
    sectionTitle(labels.signature);
    checkPage(30);
    startY = y;
    y1 = labelValueAt(ml, labels.place + ", " + labels.date, formData.signDate, colW);
    y = startY;
    // Always leave blank line for handwritten signature
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.setFontSize(8);
    doc.text(lang === "en" ? "Signature" : "Unterschrift", ml + colW, y);
    doc.setFontSize(fontSize);
    doc.setTextColor(0);
    y = Math.max(y1, y + 4) + 2;
    // Signature line
    doc.setDrawColor(200);
    doc.line(ml + colW, y, ml + colW + colW - 4, y);
    doc.setDrawColor(0);
    y += 8;

    checkPage(8);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(labels.consent, ml, y);
    doc.setTextColor(0);

    // Footer on all pages
    var pages = doc.getNumberOfPages();
    for (var p = 1; p <= pages; p++) {
      doc.setPage(p);
      drawFooter();
    }

    var filename = lang === "en" ? "Medical-History-Form.pdf" : "Anamnesebogen.pdf";
    doc.save(filename);
  }

  function generateBlankPDF(lang) {
    generateAnamnesePDF({
      lastName: "", firstName: "", birthDate: "", street: "", zip: "", city: "",
      phone: "", email: "", insuranceType: "", insuranceName: "",
      conditions: {}, medications: "", allergies: {}, pregnant: false, nursing: false,
      lastVisit: "", visitReason: "", specialWishes: "", other: "",
      signDate: "", signName: ""
    }, lang);
  }

  window.generateAnamnesePDF = generateAnamnesePDF;
  window.generateBlankPDF = generateBlankPDF;
})();
