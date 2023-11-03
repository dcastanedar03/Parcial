import { Request, Response } from "npm:express@4.18.2";
import contactos from "../db/contactos.ts";

const deleteContacto = async (req: Request, res: Response) => {
  try {
    const { DNI } = req.params;
    const person = await contactos.findOneAndDelete({ DNI : DNI}).exec();
    if (!person) {
      res.status(404).send("Person not found");
      return;
    }
    res.status(200).send("Person deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteContacto;