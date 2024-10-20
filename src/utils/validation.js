export const validatePassword = (value) => {
  // Regular expression to check for:
  // - At least 8 characters
  // - At least one uppercase letter
  // - At least one lowercase letter
  // - At least one digit
  // - At least one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,}$/

  // Validate the password
  return passwordRegex.test(value)
}
