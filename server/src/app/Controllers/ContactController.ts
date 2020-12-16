import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Contacts } from "../../database/entity/Contacts";

class ContactController {

    async index(req: Request, res: Response) {
        try {
            const { id } = req.params
            const contactsRepository = getRepository(Contacts);

            const contacts = await contactsRepository.findOne(id);

            if (!contacts) {
                return res.status(404).json("Not Found!");
            }

            return res.json(contacts)

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async showAll(req: Request, res: Response) {
        try {
            const contactsRepository = getRepository(Contacts);

            const findcontacts = await contactsRepository.find({ relations: ["phones", "emails"] });

            return res.json(findcontacts)

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async create(req: Request, res: Response) {
        const { data } = req.body;
        try {
            const contactsRepository = getRepository(Contacts);

            const contacts = contactsRepository.create(data);

            const newcontacts = await contactsRepository.save(contacts);
            return res.json(newcontacts);

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { data } = req.body;
            const { id } = req.params;
            const contactsRepository = getRepository(Contacts);

            const findcontacts = await contactsRepository.findOne(id);

            if (!findcontacts) {
                return res.status(404).json("Not Found!");
            }

            return res.json(await contactsRepository.update(
                id,
                {
                    ...findcontacts,
                    ...data
                }
            ));

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const contactsRepository = getRepository(Contacts);

            let findcontacts = await contactsRepository.findOne(id);

            if (!findcontacts) {
                return res.status(404).json("Not Found!");
            }

            const contacts = await contactsRepository.delete(id);

            console.log(contacts);


            return res.json({
                message: `Deleted ${contacts.affected} itens`,
            });

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default new ContactController()