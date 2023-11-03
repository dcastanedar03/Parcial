import { Request, Response } from "npm:express@4.18.2";
import contactos from "../db/contactos.ts";

const posContacto = async (req: Request, res: Response) => {
  try {
    const { DNI, name, email, codpostal, ISO } = req.body;
    if (!DNI || !name || !email || !codpostal || !ISO) {
      res.status(500).send("DNI, name, email, codpostal and ISO are required");
      return;
    }

    const alreadyExists = await contactos.findOne({ DNI }).exec();
    if (alreadyExists) {
      res.status(400).send("Person already exists");
      return;
    }

    const newPerson = new contactos({ DNI, name, email, codpostal, ISO });
    await newPerson.save();

    res.status(200).send({
      DNI: newPerson.DNI,
      name: newPerson.name,
      email: newPerson.email,
      codpostal: newPerson.codpostal,
      ISO : newPerson.ISO,
      id: newPerson._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default posContacto;