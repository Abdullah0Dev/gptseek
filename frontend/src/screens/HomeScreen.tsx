/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Markdown from 'react-native-markdown-display';
import {styles} from '../styles';

const HomeScreen = () => {
  const flatListRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const [startedChat, setStartedChat] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [model, setModel] = useState<'V3' | 'R1'>('R1');
  const [testedMessages, setTestedMessages] = useState('');
  const ws = useRef(null);
  const [newMessage, setNewMessage] = useState<Message>({
    message: '',
    sender: 'user',
  });
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const handleScroll = event => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;

    // Check if the user is near the bottom (50% of the screen height)
    const isNotAtBottom =
      contentOffset.y + layoutMeasurement.height <
      contentSize.height - layoutMeasurement.height / 2;

    setShowScrollButton(isNotAtBottom);
  };

  const handleSendMessage = () => {
    if (newMessage.message.trim()) {
      setMessages(preMessages => [
        ...preMessages,
        {
          message: newMessage.message.trim(),
          sender: newMessage.sender,
        },
      ]);
      ws.current.send(
        JSON.stringify({msg: newMessage.message.trim(), model: model}),
      );
      setNewMessage({
        message: '',
        sender: 'user',
      });
    }
  };
  const handleClearChat = () => {
    setMessages([]);
    setNewMessage({
      message: '',
      sender: 'user',
    });
  };
  const handleToggleModel = () => {
    setModel(prev => (prev === 'R1' ? 'V3' : 'R1'));
  };
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8005');
    ws.current = socket;

    if (!socket) {
      return;
    }
    socket.onmessage = async event => {
      // JSON.parse(event)
      console.log('message received ', event.data);
      setMessages(preMessages => {
        const lastMessage = preMessages[preMessages.length - 1];

        // If the last message is from 'assistant', update it
        if (lastMessage?.sender === 'assistant') {
          return preMessages.map((msg, index) =>
            index === preMessages.length - 1
              ? {...msg, message: msg.message + event.data} // Append incoming text
              : msg,
          );
        } else {
          // Otherwise, create a new message entry
          return [
            ...preMessages,
            {
              message: event.data,
              sender: 'assistant',
            },
          ];
        }
      });
      // setTestedMessages(prev => prev + event.data);
    };
    socket.onopen = () => {
      console.log('Connected WS ');
    };
    return () => {
      ws.current.close();
    };
  }, []);

  return (
    <SafeAreaView className="w-full h-full bg-primary flex ">
      {/* top menu */}
      <View className="flex flex-row px-5 items-center justify-between">
        <TouchableOpacity className="opacity-50" disabled>
          <Entypo name="menu" color={'#FFF'} size={30} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-Roboto-Bold">
          Hi, I'm {`GPTSeeker(${model})`}.
        </Text>
        <TouchableOpacity onPress={handleClearChat}>
          <MaterialCommunityIcons
            name="shape-circle-plus"
            color={'#FFF'}
            size={30}
          />
        </TouchableOpacity>
      </View>
      {/* empty welcome chat screen */}
      {/* <Text className="text-white">{testedMessages} as</Text> */}
      <View
        className={` flex-1 ${
          messages.length === 0 && 'justify-center'
        } px-5 pt-5 `}>
        <View>
          <FlatList
            onScroll={handleScroll} // Add this
            scrollEventThrottle={16} // Improves performance
            contentInsetAdjustmentBehavior="automatic"
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            ListHeaderComponent={() => <View className="h-5" />}
            ListFooterComponent={() => <View className="h-5" />}
            ItemSeparatorComponent={() => <View className="h-3" />}
            contentContainerStyle={{paddingBottom: 20}}
            ListEmptyComponent={() => (
              <>
                <View className="self-center items-center flex gap-y-2">
                  <Image
                    source={require('../assets/icons/logo.png')}
                    className="w-24 h-24 self-center "
                    resizeMode="contain"
                  />
                  <Text className="text-white text-2xl font-Roboto-Bold">
                    Hi, I'm {`GPTSeeker(${model})`}.
                  </Text>
                  <Text className="text-[#A0A0A0] text-lg text-center font-Roboto-Bold">
                    How can I help you today?
                  </Text>
                </View>
              </>
            )}
            renderItem={({item}) => (
              <View
                className={`p-5 ${
                  item.sender === 'user'
                    ? 'bg-primary-200 w-4/6 self-end rounded-l-2xl rounded-br-3xl'
                    : ''
                }`}>
                {item.sender === 'user' ? (
                  <Text className="text-white font-Roboto text-lg">
                    {item.message}
                  </Text>
                ) : (
                  <Markdown style={styles}>{item.message}</Markdown>
                )}
              </View>
            )}
          />

          {showScrollButton && (
            <TouchableOpacity
              onPress={() => flatListRef.current.scrollToEnd({animated: true})}
              className="bg-gray-700 p-5 rounded-full absolute self-center bottom-5">
              <Entypo name="chevron-thin-down" color={'#FFFFFFE3'} size={28} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* bottom actions - chat input... */}

      <View className="h-52 bg-primary-300 rounded-3xl">
        <TextInput
          placeholder={`Message GPTSeeker(${model})`}
          className="text-white font-Roboto flex-1 text-lg p-5"
          multiline
          value={newMessage.message}
          onChangeText={text => setNewMessage({sender: 'user', message: text})}
          placeholderTextColor={'#fff'}
        />
        {/* plus - deep think - search - send */}
        <View className="flex flex-row items-center py-3 justify-between mx-3 self-end ">
          <TouchableOpacity disabled className="px-3 opacity-50">
            <Entypo name="plus" color={'#FFFFFFE3'} size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled
            className="flex px-4 py-2 items-center flex-row gap-x-2 opacity-50">
            <AntDesign name="earth" color={'#FFFFFFE3'} size={24} />
            <Text className="text-white/80 text-base font-Roboto">Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleToggleModel}
            className={` flex px-4 py-2 items-center rounded-full flex-row gap-x-2 ${
              model === 'R1' ? 'bg-primary ' : ''
            }`}>
            <Fontisto name="atom" color={'#FFFFFFE3'} size={24} />
            <Text className="text-white/80 text-base font-Roboto">
              DeepThink(R1)
            </Text>
          </TouchableOpacity>
          <View className="flex-1 flex-end items-end">
            <TouchableOpacity
              onPress={handleSendMessage}
              className="flex rounded-full justify-center w-11 h-11 items-center bg-white   flex-row gap-x-2">
              <AntDesign name="arrowup" color={'#000000'} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

interface Message {
  message: string;
  sender: 'user' | 'assistant';
}

const testMessages: Message[] = [
  {
    message: ` Hello, how are you?
    
   iOS and Android with a single codebase.
Instead of rendering web components like
React, React Native uses native
components, making apps feel smooth and
fast.`,
    sender: 'user',
  },
  {
    message: 'am fine how about you?',
    sender: 'assistant',
  },
  {
    message: 'What is react native?',
    sender: 'user',
  },
  {
    message: `# React Native is a framework for building
 mobile apps *using** JavaScript and React. It

  allows you to create cross-platform apps for
 iOS and Android with a single codebase.
Instead of rendering web components like
React, React Native uses native
components, making apps feel smooth and
fast.
Key features:
• Cross-platform: Write once, run on both
iOS and Android.`,
    sender: 'assistant',
  },
];
