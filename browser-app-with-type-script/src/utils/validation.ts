export interface Validatable {
  value: string | number;
  required?: boolean;
  min_length?: number;
  max_length?: number;
  min?: number;
  max?: number;
}

export function validate(validatable: Validatable): boolean {
  let is_valid = true;
  if (validatable.required) {
    is_valid = is_valid && validatable.value.toString().trim().length > 0;
  }

  if (
    validatable.min_length != undefined &&
    typeof validatable.value === "string"
  ) {
    is_valid =
      is_valid && validatable.value.trim().length >= validatable.min_length;
  }

  if (
    validatable.max_length != undefined &&
    typeof validatable.value === "string"
  ) {
    is_valid =
      is_valid && validatable.value.trim().length <= validatable.max_length;
  }

  if (validatable.min != undefined && typeof validatable.value === "number") {
    is_valid = is_valid && validatable.value >= validatable.min;
  }

  if (validatable.max != undefined && typeof validatable.value === "number") {
    is_valid = is_valid && validatable.value <= validatable.max;
  }

  return is_valid;
}
