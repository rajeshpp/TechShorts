import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';

export default function AdminPanelScreen() {
    const [unapprovedNews, setUnapprovedNews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/news/unapproved')
            .then(res => setUnapprovedNews(res.data));
    }, []);

    const handleApprove = async (id) => {
        await axios.post(`http://localhost:5000/api/admin/news/${id}/approve`);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/admin/news/${id}`);
    };

    return (
        <View>
            <Text>Admin Panel</Text>
            <FlatList
                data={unapprovedNews}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.title}</Text>
                        <Button title="Approve" onPress={() => handleApprove(item._id)} />
                        <Button title="Delete" onPress={() => handleDelete(item._id)} />
                    </View>
                )}
            />
        </View>
    );
}
