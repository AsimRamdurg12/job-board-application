import multer from "multer";

const storage = multer.memoryStorage(); // Stores files in memory
export const upload = multer({ storage });
