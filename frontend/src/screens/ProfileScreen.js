import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function ProfileScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/profile', {
            headers: { Authorization: 'your_token_here' }
        })
        .then(res => {
            setUsername(res.data.username);
            setEmail(res.data.email);
        });
    }, []);

    const handleUpdate = async () => {
        await axios.put('http://localhost:5000/api/profile', { username, email });
    };

    return (
        <View>
            <Text>Profile</Text>
            <TextInput value={username} onChangeText={setUsername} placeholder="Username" />
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
            <Button title="Update Profile" onPress={handleUpdate} />
        </View>
    );
}
