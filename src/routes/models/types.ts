import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type propsNavigationStack = {
  Home: undefined;
  Tabs: undefined;
  CadastroUsuario: undefined;
};

export type propsStack = StackNavigationProp<propsNavigationStack>;
