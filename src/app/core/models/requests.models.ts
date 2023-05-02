interface RegistrationRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  citizenship: string;
  countryCode: string;
  phone: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export type { RegistrationRequest, LoginRequest };
