import { Resolver } from "react-hook-form";
import * as yup from "yup";

export const schemaSubscriptionFormResolver = yup.object().shape({
  name: yup.string().min(2).max(32).required(),
  email: yup.string().email().required(),
  // phone: yup.string().min(9).max(16).required(),
  // comment: yup.string().max(1000).notRequired(),
});

export type SchemaSubscriptionFormResolverType = Resolver<FormData, typeof schemaSubscriptionFormResolver>