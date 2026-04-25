import { z } from "zod";

export const registerSchema = z
  .object({
    nama: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Email tidak valid"),
    telepon: z.string().min(10, "Nomor tidak valid"),
    password: z.string().min(8, "Minimal 8 karakter"),
    konfirmasi_password: z.string(),
    agree: z.boolean().refine((val) => val === true, {
      message: "Harus menyetujui syarat",
    }),
  })
  .refine((data) => data.password === data.konfirmasi_password, {
    message: "Password tidak cocok",
    path: ["konfirmasi_password"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
