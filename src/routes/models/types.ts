import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type propsNavigationTab = {
  Produtos: undefined;
  Avaliacao: {
    id: string;
  };
};

export type propsNavigationStack = {
  Home: undefined;
  Tabs: undefined;
};

export type propsTab = BottomTabNavigationProp<propsNavigationTab>;
export type propsStack = StackNavigationProp<propsNavigationStack>;
