const admin = require("firebase-admin");
const xlsx = require("xlsx");
const path = require("path");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const workbook = xlsx.readFile(path.join(__dirname, "mekhi_FINAL_with_truth_detection.xlsx"));

async function run() {

  // ── 1. Questions (520 rows) ──────────────────────────────────────────────────
  const questionRows = xlsx.utils.sheet_to_json(workbook.Sheets["Questions"], { defval: "" });
  console.log("Questions rows:", questionRows.length);

  let batch1 = db.batch();
  let batchCount = 0;
  let totalWritten = 0;
  for (let i = 0; i < questionRows.length; i++) {
    const row = questionRows[i];
    const ref = db.collection("questionBanks").doc("mekhi").collection("questions").doc(String(row.ID || `q_${i + 1}`));
    batch1.set(ref, { ...row, importIndex: i + 1, importedAt: new Date().toISOString() });
    batchCount++;
    if (batchCount === 400) {
      await batch1.commit();
      totalWritten += batchCount;
      console.log(`  committed ${totalWritten} questions`);
      batch1 = db.batch();
      batchCount = 0;
    }
  }
  if (batchCount > 0) {
    await batch1.commit();
    totalWritten += batchCount;
  }
  console.log("✓ All questions written:", totalWritten);

  // ── 2. Section map ───────────────────────────────────────────────────────────
  const sectionRows = xlsx.utils.sheet_to_json(workbook.Sheets["Section_Map"], { defval: "" });
  const sectionBatch = db.batch();
  sectionRows.forEach((row, i) => {
    const ref = db.collection("questionBanks").doc("mekhi").collection("sectionMap").doc(`section_${i + 1}`);
    sectionBatch.set(ref, { ...row, importedAt: new Date().toISOString() });
  });
  await sectionBatch.commit();
  console.log("✓ Section map written:", sectionRows.length);

  // ── 3. Scoring framework ─────────────────────────────────────────────────────
  const scoringRows = xlsx.utils.sheet_to_json(workbook.Sheets["Scoring_Framework"], { defval: "" });
  const scoringBatch = db.batch();
  scoringRows.forEach((row, i) => {
    const ref = db.collection("questionBanks").doc("mekhi").collection("scoringFramework").doc(`dim_${i + 1}`);
    scoringBatch.set(ref, { ...row, importedAt: new Date().toISOString() });
  });
  await scoringBatch.commit();
  console.log("✓ Scoring framework written:", scoringRows.length);

  // ── 4. Contradiction checks ──────────────────────────────────────────────────
  const contraRows = xlsx.utils.sheet_to_json(workbook.Sheets["Contradiction_Checks"], { defval: "" });
  const contraBatch = db.batch();
  contraRows.forEach((row, i) => {
    const ref = db.collection("questionBanks").doc("mekhi").collection("contradictionChecks").doc(`check_${i + 1}`);
    contraBatch.set(ref, { ...row, importedAt: new Date().toISOString() });
  });
  await contraBatch.commit();
  console.log("✓ Contradiction checks written:", contraRows.length);

  console.log("\n✓ IMPORT COMPLETE");
  console.log("Firebase path: questionBanks/mekhi/questions/[ID]");
}

run().catch(console.error);
