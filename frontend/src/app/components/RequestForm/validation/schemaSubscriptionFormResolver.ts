import * as yup from "yup";
// import "yup-phone";

export const schemaSubscriptionFormResolver = yup.object().shape({
  fullname: yup.string().min(2).max(32).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(9).max(16).required(),
  comment: yup.string().max(1000).notRequired(),
});

export type SchemaSubscriptionFormResolverType = yup.InferType<typeof schemaSubscriptionFormResolver>