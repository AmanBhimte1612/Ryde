import { View,Image, Text, ScrollView,} from 'react-native'
import { Link, router } from "expo-router";
import React, { useCallback, useState } from 'react'
import InputField from '@/components/InputField'
import CustomButton from '@/components/CustomButton'
import OAuth from '@/components/OAuth'
import {images,icons} from '@/constants'
import { useSignIn } from '@clerk/clerk-expo'
import {  useRouter } from 'expo-router'

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()


  const [form, setForm] = useState(
    {
    email:'',
    password:'',}
  
  )
  const onSignInPress =useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password:form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, form.email, form.password])
  

  return (
    <ScrollView className='flex-1 bg-white' >
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">

          <Image 
          className='x-0 w-full h-[255px]'
          source={images.signUpCar}/>
          <Text className='text-2xl text-black font-jakartaSemiBold absolute bottom-5 left-5'>Welcome 👋</Text>
        </View>
        <View className='pt-5 pl-5 pr-5'>
          
          <InputField
            label="Email"
            placeholder='Enter your email address'
            icon={icons.email}
            value={form.email}
            onChangeText={(value)=>setForm({...form,email:value})}
          />
          <InputField
            label="Password"
            placeholder='Enter  password'
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value)=>setForm({...form,password:value})}
          />
          <CustomButton title ="Sign In" onPress={onSignInPress} className="mt-6" /> 

          <OAuth/>
          
          <Link href="/sign-up" className="text-lg  text-center text-general-200 mt-5 ">
            <Text>Don't have an account? /{" "}</Text>
            <Text className="text-primary-500">Sign Up</Text>  
          </Link>

          {/*Verification Modal*/}

        </View>
      </View>
    </ScrollView>
  )
}

export default SignIn