"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm, type UseFormProps } from "react-hook-form";
import { type AnyZodObject, type z } from "zod";

import { type SubmissionResult } from "~/server/form";

export function useFormWithAction<Schema extends AnyZodObject>({
  schema,
  action,
  permalink,
  useFormProps,
}: {
  schema: Schema;
  action: (
    prevState: unknown,
    formData: FormData,
  ) => Promise<SubmissionResult<Schema>>;
  permalink?: string;
  useFormProps?: UseFormProps<z.infer<Schema>>;
}) {
  const [state, formAction] = useFormState(action, undefined, permalink);

  const form = useForm<z.infer<Schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    ...useFormProps,
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void form.handleSubmit(() => {
      formAction(new FormData(event.target as HTMLFormElement));
    })(event);
  }

  useEffect(() => {
    console.log("rerender: ", +new Date());
    if (state && "resetForm" in state && state.resetForm) {
      form.reset();
    }

    if (state && "fieldsErrors" in state && state.fieldsErrors) {
      for (const field in state.fieldsErrors) {
        if (state.fieldsErrors[field]) {
          // @ts-expect-error field should be keyof z.infer<Schema>
          form.setError(field, {
            types: {
              server: state.fieldsErrors[field],
            },
          });
        }
      }
    }

    if (state && "formErrors" in state && state.formErrors) {
      form.setError("root", {
        types: {
          server: state.formErrors,
        },
      });
    }
  }, [form, state]);

  return {
    form,
    state,
    formAction,
    onSubmit,
  };
}
