import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>
        {now.toLocaleTimeString()}
      </Text>
      <Text style={styles.dateText}>
        {now.toDateString()}
      </Text>
      <View style={{ marginTop: 30 }}>
        <Button title="View Alarms" onPress={() => navigation.navigate('Alarms')} />
        <Button title="Set New Alarm" onPress={() => navigation.navigate('Set Alarm')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#f2f2f2' },
  timeText: { fontSize: 50, fontWeight: 'bold' },
  dateText: { fontSize: 22, color: '#555' }
});
