import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues, Resolver } from "react-hook-form";
import type { ZodTypeAny } from "zod/v3";

export function createZodResolver<T extends FieldValues>(
  schema: ZodTypeAny,
): Resolver<T> {
  return zodResolver(schema) as Resolver<T>;
}
