import { Hewan } from "@/domain/entities/Hewan";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface HewanProps {
  initialData?: Hewan;
  loading?: boolean;
  title?: string;
  submit?: string;
  onSubmit: (data: Omit<Hewan, "id">) => void;
}

export default function FormHewan({
  initialData,
  loading,
  title = "Tambah Ternak Baru",
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

  const isEditMode = !!initialData;

  const handleSubmit = () => {
    const cleanNama = nama.trim();
    const cleanJenis = jenis.trim();
    const numericHarga = Number(harga);

    if (!cleanNama) {
      Alert.alert("Validasi Gagal", "Nama hewan wajib diisi");
      return;
    }
    if (!cleanJenis) {
      Alert.alert("Validasi Gagal", "Jenis hewan wajib diisi");
      return;
    }
    if (!harga || isNaN(numericHarga) || numericHarga <= 0) {
      Alert.alert(
        "Validasi Gagal",
        "Harga harus berupa angka lebih besar dari 0",
      );
      return;
    }
    onSubmit({
      nama: cleanNama,
      jenis: cleanJenis,
      harga: numericHarga,
      tanggal_lahir: formatDateString(tanggalLahir),
      status: isEditMode ? status : "tersedia",
    });
  };
  console.log("showDatePicker:", showDatePicker);
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">{title}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nama hewan"
            placeholderTextColor="#94a3b8"
            value={nama}
            onChangeText={setNama}
          />
          <TextInput
            style={styles.input}
            placeholder="Jenis Hewan(contoh: Sapi Limosin)"
            placeholderTextColor="#94a3b8"
            value={jenis}
            onChangeText={setJenis}
          />
          <TextInput
            style={styles.input}
            placeholder="Harga (Rupiah)"
            placeholderTextColor="#94a3b8"
            keyboardType="number-pad"
            value={harga}
            onChangeText={(text) => {
              setHarga(text.replace(/[^0-9]/g, ""));
            }}
          />
          <TouchableOpacity
            style={styles.dateInputButton}
            onPress={() => {
              console.log("PENCET TANGGAL");
              setShowDatePicker(true);
            }}
            activeOpacity={0.7}
          >
            <ThemedText style={styles.dateText}>
              Tanggal Lahir: {formatDateString(tanggalLahir)}
            </ThemedText>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={tanggalLahir}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onValueChange={(event, date) => {
                console.log("VALUE CHANGE");
                if (date) {
                  setTanggalLahir(date);
                }

                setShowDatePicker(false);
              }}
              onDismiss={() => {
                setShowDatePicker(false);
              }}
            />
          )}
          {isEditMode ? (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={status}
                onValueChange={(value) =>
                  setStatus(value as "tersedia" | "terjual")
                }
              >
                <Picker.Item label="Tersedia" value="tersedia" />
                <Picker.Item label="Terjual" value="terjual" />
              </Picker>
            </View>
          ) : (
            <View style={styles.statusLocked}>
              <ThemedText>Status: Tersedia</ThemedText>
            </View>
          )}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.submitButtonText}>{submit}</ThemedText>
            )}
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, paddingHorizontal: 24 },
  header: { marginVertical: 24 },
  form: { gap: 16 },
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#0f172a",
  },
  dateInputButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: "center",
  },
  dateText: { fontSize: 16, color: "#334155" },
  submitButton: {
    backgroundColor: "#0284c7",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  submitButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  errorText: { color: "#ef4444", textAlign: "center", fontWeight: "600" },
  activeStatus: {
    backgroundColor: "#dbeafe",
  },
  statusButton: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    overflow: "hidden",
  },
  statusLocked: {
    backgroundColor: "#f1f5f9",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
});
