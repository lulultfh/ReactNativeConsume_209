import FormHewan from "@/components/FormHewan";
import { Hewan } from "@/domain/entities/Hewan";
import { useHewanViewModel } from "@/hooks/useHewanViewModel";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function EditHewanScreen() {
  const { id } = useLocalSearchParams();
  const { loading, updateHewan, fetchHewanById } = useHewanViewModel();
  const [hewan, setHewan] = useState<Hewan | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetchHewanById(Number(id));
    if (res?.success) {
      setHewan(res.data);
    }
  };
  if (!hewan) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <FormHewan
      title="Edit Data Ternak"
      submit="Update Data"
      initialData={hewan}
      loading={loading}
      onSubmit={(data) => {
        updateHewan(Number(id), data, () => {
          router.back();
        });
      }}
    />
  );
}
