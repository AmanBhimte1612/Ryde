import { Redirect } from 'expo-router';
import {View,Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@clerk/clerk-expo'

import { LogBox } from 'react-native';



const Home=()=>{
    const { isSignedIn } = useAuth()
    
    if (isSignedIn) {
      return <Redirect href={'/(root)/(tabs)/home'} />
    }
    LogBox.ignoreLogs([
      '[Reanimated] Reduced motion setting is enabled on this device.',
    ]);
    return(
        <Redirect href="/(auth)/welcome"/>
    );
};

export default Home;