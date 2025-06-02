import { IUser } from "@/schemas/auth";
import { UniversityType } from "@/schemas/university";

export interface IStoredCountdownData {
  startTime: number;
  duration: number;
}

export interface IGetProfile extends Omit<IUser, "favoriteUniversityIds"> {
  favoriteUniversityIds?: UniversityType[];
}
