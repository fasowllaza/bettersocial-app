import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import IconBlock from '../assets/block.png';
import IconComment from '../assets/comment.png';
import IconDownvoteActive from '../assets/downvote_active.png';
import IconDownvoteInactive from '../assets/downvote_inactive.png';
import IconShare from '../assets/share.png';
import IconUpvoteActive from '../assets/upvote_active.png';
import IconUpvoteInactive from '../assets/upvote_inactive.png';
import {PostDetailProps, ContentData, CommentData} from './MyType';

function FeedScreen() {
  const navigation = useNavigation();
  const initialNumberOfLines = 3;
  const [expanded, setExpanded] = useState(false);
  const [contentData, setContentData] = useState<ContentData[]>([{
    id: 1,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
    luctus in ipsum ac dictum. Integer et nunc ut tellus tinci,
    consectetur adipiscing elit. Nulla luctus in ipsum ac dictum.
    Integer et nunc ut tellus tinci, consectetur adipiscing elit.
    Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci
    Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus
    tinci, consectetur adipiscing elit. Nulla luctus in ipsum ac
    dictum.`,
    upvotes: 0,
    comment: [{
      content: 'ini apa?',
      createdBy: 'Usup Sumaludin',
      date: '22-10-2023'
    }, {
      content: 'Dasar netizaen',
      createdBy: 'Jamu Simalakutup',
      date: '22-10-2023'
    }],
    didUpvotes: null,
    postedBy: 'Sandi',
    date: '22-10-2023'
  }, {
    id: 2,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
    luctus in ipsum ac dictum. Integer et nunc ut tellus tinci,
    consectetur adipiscing elit. Nulla luctus in ipsum ac dictum.
    Integer et nunc ut tellus tinci, consectetur adipiscing elit.
    Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci
    Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus
    tinci, consectetur adipiscing elit. Nulla luctus in ipsum ac
    dictum.`,
    upvotes: 1,
    comment: [],
    didUpvotes: 'downvotes',
    postedBy: 'Joni',
    date: '22-10-2023'
}, {
  id: 3,
  content: `test ayam.`,
  upvotes: 10,
  comment: [{
    content: 'ini apa?',
    createdBy: 'Usup Sumaludin',
    date: '22-10-2023'
  }],
  didUpvotes: 'upvotes',
  postedBy: 'Joko',
  date: '22-10-2023'
}])
  const toggleReadMore = () => {
    setExpanded(!expanded)
  }

  const handleUpvote = (id: number) => {
    const updatedContentData:ContentData[] = contentData.map((el: ContentData) => {
      if (el.id === id) {
        if (el.didUpvotes === 'downvotes') {
          return {
            ...el,
            upvotes: el.upvotes + 2,
            didUpvotes: 'upvotes',
          };
        } else if (el.didUpvotes === 'upvotes') {
          return {
            ...el,
            upvotes: el.upvotes - 1,
            didUpvotes: null,
          };
        } else {
          return {
            ...el,
            upvotes: el.upvotes + 1,
            didUpvotes: 'upvotes',
          };
        }
      }
      return el;
    });
    setContentData(updatedContentData);
  };
  
  const handleDownvote = (id: number) => {
    const updatedContentData = contentData.map((el) => {
      if (el.id === id) {
        if (el.didUpvotes === 'upvotes') {
          return {
            ...el,
            upvotes: el.upvotes - 2,
            didUpvotes: 'downvotes',
          };
        } else if (el.didUpvotes === 'downvotes') {
          return {
            ...el,
            upvotes: el.upvotes + 1,
            didUpvotes: null,
          };
        } else {
          return {
            ...el,
            upvotes: el.upvotes - 1,
            didUpvotes: 'downvotes',
          };
        }
      }
      return el;
    });
    setContentData(updatedContentData);
  };

  const handleNavigateToPostDetail = (contentData: ContentData) => {
    const params: PostDetailProps = {
      handleAddComment,
      handleUpvote,
      handleDownvote,
      postContentData: contentData
    }
    navigation.navigate('post-detail', params)
  }

  const handleAddComment = (id: number, newComment: CommentData) => {
    const updatedContentData = contentData.map((item:ContentData) => {
      if (item.id === id) {
        return {
          ...item,
          comment: [...item.comment, newComment],
        };
      }

      return item;
    });
  
    // Set the state with the updated contentData
    setContentData(updatedContentData);
  };
  
  const postContent = (data:ContentData, index:number) => {
    return <>
          <View style={{height: 547}}>
            <View
              style={{
                height: 64,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={{
                  uri: 'https://picsum.photos/200',
                }}
                width={48}
                height={48}
                style={{borderRadius: 24, marginLeft: 24}}
              />
              <View style={{marginLeft: 16}}>
                <Text
                  style={{fontWeight: '600', fontSize: 14, lineHeight: 16.94}}>
                  { data?.postedBy }
                </Text>
                <Text style={{fontWeight: '400', fontSize: 12, lineHeight: 18}}>
                  { data?.date }
                </Text>
              </View>
            </View>
            <View style={{height: 0.5, backgroundColor: '#C4C4C4'}} />
            <View>
              <Text numberOfLines={expanded ? undefined : initialNumberOfLines} style={{margin: 24}}>
                { data?.content }
              </Text>
              {!expanded && (
                <TouchableOpacity onPress={toggleReadMore}>
                  <Text style={{ color: 'blue', marginTop: 5 }}>Read more</Text>
                </TouchableOpacity>
              )}
              <Image
                source={{
                  uri: 'https://picsum.photos/200',
                }}
                height={200}
              />
            </View>
            <View
              style={{
                height: 52,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Image
                  source={IconShare}
                  height={18}
                  width={18}
                  style={{marginLeft: 22}}
                />
                <Image
                  source={IconComment}
                  height={18}
                  width={18}
                  style={{marginLeft: 24}}
                />
                <Text
                  style={{
                    width: 24,
                    marginHorizontal: 4,
                    textAlign: 'center',
                  }}>
                  {
                    data?.comment?.length
                  }
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={IconBlock}
                  height={18}
                  width={18}
                  style={{marginLeft: 22}}
                />
                <Pressable onPress={() => handleDownvote(data.id)}>
                  <Image
                    source={IconDownvoteInactive}
                    height={18}
                    width={18}
                    style={{marginLeft: 24, backgroundColor: data?.didUpvotes === 'downvotes' ? 'black' : undefined }}
                  />
                </Pressable>
                <Text
                  style={{
                    width: 24,
                    marginHorizontal: 11,
                    textAlign: 'center',
                  }}>
                  {
                    data?.upvotes
                  }
                </Text>
                <Pressable onPress={() => handleUpvote(data.id)}>
                  <Image
                    source={IconUpvoteInactive}
                    height={18}
                    width={18}
                    style={{marginLeft: 22, backgroundColor: data?.didUpvotes === 'upvotes' ? 'black' : undefined }}
                  />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={{height: 4, backgroundColor: '#C4C4C4'}} />
        </>
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {
          contentData.map((contentData:ContentData, index) => {
            return (
            <Pressable key={index} onPress={() => handleNavigateToPostDetail(contentData)}>
              {postContent(contentData, index)}
            </Pressable>
            )})
        }
      </ScrollView>
    </SafeAreaView>
  );
}

export default FeedScreen;
