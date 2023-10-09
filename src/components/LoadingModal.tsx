import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

const LeadingModal = ({isLoading}) => {
    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isLoading}
                onRequestClose={() => {}}
            >
                <View
                    style={{backgroundColor: 'rgba(0,0,0,0.5)'}} 
                    className='flex h-screen items-center justify-center'
                >
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            </Modal>
        </View>
    );
}

export default LeadingModal;