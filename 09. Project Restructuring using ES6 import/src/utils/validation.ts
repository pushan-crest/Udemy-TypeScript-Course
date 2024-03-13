// =============== Validation ============================

export interface Validatable {
  value?: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(input: Validatable) {
  let isValid = true;

  if (input.required) {
    isValid = isValid && input.value?.toString().trim().length !== 0;
  }

  if (input.minLength !== undefined && typeof input.value === "string") {
    isValid = isValid && input.value.length > input.minLength;
  }

  if (input.maxLength !== undefined && typeof input.value === "string") {
    isValid = isValid && input.value.length < input.maxLength;
  }

  if (input.max !== undefined && typeof input.value === "number") {
    isValid = isValid && input.value <= input.max;
  }

  if (input.min !== undefined && typeof input.value === "number") {
    isValid = isValid && input.value >= input.min;
  }

  return isValid;
}
