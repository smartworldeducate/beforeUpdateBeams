import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  GiftedChat,
  InputToolbar,
  Composer,
  Send,
} from 'react-native-gifted-chat';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
        sent: true,
        received: true,
        pending: true,
        alwaysShowSend: true,
      },
    ]);
  }, []);

  const onSend = val => {
    // console.log('val', val);
    const msgDetail = val[0];
    // console.log('msgDetail', msgDetail);
    // console.log('msgDetailText', msgDetail?.text);
    // console.log('msgDetailUserId', msgDetail?.user?._id);

    const msgCompleteDetail = {
      ...msgDetail,
      sentBy: 'umair',
      sentTo: msgDetail?.user?._id,
      sendingDate: new Date(),
    };

    // console.log('msgCompleteDetail', msgCompleteDetail);

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, msgCompleteDetail),
    );

    Keyboard.dismiss();
  };

  console.log('messages', messages);

  const renderCustomInputToolbar = props => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  };

  const renderCustomComposer = props => {
    return <Composer {...props} textInputStyle={styles.textInput} />;
  };

  const renderSendButton = props => {
    return (
      <Send {...props} containerStyle={styles.sendButtonContainer}>
        <View>
          <Text style={styles.sendButtonText}>Send</Text>
        </View>
      </Send>
    );
  };

  const array1 = [1, 2, 3];
  const array2 = [4, 5, 6];
  const combinedArray = [...array1, ...array2];

  const renderItem = ({item, index}) => {
    return <Text style={{color: 'black'}}>{item}</Text>;
  };

  const objectOne = {
    id: 1,
    name: 'Asim',
    age: 30,
  };

  const objectTwo = {
    city: 'lahore',
    street: 'Eleven',
    province: 'Punjab',
  };

  const combinedObject = {...objectOne, ...objectTwo};

  const formatObjectEntries = obj =>
    Object.entries(obj).map(([key, value]) => ({key, value}));

  const combinedObjectData = formatObjectEntries(combinedObject);

  const renderObjectItems = ({item, index}) => {
    return <Text style={{color: 'black'}}>{item?.value}</Text>;
  };

  const arrayHere1 = [1, 2, 3];
  arrayHere1.push(4);
  // console.log('arrayHere1', arrayHere1);

  const arrayHere2 = ['a', 'b', 'c'];
  const arrayHere3 = 'd';
  const combinedArray4 = [...arrayHere2, arrayHere3];
  // console.log('combinedArray4', combinedArray4);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <View style={{flex: 1, marginBottom: hp('6')}}>
        <ImageBackground
          source={{
            uri: 'https://e0.pxfuel.com/wallpapers/875/426/desktop-wallpaper-i-whatsapp-background-chat-whatsapp-graffiti-thumbnail.jpg',
          }}
          style={styles.backgroundImage}
          resizeMode="cover">
          <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
              _id: 1,
            }}
            renderInputToolbar={renderCustomInputToolbar}
            renderComposer={renderCustomComposer}
            renderSend={renderSendButton}
            placeholder={'Type your desired message...'}
          />
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>

    // <>
    //   <FlatList
    //     data={combinedArray}
    //     renderItem={renderItem}
    //     keyExtractor={(item, index) => index.toString()}
    //   />

    //   <FlatList
    //     data={combinedObjectData}
    //     renderItem={renderObjectItems}
    //     keyExtractor={(item, index) => index.toString()}
    //   />
    // </>
  );
};

const styles = StyleSheet.create({
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: hp('7.75'),
    padding: 5,
  },
  textInput: {
    color: 'blue',
    fontSize: 16,
    paddingVertical: 0,
    marginVertical: 0,
    paddingHorizontal: 10,
  },
  sendButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0.5,
    marginRight: 10,
    backgroundColor: '#646464', // Button background color
    borderRadius: wp('1'), // Rounded button
    paddingHorizontal: wp('5'),
  },
  sendButtonText: {
    color: 'white', // Text color
    fontWeight: 'bold',
    fontSize: hp('1.25'),
  },
  backgroundImage: {
    flex: 1,
  },
});

export default ChatScreen;
