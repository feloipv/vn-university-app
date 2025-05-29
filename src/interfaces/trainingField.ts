import { IMajor } from "@/schemas/major";
import { ITrainingField } from "@/schemas/trainingField";
import { UniversityType } from "@/schemas/university";

export interface IGetTrainingFieldById
  extends Omit<ITrainingField, "universityIds" | "majorIds"> {
  universityIds?: UniversityType[];
  majorIds: IMajor[];
}
