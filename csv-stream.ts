import * as fs from "fs";
import csv from "csv-parser";

export type CsvRow = Record<string, string>;

/**
 * CSVファイルを1行ずつ処理する関数
 * @param filePath - CSVファイルのパス
 * @param onRow - 各行に対する処理関数（同期 or 非同期）
 */
export async function processCsv(
  filePath: string,
  onRow: (row: CsvRow) => void | Promise<void>
): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath);
    const parser = csv();

    stream
      .pipe(parser)
      .on("data", async (row: CsvRow) => {
        try {
          await onRow(row);
        } catch (err) {
          reject(err);
        }
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
