import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function AddNewsScreen() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', {
                uri: image,
                type: 'image/jpeg',
                name: 'news.jpg'
            });
        }
        await axios.post('http://localhost:5000/api/news', formData);
    };

    return (
        <View>
            <Text>Add News</Text>
            <TextInput value={title} onChangeText={setTitle} placeholder="Title" />
            <TextInput value={content} onChangeText={setContent} placeholder="Content" multiline />
            <Button title="Pick Image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}
