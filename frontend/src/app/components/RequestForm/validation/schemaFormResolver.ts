import * as yup from "yup";
import { Resolver } from "react-hook-form";

export const schemaFormResolver = yup.object().shape({
  fullname: yup.string().min(2).max(32).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(9).max(16).required(),
  comment: yup.string().max(1000).optional(),
});

export type SchemaFormResolverType = Resolver<FormData, typeof schemaFormResolver>