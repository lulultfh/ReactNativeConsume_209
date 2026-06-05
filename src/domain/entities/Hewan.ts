export interface Hewan {
  id?: number;
  nama: String;
  jenis: String;
  tanggal_lahir: String;
  harga: number;
  status?: "tersedia" | "terjual";
  createdAt?: string;
  updatedAt?: string;
}

export interface APIResponse<T> {
  success: string;
  message: string;
  data: T;
}
