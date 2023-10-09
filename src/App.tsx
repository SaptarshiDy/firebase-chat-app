import React,{ useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './stack/Auth';
import GuestStack from './stack/Guest';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { retrieveSession } from './redux/slices/auth';
import LeadingModal from './components/LoadingModal';

const App = () => {
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(retrieveSession())
    }, [])

    return (
        <NavigationContainer>
            {
                auth.isAuthenticated ? 
                    <AuthStack />
                    :
                    <GuestStack />
            } 
            <LeadingModal isLoading={auth.isLoading} />
        </NavigationContainer>
    );
}

export default App;