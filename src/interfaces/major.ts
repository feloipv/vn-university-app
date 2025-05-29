import { IMajor } from "@/schemas/major";
import { IGetTrainingFieldById } from "./trainingField";

export interface IGetMajorById extends Omit<IMajor, "trainingFieldIds"> {
  trainingFieldIds?: IGetTrainingFieldById[];
}
