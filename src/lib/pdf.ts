import { jsPDF } from "jspdf";
import type { Protocol } from "@/data/content";

export function exportProtocolPDF(p: Protocol) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const width = doc.internal.pageSize.getWidth() - margin * 2;
  let y = margin;

  const addLine = (text: string, size = 11, bold = false, color: [number, number, number] = [30, 41, 59]) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, width);
    if (y + lines.length * size > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(lines, margin, y);
    y += lines.length * (size + 2);
  };

  // Header
  doc.setFillColor(14, 116, 144);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 70, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("NÉOFICHES — Fiche technique standardisée", margin, 28);
  doc.setFontSize(16);
  doc.text(p.title, margin, 52);
  y = 96;

  addLine(`${p.category}  •  Niveau ${p.level}  •  Durée ${p.duration}`, 10, false, [100, 116, 139]);
  y += 6;

  const section = (title: string, items: string[]) => {
    addLine(title, 12, true, [14, 116, 144]);
    items.forEach((it) => addLine(`• ${it}`));
    y += 6;
  };

  addLine("Définition", 12, true, [14, 116, 144]);
  addLine(p.definition);
  y += 6;

  section("Objectifs", p.objectives);
  section("Indications", p.indications);
  section("Contre-indications", p.contreIndications);
  section("Matériel", p.materiel);

  addLine("Étapes procédurales", 12, true, [14, 116, 144]);
  p.etapes.forEach((e, i) => {
    addLine(`${i + 1}. ${e.titre}`, 11, true);
    addLine(e.detail);
  });
  y += 6;

  section("Précautions", p.precautions);
  section("Surveillance", p.surveillance);
  section("Complications potentielles", p.complications);
  section("Critères de qualité", p.criteresQualite);
  section("Références", p.references);

  doc.save(`${p.id}.pdf`);
}
