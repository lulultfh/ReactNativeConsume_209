import { Hewan } from "@/domain/entities/Hewan";
import { useEffect, useState } from "react";

interface HewanProps {
  initialData?: Hewan;
  loading?: boolean;
  submit?: string;
  onSubmit: (data: Omit<Hewan, "id">) => void;
}

export default function FormHewan({
  initialData,
  loading,
  submit = "Simpan",
  onSubmit,
}: HewanProps) {
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [harga, setHarga] = useState("");
  const [status, setStatus] = useState<"tersedia" | "terjual">("tersedia");
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      setNama(initialData.nama);
      setJenis(initialData.jenis);
      setHarga(initialData.harga.toString());
      setStatus(initialData.status ?? "tersedia");
      setTanggalLahir(new Date(initialData.tanggal_lahir));
    }
  }, [initialData]);

  const formatDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
}
