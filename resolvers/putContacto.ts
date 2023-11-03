import { Request, Response } from "npm:express@4.18.2";
import contactos from "../db/contactos.ts";

const putContacto = async (req: Request, res: Response) => {
  try {
    const { DNI } = req.params;
    const { name, email, codpostal, ISO  } = req.body;
    if (!name || !email || !codpostal || !ISO) {
      res.status(400).send("Name and age are required");
      return;
    }

    const updatedPerson = await contactos.findOneAndUpdate(
      { DNI },
      { name, email, codpostal, ISO },
      { new: true }
    ).exec();

    if (!updatedPerson) {
      res.status(404).send("Person not found");
      return;
    }

    res.status(200).send({
        name: updatedPerson.name,
        email: updatedPerson.email,
        codpostal: updatedPerson.codpostal,
        ISO : updatedPerson.ISO,
        id: updatedPerson._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default putContacto;