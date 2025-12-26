import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem('favorites');
      setFavorites(saved ? JSON.parse(saved) : []);
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => `${item.text}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.quoteBox}>
            <Text style={styles.text}>"{item.text}"</Text>
            <Text style={styles.author}>— {item.author}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No favorite quotes yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  quoteBox: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  text: { fontSize: 18, fontStyle: 'italic' },
  author: { fontSize: 16, color: '#555', marginTop: 5 },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 18 },
});
