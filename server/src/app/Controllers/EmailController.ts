import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Emails } from "../../database/entity/Emails";

class EmailContact {

    async index(req: Request, res: Response) {
        try {
            const { id } = req.params
            const emailsRepository = getRepository(Emails);

            const email = await emailsRepository.findOne(id);

            if (!email) {
                return res.status(404).json("Not Found!");
            }

            return res.json(email)

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async showAll(req: Request, res: Response) {
        try {
            const emailsRepository = getRepository(Emails);

            const findEmails = await emailsRepository.find();

            return res.json(findEmails)

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async create(req: Request, res: Response) {
        const { data } = req.body;
        try {
            const emailsRepository = getRepository(Emails);

            const email = emailsRepository.create(data);

            const newEmails = await emailsRepository.save(email);
            return res.json(newEmails);

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { data } = req.body;
            const { id } = req.params;
            const emailsRepository = getRepository(Emails);

            const findEmails = await emailsRepository.findOne(id);

            if (!findEmails) {
                return res.status(404).json("Not Found!");
            }

            return res.json(await emailsRepository.update(
                id,
                {
                    ...findEmails,
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
            const emailsRepository = getRepository(Emails);

            let findEmails = await emailsRepository.findOne(id);

            if (!findEmails) {
                return res.status(404).json("Not Found!");
            }

            const email = await emailsRepository.delete(id);


            return res.json({
                message: `Deleted ${email.affected} itens`,
            });

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default new EmailContact()