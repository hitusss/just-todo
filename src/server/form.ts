import { type AnyZodObject, type z } from "zod";

type ReplyOptions<Schema extends AnyZodObject> =
  | {
      resetForm: boolean;
    }
  | {
      fieldsErrors?: {
        [key in keyof z.TypeOf<Schema>]?: string[];
      };
      formErrors?: string[];
    };

export type SubmissionResult<Schema extends AnyZodObject> = {
  status: "SUCCESS" | "ERROR";
  fields?: Record<string, FormDataEntryValue>;
  fieldsErrors?: {
    [key in keyof z.TypeOf<Schema>]?: string[];
  };
  formErrors?: string[];
  resetForm?: boolean;
};

export async function parseFormData<Schema extends AnyZodObject>(
  formData: FormData,
  {
    schema,
  }: {
    schema: Schema;
  },
): Promise<
  | {
      success: true;
      data: z.infer<Schema>;
      reply: (options?: ReplyOptions<Schema>) => SubmissionResult<Schema>;
    }
  | {
      success: false;
      data?: undefined;
      reply: (options?: ReplyOptions<Schema>) => SubmissionResult<Schema>;
    }
> {
  const fields = Object.fromEntries(formData);

  const result = await schema.safeParseAsync(fields);

  const submissionResult: SubmissionResult<Schema> = {
    status: result.success ? "SUCCESS" : "ERROR",
    fields,
    fieldsErrors: result.success
      ? undefined
      : result.error.flatten().fieldErrors,
    formErrors: result.success ? undefined : result.error.flatten().formErrors,
  };

  function reply(options?: ReplyOptions<Schema>): SubmissionResult<Schema> {
    if (options && "resetForm" in options && options.resetForm) {
      return {
        status: submissionResult.status,
        fields: undefined,
        resetForm: true,
      };
    }
    if (options && "fieldsErrors" in options) {
      if (options.fieldsErrors) {
        for (const field in options.fieldsErrors) {
          if (options.fieldsErrors[field]) {
            if (!submissionResult.fieldsErrors) {
              submissionResult.fieldsErrors = {};
            }
            if (submissionResult.fieldsErrors[field]) {
              submissionResult.fieldsErrors[field].concat(
                options.fieldsErrors[field],
              );
            } else {
              submissionResult.fieldsErrors[field] =
                options.fieldsErrors[field];
            }
            submissionResult.status = "ERROR";
          }
        }
      }
    }
    if (options && "formErrors" in options) {
      if (options.formErrors) {
        if (!submissionResult.formErrors) {
          submissionResult.formErrors = options.formErrors;
        }
        submissionResult.formErrors.concat(options.formErrors);

        submissionResult.status = "ERROR";
      }
    }

    return submissionResult;
  }

  if (result.success) {
    return {
      success: true,
      data: result.data,
      reply,
    };
  }

  return {
    success: false,
    data: undefined,
    reply,
  };
}
