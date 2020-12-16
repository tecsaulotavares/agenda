import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { hashSync, compareSync, genSaltSync } from "bcryptjs";

import { User } from "../../database/entity/User";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";

class UserController {

    //Falta implementar o token JWT
    async auth(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const userRepository = getRepository(User);
            const findUser = await userRepository.find({ where: { username: username } });
            const salt = genSaltSync(10);

            if (!findUser || findUser.length === 0) {
                return res.status(404).json("User not found!");
            }

            if (!(compareSync(password, findUser[0].password))) {
                return res.status(403).json("Password invalid!");
            }

            return res.json({ ...findUser[0], password: "not available" });

        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async index(req: Request, res: Response) {
        try {
            const { id } = req.params
            const userRepository = getRepository(User);

            const user = await userRepository.findOne(id);

            if (!user) {
                return res.status(404).json("Not Found!");
            }

            return res.json(user)

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async showAll(req: Request, res: Response) {
        try {
            const userRepository = getRepository(User);

            const user = await userRepository.find();

            const findUser = user.map(item => ({ ...item, password: "not available" }))

            return res.json(findUser)

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async create(req: Request, res: Response) {
        const { data } = req.body;
        const salt = genSaltSync(10);


        try {
            const userRepository = getRepository(User);

            const user = userRepository.create(data);

            const newUser = await userRepository.save(user);



            return res.json(newUser);

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { data } = req.body;
            const { id } = req.params;
            const salt = genSaltSync(10);
            const userRepository = getRepository(User);

            const findUser = await userRepository.findOne(id);

            if (!findUser) {
                return res.status(404).json("Not Found!");
            }

            return res.json(await userRepository.update(
                id,
                {
                    ...findUser,
                    ...data,
                    password: hashSync(data.password, salt)
                }
            ));

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userRepository = getRepository(User);

            let findUser = await userRepository.findOne(id);

            if (!findUser) {
                return res.status(404).json("Not Found!");
            }

            const user = await userRepository.softDelete(id);

            return res.json({
                message: `Deleted ${user.affected} itens`,
            });

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default new UserController()