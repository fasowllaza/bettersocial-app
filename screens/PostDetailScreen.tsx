import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import IconBack from '../assets/back.png';
import IconBlock from '../assets/block.png';
import IconComment from '../assets/comment.png';
import IconDownvoteActive from '../assets/downvote_active.png';
import IconDownvoteInactive from '../assets/downvote_inactive.png';
import IconShare from '../assets/share.png';
import IconUpvoteActive from '../assets/upvote_active.png';
import IconUpvoteInactive from '../assets/upvote_inactive.png';
import {CommentData, PostDetailProps} from './MyType';

function PostDetailScreen({route, navigation}) {
  const {
    postContentData,
    handleAddComment,
    handleDownvote,
    handleUpvote
  } = route.params;
  if (!postContentData) {
    return <Text>Loading...</Text>; // or render some loading indicator
  }
  const {
    id,
    content,
    upvotes,
    comment,
    didUpvotes,
  } = postContentData;

  const [commentInput, setCommentInput] = useState('')

  const renderComment = (commentData:CommentData, index: number) => {
    return (
    <View
    style={{
      flexDirection: 'row',
      minHeight: 72,
      paddingVertical: 16,
      paddingHorizontal: 24,
    }}
    key={index}
    >
    <Image
      source={{
        uri: 'https://picsum.photos/200',
      }}
      width={36}
      height={36}
      style={{borderRadius: 24, marginRight: 16}}
    />
    <View style={{width: '90%'}}>
      <Text
        style={{
          fontWeight: '600',
          fontSize: 12,
          lineHeight: 14.52,
          color: '#828282',
        }}>
        {commentData.createdBy}
      </Text>
      <Text style={{fontWeight: '400', fontSize: 16, lineHeight: 19.36}}>
        {
          commentData.content
        }
      </Text>
    </View>
  </View>
    )
  }

  const handleComment = () => {
    const newCommentData:CommentData = {
      content: commentInput,
      createdBy: 'Asep',
      date: '22-10-2023'
    }
    handleAddComment(postContentData.id, newCommentData)
    setCommentInput('')
  }

  useFocusEffect(
    React.useCallback(() => {
      setCommentInput('');
    }, [route.params])
  );

  return (
    <SafeAreaView>
      <ScrollView style={{marginBottom: 48}}>
        <View>
          <View
            style={{
              height: 64,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={IconBack}
                height={18}
                width={18}
                style={{marginLeft: 22}}
              />
            </Pressable>
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
                {postContentData?.postedBy ?? '-' }
              </Text>
              <Text style={{fontWeight: '400', fontSize: 12, lineHeight: 18}}>
                {postContentData?.date ?? '-'}
              </Text>
            </View>
          </View>
          <View style={{height: 0.5, backgroundColor: '#C4C4C4'}} />
          <View>
            <Text style={{margin: 24}}>
              {postContentData?.content ?? '-'}
            </Text>
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
                { postContentData?.comment?.length }
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
              <Pressable onPress={() => handleDownvote(postContentData?.id)}>
                <Image
                  source={IconDownvoteInactive}
                  height={18}
                  width={18}
                  style={{marginLeft: 24, backgroundColor: postContentData?.didUpvotes === 'downvotes' ? 'black' : undefined }}
                />
              </Pressable>
              <Text
                style={{
                  width: 24,
                  marginHorizontal: 11,
                  textAlign: 'center',
                }}>
                { postContentData.upvotes }
              </Text>
              <Pressable onPress={() => handleUpvote(postContentData?.id)}>
                <Image
                  source={IconUpvoteInactive}
                  height={18}
                  width={18}
                  style={{marginLeft: 22, backgroundColor: postContentData?.didUpvotes === 'upvotes' ? 'black' : undefined }}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{height: 4, backgroundColor: '#C4C4C4'}} />
        {
          postContentData?.comment?.map((el:CommentData, index:number) => {
            return(
              renderComment(el, index)
            )
          })
        }
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 24,
          zIndex: 10,
        }}>
        <View style={{height: 0.5, backgroundColor: '#C4C4C4'}} />
        <TextInput placeholder="Enter Comment" style={{flex: 1}} value={commentInput} onChangeText={(text) => setCommentInput(text)} />
        <Button title="Comment" onPress={() => handleComment()} />
      </View>
    </SafeAreaView>
  );
}

export default PostDetailScreen;
