import mongoose from "npm:mongoose@7.6.3";
import { Contactos } from "../types.ts";

const Schema = mongoose.Schema;

const contactoSchema = new Schema(
  {
    DNI: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    codpostal: { type: Number, required: true},
    ISO: { type: String, required: false },
  },
  { timestamps: false }
);

export type ContactosModelType = mongoose.Document & Omit<Contactos, "id">;

export default mongoose.model<ContactosModelType>("Contactos", contactoSchema);
