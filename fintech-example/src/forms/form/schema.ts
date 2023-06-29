import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// persons: [
//   {
//     birth_date: "2005-10-10",
//     name_first: "Test",
//     name_last: "User",
//     document_ssn: "111111111",
//     phone_number: "5555555555",
//     email_address: "test@test.com",
//     addresses: [
//       {
//         type: "primary",
//         city: "New York",
//         state: "NY",
//         line_1: "123 Test Street",
//         postal_code: "12345",
//       },
//     ],
// },

const AddressModel = z.object({
  streetNumber: z.union([z.number().int(), z.string()]),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  postCode: z.string(),
});

const CustomerModel = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  address: AddressModel,
  birthDate: z.string(),
  taxId: z.string(),
  phone: z.string(),
});

export const FormModel = z.object({
  primary: CustomerModel,
  secondary: CustomerModel.optional(),
});

export const FormPartialModel = FormModel.deepPartial();

export const formJsonSchema = () => {
  return zodToJsonSchema(FormModel, "formSchema");
};

export type FormDataPartial = z.infer<typeof FormPartialModel>;
export type FormData = z.infer<typeof FormModel>;
