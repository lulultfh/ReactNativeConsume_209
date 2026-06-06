import FormHewan from "@/components/FormHewan";
import { ThemedView } from "@/components/ThemedView";
import { useHewanViewModel } from "@/hooks/useHewanViewModel";
import { useRouter } from "expo-router";

export default function AddHewanScreen() {
  const { addHewan, loading } = useHewanViewModel();
  const router = useRouter();

  return (
    <ThemedView style={{ flex: 1 }}>
      <FormHewan
        title="Tambah Ternak Baru"
        submit="Simpan ke Database"
        loading={loading}
        onSubmit={(data) => {
          addHewan(data, () => {
            router.back();
          });
        }}
      />
    </ThemedView>
  );
}
