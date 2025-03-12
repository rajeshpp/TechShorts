import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

export default function SearchScreen() {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const response = await axios.get(`http://localhost:5000/api/news/search?keyword=${keyword}`);
        setResults(response.data);
    };

    return (
        <View>
            <Text>Search News</Text>
            <TextInput value={keyword} onChangeText={setKeyword} placeholder="Enter keyword" />
            <Button title="Search" onPress={handleSearch} />
            <FlatList
                data={results}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.content}</Text>
                    </View>
                )}
            />
        </View>
    );
}
