import DatauriParser from "datauri/parser";
import path from "path";

const parser = new DatauriParser();

export const getDataUri = (file: Express.Multer.File) => {
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default getDataUri;
