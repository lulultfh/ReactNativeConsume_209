import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/ThemedText";
import { Spacing } from "@/constants/theme";
import { useAuthViewModel } from "@/hooks/useAuthViewModel";
import { useHewanViewModel } from "@/hooks/useHewanViewModel";
import { router } from "expo-router";
import { Pencil, Trash2 } from "lucide-react-native";
import { useEffect } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const { hewanList, loading, fetchHewan, deleteHewan } = useHewanViewModel();
  const { handleLogout } = useAuthViewModel();
  useEffect(() => {
    fetchHewan();
  }, [fetchHewan]);

  const confirmDelete = (id: number, namaHewan: string) => {
    Alert.alert(
      "Konfirmasi Hapus",
      `Apakah Anda yakin ingin menghapus ${namaHewan}?`,
      [
        {
          text: "Tidak",
          style: "cancel",
        },
        {
          text: "Ya",
          style: "destructive",
          onPress: async () => {
            await deleteHewan(id);
            fetchHewan();
          },
        },
      ],
      { cancelable: true },
    );
  };
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Daftar Ternak</ThemedText>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <FlatList
          data={hewanList}
          keyExtractor={(item) => item.id!.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchHewan}
              tintColor="#0284c7"
            />
          }
          ListEmptyComponent={
            <ThemedView style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>
                Belum ada data hewan ternak
              </ThemedText>
            </ThemedView>
          }
          renderItem={({ item }) => (
            <ThemedView style={styles.card}>
              <ThemedView style={styles.cardInfo}>
                <ThemedText type="defaultSemiBold" style={styles.animalName}>
                  {item.nama}
                </ThemedText>
                <ThemedText style={styles.animalMeta}>
                  {item.jenis} .{" "}
                  <ThemedText
                    style={
                      item.status === "tersedia"
                        ? styles.statusActive
                        : styles.statusSold
                    }
                  >
                    {" "}
                    {item.status}
                  </ThemedText>
                </ThemedText>
                <ThemedText style={styles.animalPrice}>
                  {" "}
                  Rp{item.harga.toLocaleString("id-ID")}
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.actionContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    router.push({
                      pathname: "/main/edit/[id]",
                      params: { id: item.id!.toString() },
                    })
                  }
                >
                  <Pencil size={18} color="#0284c7" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => confirmDelete(item.id!, item.nama)}
                >
                  <Trash2 size={18} color="#ef4444" />
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          )}
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push("/main/form")}
        >
          <ThemedText style={styles.fabText}>+</ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  logoutButton: {
    backgroundColor: "#fff",
    // fontSize: 12,
    fontWeight: "600",
  },
  logoutText: {
    color: "#ef4444",
    fontSize: 15,
    fontWeight: "600",
  },
  listContent: {
    padding: 20,
    gap: 12,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfo: {
    gap: 4,
    flex: 1,
    backgroundColor: "transparent",
  },
  animalName: {
    fontSize: 18,
  },
  animalMeta: {
    fontSize: 14,
    color: "#64748b",
  },
  animalPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0284c7",
    marginTop: 2,
  },
  statusActive: {
    color: "#22c55e",
    fontWeight: "600",
  },
  statusSold: {
    color: "#94a3b8",
    fontWeight: "600",
  },
  actionContainer: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "transparent",
  },

  editButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },

  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff1f2",
    borderWidth: 1,
    borderColor: "#fecdd3",
  },
  emptyContainer: {
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: "#94a3b8",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#0284c7",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0284c7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  fabText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "300",
    marginTop: -2,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
