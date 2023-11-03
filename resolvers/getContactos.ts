import { Request, Response } from "npm:express@4.18.2";
import contactos from "../db/contactos.ts";

const getPerson = async (req: Request, res: Response) => {
  try {
    const contacto = await contactos.find({}).exec();
    const Personas = contacto.map(i =>{const b = []; b.push(i.name);b.push(i.DNI);return b;})
    res.status(200).send({
        Personas

    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getPerson;