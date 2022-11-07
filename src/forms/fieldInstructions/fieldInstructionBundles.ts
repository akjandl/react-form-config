import * as fieldInstructions from "./index";
import { FieldInstructionBundle } from "../fieldInstructions/index";

export const vehicleGroupInputs: FieldInstructionBundle = {
  vehicleMake: fieldInstructions.vehicleMake,
  vehicleModel: fieldInstructions.vehicleModel,
  hasTradeIn: fieldInstructions.hasTradeIn,
};

export const applicantGroupInputs: FieldInstructionBundle = {
  hasCoapplicant: fieldInstructions.hasCoapplicant,
  firstName: fieldInstructions.firstName,
  middleInitial: fieldInstructions.middleInitial,
  lastName: fieldInstructions.lastName,
  streetAddr: fieldInstructions.streetAddr,
  city: fieldInstructions.city,
  state: fieldInstructions.state,
  yearsAtResidence: fieldInstructions.yearsAtResidence,
};

export const coapplicantGroupInputs: FieldInstructionBundle = {
  coapplicantFirstName: fieldInstructions.coapplicantFirstName,
  coapplicantMiddleInitial: fieldInstructions.coapplicantMiddleInitial,
  coapplicantLastName: fieldInstructions.coapplicantLastName,
  coapplicantStreetAddr: fieldInstructions.coapplicantStreetAddr,
  coapplicantCity: fieldInstructions.coapplicantCity,
  coapplicantState: fieldInstructions.coapplicantState,
  coapplicantYearsAtResidence: fieldInstructions.coapplicantYearsAtResidence,
};
