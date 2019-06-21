import React, { Component } from "react";
import api from "../services/api";
import io from "socket.io-client";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet
} from "react-native";
import Camera from "../assets/camera.png";
import More from "../assets/more.png";
import Like from "../assets/like.png";
import Comment from "../assets/comment.png";
import Send from "../assets/send.png";

export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => {
          navigation.navigate("New");
        }}
      >
        <Image source={Camera} />
      </TouchableOpacity>
    )
  });

  state = {
    feed: []
  };
  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get("posts");
    this.setState({ feed: response.data });
  }

  registerToSocket = () => {
    const socket = io("http://10.0.3.2:3333");

    socket.on("post", newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on("like", likePost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likePost._id ? likePost : post
        )
      });
    });
  };

  handleLike = id => {
    api.post(`/posts/${id}`);
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.feed}
          keyExtractor={post => post._id}
          renderItem={({ item }) => (
            <View style={styles.feedItem}>
              <View style={styles.feedItemHeader}>
                <View styles={styles.userInfo}>
                  <Text style={styles.name}>{item.author}</Text>
                  <Text style={styles.place}>{item.place}</Text>
                </View>
                <Image source={More} />
              </View>
              <Image
                style={styles.feedImage}
                source={{ uri: `http://10.0.3.2:3333/files/${item.image}` }}
              />
              <View style={styles.feedItemFooter}>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.action}
                    onPress={() => this.handleLike(item._id)}
                  >
                    <Image source={Like} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={Comment} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={Send} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.likes}>{item.likes} Curtidas</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.hashtags}>{item.hashtags}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  feedItem: {
    marginTop: 20
  },
  feedItemHeader: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  name: {
    fontSize: 14,
    color: "#000"
  },
  place: {
    fontSize: 12,
    color: "#666",
    marginTop: 2
  },
  feedImage: {
    width: "100%",
    height: 400,
    marginVertical: 15
  },
  feedItemFooter: {
    paddingHorizontal: 15
  },
  actions: {
    flexDirection: "row"
  },
  action: {
    marginRight: 8
  },
  likes: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#000"
  },
  description: {
    lineHeight: 18,
    color: "#000"
  },
  hashtags: {
    color: "#7159c1"
  }
});
