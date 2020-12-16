import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Address } from "../../database/entity/Address";

class AddressContact {

    async index(req: Request, res: Response) {
        try {
            const { id } = req.params
            const addressRepository = getRepository(Address);

            const address = await addressRepository.findOne(id);

            if (!Address) {
                return res.status(404).json("Not Found!");
            }

            return res.json(address)

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async showAll(req: Request, res: Response) {
        try {
            const addressRepository = getRepository(Address);

            const findAddress = await addressRepository.find();

            return res.json(findAddress)

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async create(req: Request, res: Response) {
        const { data } = req.body;
        try {
            const addressRepository = getRepository(Address);

            const address = addressRepository.create(data);

            const newEmails = await addressRepository.save(address);
            return res.json(newEmails);

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { data } = req.body;
            const { id } = req.params;
            const addressRepository = getRepository(Address);

            const findAddress = await addressRepository.findOne(id);

            if (!findAddress) {
                return res.status(404).json("Not Found!");
            }

            return res.json(await addressRepository.update(
                id,
                {
                    ...findAddress,
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
            const addressRepository = getRepository(Address);

            let findAddress = await addressRepository.findOne(id);

            if (!findAddress) {
                return res.status(404).json("Not Found!");
            }

            const address = await addressRepository.delete(id);


            return res.json({
                message: `Deleted ${address.affected} itens`,
            });

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default new AddressContact()