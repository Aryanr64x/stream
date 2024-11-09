import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>What do you wanna do ?</Text>
            <TouchableOpacity style={styles.button}>
                <Link href="/host" style={styles.link}>Host</Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Link href="/join" style={styles.link}>Join</Link>
            </TouchableOpacity>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    button: { backgroundColor: '#0055cc', padding: 15, marginVertical: 10, borderRadius: 8 },
    link: { color: '#fff', fontSize: 18 }
});
HomeScreen.options = {
    title: 'Agora Streamer', 
};
export default HomeScreen;
0