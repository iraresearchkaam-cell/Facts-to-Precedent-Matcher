import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";
import { extractTextFromPDF } from "../src/lib/pdf";

async function runUnitTests() {
  console.log("Running Unit Tests...");
  console.log("-------------------");
  
  // Test PDF Extraction
  const pdfPath = path.resolve(__dirname, "../test_file.pdf");
  if (!fs.existsSync(pdfPath)) {
    throw new Error(`Test file not found at ${pdfPath}`);
  }
  
  const buffer = fs.readFileSync(pdfPath);
  const text = await extractTextFromPDF(buffer);
  
  assert(text && text.trim().length > 0, "PDF text extraction failed: no text returned");
  console.log("✅ extractTextFromPDF: successfully extracted text");
}

async function runIntegrationTests() {
  console.log("\nRunning Integration Tests...");
  console.log("-------------------------");
  
  const pdfPath = path.resolve(__dirname, "../test_file.pdf");
  const form = new FormData();
  
  // We simulate a multipart form data upload equivalent to what the browser would send
  // Note: in Node natively we use fetch with built-in or specialized form data
  
  // Actually, since Next.js server is running on port 3020, let's just use `fetch` and a Blob
  const fileBuffer = fs.readFileSync(pdfPath);
  const fileBlob = new Blob([fileBuffer], { type: "application/pdf" });
  form.append("file", fileBlob, "test_file.pdf");
  
  const response = await fetch("http://localhost:3020/api/analyze", {
    method: "POST",
    body: form,
  });
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP Error ${response.status}: ${text}`);
  }
  
  const data = await response.json();
  assert(data.extractedFacts, "No extracted facts were returned");
  assert(data.precedents && data.precedents.length > 0, "No precedents were returned");
  assert(data.comparisonMemo, "No comparison memo was returned");
  
  console.log("✅ POST /api/analyze: successfully analyzed PDF, extracted facts, and generated memo");
  console.log("\nSample Response Highlights:");
  console.log("- Core Conflict:", data.extractedFacts.coreConflict);
  console.log("- Precedents Found:", data.precedents.length);
}

async function main() {
  try {
    await runUnitTests();
    await runIntegrationTests();
    console.log("\n🎉 All tests passed successfully!");
  } catch (err) {
    console.error("\n❌ Test Failed:", err);
    process.exit(1);
  }
}

main();
