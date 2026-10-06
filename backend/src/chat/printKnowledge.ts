import { getKnowledge, getProjectDetail } from "./knowledge.js";
import prisma from "../config/database.js";

async function main() {
  console.log("================================================================================");
  console.log("                  RAHUL PORTFOLIO - AI CHAT KNOWLEDGE PACK                      ");
  console.log("================================================================================\n");

  const pack = await getKnowledge();
  console.log(pack.plainText);

  console.log("\n================================================================================");
  console.log(`Knowledge Pack Length: ${pack.plainText.length} characters (~${Math.round(pack.plainText.length / 4)} tokens)`);
  console.log(`Total Projects: ${pack.structured.projects.length}`);
  console.log(`Total Skills: ${pack.structured.skills.length}`);
  console.log(`Total Education Entries: ${pack.structured.education.length}`);
  console.log(`Total Timeline Events: ${pack.structured.timeline.length}`);
  console.log("================================================================================\n");

  // Quick tests for getProjectDetail
  console.log("=== Testing getProjectDetail() ===");
  const test1 = await getProjectDetail("Tell me about ABIT EventHub");
  console.log(`- Query "Tell me about ABIT EventHub": ${test1 ? `MATCHED (${test1.length} chars)` : "NOT FOUND"}`);

  const test2 = await getProjectDetail("What do you build with Python?");
  console.log(`- Query "What do you build with Python?": ${test2 ? `MATCHED (${test2.length} chars)` : "NOT FOUND"}`);

  const test3 = await getProjectDetail("What is the weather today?");
  console.log(`- Query "What is the weather today?": ${test3 ? `MATCHED (${test3.length} chars)` : "NULL (Expected)"}`);
}

main()
  .catch((e) => {
    console.error("Failed to print knowledge pack:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
