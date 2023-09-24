import { readFile, writeFile } from "fs/promises";
import path from "path";

export async function getLocalData() {
  // Get the path of the json file
  const filePath = path.join(process.cwd(), "src/json/data.json");
  // Read the json file
  const jsonData = await readFile(filePath, "utf8");
  // Parse data as json
  const objectData = JSON.parse(jsonData);

  return objectData;
}

export async function addLocalData(recipe) {
  try {
    // Get the path of the JSON file
    const filePath = path.join(process.cwd(), "src/json/data.json");

    // Read the JSON file
    const jsonData = await readFile(filePath, "utf8");

    // Parse data as JSON
    const objectData = JSON.parse(jsonData);

    // Add the new recipe to the data
    objectData.push(recipe); // 新しいrecipeを配列の最後に追加

    // Convert the updated data back to JSON
    const updatedJsonData = JSON.stringify(objectData, null, 2);

    // Write the updated JSON data back to the file
    await writeFile(filePath, updatedJsonData, "utf8");

    // Return the updated data
    return objectData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
