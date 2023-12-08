import { View, Text,TouchableOpacity,Image ,Alert} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import tw from 'twrnc';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { TextInput } from 'react-native';

import React, {useRef,useState} from 'react'
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat/app';

const tukLogo=require("../assets/images/login.png")

export default function InputPhScreen() {
    const [phoneNumber , setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId , setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
        .then(setVerificationId);
        setPhoneNumber('');
    };
    const OtpNoScreen = () => {navigation.navigate("OtpNoScreen")};
    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)
        .then (() =>{
            setCode('');
        })
        .catch((error) =>{
            alert(error);
        })
 Alert.alert(
                            'FingerPrint Authentication',
                            'Would you like to authenticate using fingerprint ?',
                            [
                              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                              {text: 'Yes', onPress: this.onButtonPress},
                            ],
                            { cancelable: false }
                          )


     onButtonPress = () => {
        navigation.navigate("SignUpSreen")
       }
    } 

    
  const navigation = useNavigation();

    return ( 
        
            <View style={tw`flex-1 bg-white`}>
                <SafeAreaView style={tw`flex`}>
                    <View style={tw`flex-row justify-start bg-orange-400`}>
                        <TouchableOpacity style={tw`bg-orange-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2`} onPress={() => navigation.goBack()}>
                            <ArrowLeftIcon size="20" color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={tw`flex-1 justify-center items-center mt-15`}>
                                <Image source={tukLogo} style={{width:150,height:150}}/>
                                <Text style={tw`text-orange-400 font-bold text-4xl tracking-wide leading-normal`}>Tuk-Tuk </Text>
                    </View>
                </SafeAreaView>
                <View style={tw`flex-1 px-8 pt-8 mt-5 bg-white rounded-t-10 `}>
                    <View style={tw`form space-y-2`}>

                    <FirebaseRecaptchaVerifierModal
            ref = {recaptchaVerifier}
            firebaseConfig={firebaseConfig}
        />

                        <Text style={tw`text-gray-700 ml-4 mb-20 font-bold text-xl text-center`}>Enter Phone Number</Text>
                    
                        <TextInput style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5 text-center`} 
                         
                         placeholder='Phone number with Country code'
                            onChangeText={setPhoneNumber}
                             keyboardType='phone-pad'
                             autoCompleteType='tel'
                         />

                        
                        <TouchableOpacity style={tw`py-3 rounded-full bg-orange-400 mb-10`} onPress={sendVerification}>
                        <Text style={tw`font-xl font-bold text-center text-white  text-base`}>Continue</Text>
                        </TouchableOpacity>

                        <TextInput style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-20 text-center`} 
                         
                        placeholder='Confirm Code'
                        onChangeText={setCode}
                        keyboardType='number-pad'
                         />

                        <TouchableOpacity style={tw`py-3 rounded-full bg-orange-400`} onPress={confirmCode}>
                        <Text style={tw`font-xl font-bold text-center text-white text-base`}>Confirm Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

    )
}