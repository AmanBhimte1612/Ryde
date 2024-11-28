import { Image, Text, View } from "react-native"
import CustomButton from "@/components/CustomButton"
import {icons} from "@/constants"

const OAuth=()=>{

    const handleGoogleSignIn= async()=>{
        
    }
    return(
        <View>

        <View className="flex flex-row justify-center items-center mt-2 gap-x-3">
            <View className="flex-1 flex-row h-[1px] bg-general-100"/>
            <Text className="text-lg">Or</Text>
            <View className="flex-1 flex-row h-[1px] bg-general-100"/>
        </View>
            <View>

            <CustomButton title="Log in with Google"
            className="mt-2  w-full shadow-none"

            IconLeft={()=>(
                <Image 
                source={icons.google}
                resizeMode="contain"
                className="w-5 h-5 mx-2"/>
            )}
            bgVariant="outline"
            textVariant="primary"
            onPress={handleGoogleSignIn}
            />
            </View>
        </View>
    )
}
export default OAuth