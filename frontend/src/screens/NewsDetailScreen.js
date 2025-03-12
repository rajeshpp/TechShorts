import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

export default function NewsDetailScreen({ route }) {
    const { newsId } = route.params;
    const [news, setNews] = useState({});
    const [comment, setComment] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/news/${newsId}`)
            .then(res => setNews(res.data));
    }, []);

    const handleLike = async () => {
        await axios.post(`http://localhost:5000/api/news/${newsId}/like`);
    };

    const handleComment = async () => {
        await axios.post(`http://localhost:5000/api/news/${newsId}/comment`, { comment });
        setComment('');
    };

    return (
        <View>
            <Text>{news.title}</Text>
            <Text>{news.content}</Text>
            <Button title="Like" onPress={handleLike} />
            <TextInput value={comment} onChangeText={setComment} placeholder="Add a comment" />
            <Button title="Comment" onPress={handleComment} />
            <FlatList
                data={news.comments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text>{item.comment}</Text>
                )}
            />
        </View>
    );
}
