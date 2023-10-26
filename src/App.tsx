import React,{ useEffect } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import AuthStack from './stack/Auth';
import GuestStack from './stack/Guest';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { retrieveSession } from './redux/slices/auth';
import LeadingModal from './components/LoadingModal';

const navigationRef = createNavigationContainerRef();
export const navigate = (name: string, params: object) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, { user: params });
    }
}

const App = () => {
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(retrieveSession())
    }, [])

    return (
        <NavigationContainer ref={navigationRef}>
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