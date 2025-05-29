import { IMajor } from "@/schemas/major";
import { ITrainingField } from "@/schemas/trainingField";
import { UniversityType } from "@/schemas/university";

export interface IGetUniversityById
  extends Omit<UniversityType, "trainingFields"> {
  trainingFields: {
    trainingFieldId: ITrainingField;
    majors: {
      majorId: IMajor;
      scores?: {
        year: number;
        thpt?: number;
        hocBa?: number;
      }[];
    }[];
  }[];
}
