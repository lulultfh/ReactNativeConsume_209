import { Hewan } from "@/domain/entities/Hewan";

interface HewanProps {
  initialData?: Hewan;
  loading?: boolean;
  submit?: string;
  onSubmit: (data: Omit<Hewan, "id">) => void;
}

export default function FormHewan() {}
