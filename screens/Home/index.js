// Made by Taha Bisgin.
// ©TahaBisginSoftware, all rights reserved.

import React, {Component} from 'react';
import {RefreshControl, StyleSheet, View, Text, Image, ScrollView, Linking, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {Card, Title} from 'react-native-paper';

import Header from '../../components/AppBar';

export default class Home extends Component {

    state = {
        articles:[],
        isLoading: true,
        errors: null,
        refreshing: false,
    };
    getArticles() {
        axios
            .get( "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=4799b1090bb449ab874373fb78807398")
            .then(response => 
                response.data.articles.map(article =>({
                    date: `${article.publishedAt}`,
                    title: `${article.title}`,
                    url: `${article.url}`,
                    description: `${article.description}`,
                    urlToImage: `${article.urlToImage}`,
                    author: `${article.author}`,
                    content: `${article.content}`,
                }))
            )
            .then(articles => {
                this.setState({
                    articles,
                    isLoading: false,
                    refreshing: false,
                });
            })
            .catch(error => this.setState({error, isLoading: false, refreshing: false}));
    }

    componentDidMount(){
        this.getArticles();
    }

    handleRefresh = () =>{
        this.setState({
            refreshing: true,
        }, () => {
            this.getArticles();
        })
        
    }

    render(){
        const{isLoading, articles} = this.state;
        return(
            <View style={styles.container}>
                <Header />
                <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl 
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    />}
                >
                    {!isLoading ? (
                        articles.map(article => {
                            const { date, title, url, urlToImage, author } = article;
                            return(
                                <Card
                                key={url}
                                style={styles.listItem}
                                >
                                    <TouchableOpacity onPress={()=> {Linking.openURL(`${url}`)}}>
                                    <Image style={{borderRadius:10,width:300, height:120, justifyContent:'center',alignItems:'center'}} source={{uri: urlToImage}}/>
                                    <Title style={{color:'white'}}>{title}</Title>
                                    <Text style={{color:'grey'}}>{author}</Text>
                                    <Text style={{color:'grey'}}>{date}</Text>
                                    </TouchableOpacity>
                                </Card>
                            );
                        })
                    ) :(
                        <RefreshControl refreshing={this.state.isLoading}/>
                    )}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0d0c1d',
    },
    listItem: {
    backgroundColor: '#364156',
    padding: 20,
    margin:10,
    flexDirection: 'row',
    elevation: 7,
    borderRadius: 10,
    alignItems: 'center',
    },

  });
  