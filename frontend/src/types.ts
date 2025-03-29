import {NavigatorScreenParams} from '@react-navigation/native';

// Params for Tab Navigator
export type TabParamList = {
  Home: undefined;
  Profile: undefined;
};

// Params for Root Stack
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  Settings: undefined;
};

// Params for Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
