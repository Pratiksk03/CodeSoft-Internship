import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';

export default function QuoteCard({ quote, onFavorite, isFavorite }) {
  const handleShare = async () => {
    await Share.share({
      message: `"${quote.text}" — ${quote.author}`,
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.text}>"{quote.text}"</Text>
      <Text style={styles.author}>— {quote.author}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onFavorite}>
          <Text style={{ fontSize: 24 }}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Text style={{ fontSize: 24 }}>📤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 20,
  },
});
