import { generateScript } from "./services/scriptService.js";
import dotenv from "dotenv";

dotenv.config();

const test = async () => {
  const script = await generateScript(
    "Backend Development",
    "LU14",
    "Implemented a POST API endpoint to create books and store them in MongoDB using Express and Mongoose."
  );

  console.log(script);
};

test();