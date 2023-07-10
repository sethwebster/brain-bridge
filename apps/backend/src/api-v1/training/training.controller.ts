// //import * as bcrypt from 'bcrypt';
// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import { createTrainingIndex } from "../../lib/training";
// import invariant from "tiny-invariant";

// const prisma = new PrismaClient();

// export default class TrainingController {
//   public train = async(req: Request, res: Response): Promise<any> => {
//     const prisma = new PrismaClient();
//     const set = await prisma.trainingSet.findUnique({
//       where: { id: req.params.id }, include: {
//         conversations: true,
//         trainingSources: true,
//         questionsAndAnswers: true,
//         missedQuestions: true,
//       }
//     });
//     invariant(set, "Training set not found");
//     try {
//     } catch (error: any) {
//       console.log("ERROR", error)
//       res.json({error})
//     }

//   }
// }
