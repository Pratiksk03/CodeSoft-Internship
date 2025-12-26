import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuoteCard from '../components/QuoteCard';
import { quotes } from '../data/quotes';

const getTodayKey = () => new Date().toISOString().split('T')[0];

export default function HomeScreen() {
  const [quote, setQuote] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadQuote();
    loadFavorites();
  }, []);

  const loadQuote = async () => {
    const todayKey = getTodayKey();
    const storedDate = await AsyncStorage.getItem('quoteDate');
    const storedQuote = await AsyncStorage.getItem('dailyQuote');

    if (storedDate === todayKey && storedQuote) {
      setQuote(JSON.parse(storedQuote));
    } else {
      const random = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(random);
      await AsyncStorage.setItem('dailyQuote', JSON.stringify(random));
      await AsyncStorage.setItem('quoteDate', todayKey);
    }
  };

  const loadFavorites = async () => {
    const saved = await AsyncStorage.getItem('favorites');
    setFavorites(saved ? JSON.parse(saved) : []);
  };

  const toggleFavorite = async () => {
    const updated = [...favorites];
    const exists = updated.find(q => q.text === quote.text);
    if (exists) {
      const newList = updated.filter(q => q.text !== quote.text);
      setFavorites(newList);
      await AsyncStorage.setItem('favorites', JSON.stringify(newList));
    } else {
      updated.push(quote);
      setFavorites(updated);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    }
  };

  const isFavorite = () => favorites.find(q => q.text === quote?.text);

  return (
    <View style={styles.container}>
      {quote ? (
        <QuoteCard quote={quote} onFavorite={toggleFavorite} isFavorite={isFavorite()} />
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
});
