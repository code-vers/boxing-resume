import { useState, useCallback } from "react";
import { z } from "zod";

/**
 * Configuration options for the custom form hook.
 */
interface UseCustomFormOptions<T> {
  initialValues: T;
  validationSchema?: z.ZodType<T>;
  onSubmit: (values: T) => Promise<void> | void;
}

/**
 * Return type for the useCustomForm hook.
 */
interface UseCustomFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isDirty: boolean;
  handleChange: (name: keyof T, value: any) => void;
  handleBlur: (name: keyof T) => void;
  handleSubmit: (e?: React.FormEvent) => void;
  setFieldError: (name: keyof T, error: string) => void;
  setErrors: (errors: Partial<Record<keyof T, string>>) => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  resetForm: () => void;
}

/**
 * A custom form hook that manages state, validation (via Zod), and submission.
 * Replaces react-hook-form as per enterprise requirements.
 *
 * @param options Configuration object containing initialValues, schema, and submit handler.
 * @returns Object containing form state and handler functions.
 */
export function useCustomForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseCustomFormOptions<T>): UseCustomFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  /**
   * Validates a single field against the Zod schema.
   */
  const validateField = useCallback(
    (name: keyof T, value: any) => {
      if (!validationSchema) return;

      try {
        // We use shape on ZodObject to pick out the specific field schema
        if (validationSchema instanceof z.ZodObject) {
          const fieldSchema = validationSchema.shape[name as string];
          if (fieldSchema) {
            fieldSchema.parse(value);
          }
        } else {
            // For complex schemas (e.g. .refine), we might need to parse the whole object
            // but this is an expensive fallback. We just clear error for now until submit.
        }
        
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.issues[0]?.message;
          setErrors((prev) => ({ ...prev, [name]: fieldError }));
        }
      }
    },
    [validationSchema]
  );

  /**
   * Validates the entire form against the Zod schema.
   */
  const validateForm = useCallback((): boolean => {
    if (!validationSchema) return true;

    try {
      validationSchema.parse(values);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof T, string>> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0] as keyof T] = issue.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [validationSchema, values]);

  const handleChange = useCallback(
    (name: keyof T, value: any) => {
      setIsDirty(true);
      setValues((prev) => ({ ...prev, [name]: value }));
      if (touched[name]) {
        validateField(name, value);
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (name: keyof T) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      validateField(name, values[name]);
    },
    [validateField, values]
  );

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Partial<Record<keyof T, boolean>>);
    setTouched(allTouched);

    const isValid = validateForm();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsDirty(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError,
    setErrors,
    setValues,
    resetForm,
  };
}
