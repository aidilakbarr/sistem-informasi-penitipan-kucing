export interface RegisterFormData {
  nama: string;
  email: string;
  telepon: string;
  password: string;
  konfirmasi_password: string;
  agree: boolean;
}

export interface RegisterFormErrors {
  nama?: string;
  email?: string;
  telepon?: string;
  password?: string;
  konfirmasi_password?: string;
  agree?: string;
  general?: string;
}
