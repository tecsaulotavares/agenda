import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Phones } from "../../database/entity/Phones";

class PhoneContact {

    async index(req: Request, res: Response) {
        try {
            const { id } = req.params
            const phonesRepository = getRepository(Phones);

            const phones = await phonesRepository.findOne(id);

            if (!phones) {
                return res.status(404).json("Not Found!");
            }

            return res.json(phones)

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async showAll(req: Request, res: Response) {
        try {
            const phonesRepository = getRepository(Phones);

            const findphones = await phonesRepository.find();

            return res.json(findphones)

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async create(req: Request, res: Response) {
        const { data } = req.body;
        try {
            const phonesRepository = getRepository(Phones);

            const phones = phonesRepository.create(data);

            const newphones = await phonesRepository.save(phones);
            return res.json(newphones);

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { data } = req.body;
            const { id } = req.params;
            const phonesRepository = getRepository(Phones);

            const findphones = await phonesRepository.findOne(id);

            if (!findphones) {
                return res.status(404).json("Not Found!");
            }

            return res.json(await phonesRepository.update(
                id,
                {
                    ...findphones,
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
            const phonesRepository = getRepository(Phones);

            let findphones = await phonesRepository.findOne(id);

            if (!findphones) {
                return res.status(404).json("Not Found!");
            }

            const phones = await phonesRepository.delete(id);


            return res.json({
                message: `Deleted ${phones.affected} itens`,
            });

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default new PhoneContact()