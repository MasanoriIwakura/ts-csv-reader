import path from "path";
import { processCsv, CsvRow } from "./csv-stream";

const filePath = path.resolve(__dirname, "sample.csv");

async function main() {
  await processCsv(filePath, async (row: CsvRow) => {
    console.log("処理中の行:", row);
  });

  console.log("すべての行を処理しました");
}

main().catch(console.error);
