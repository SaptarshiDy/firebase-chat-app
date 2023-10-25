import Login from '../screens/Login';
import ChatList from '../screens/ChatList';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';
import Base from '../screens/Base';

const AUTH_ROUTE = {
    Base: {
        name: 'Base',
        screen: Base,
    },
    ChatList: {
        name: 'Chats',
        screen: ChatList,
    },
    Chat: {
        name: 'Chat',
        screen: Chat,
    },
    Profile: {
        name: 'Profile',
        screen: Profile,
    },
}

const GUEST_ROUTE = {
    Login: {
        name: 'Login',
        screen: Login,
    },
}

export { AUTH_ROUTE, GUEST_ROUTE }