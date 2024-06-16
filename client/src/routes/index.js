import Homepage from "../pages/Homepage/Homepage";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import SignUp from "../pages/SignUp/SignUp";
import LogIn from "../pages/LogIn/LogIn";
import EditPost from "../components/EditPost/EditPost";

export const routes = [
  {
    path: '/',
    page: Homepage,
    isShowHeader: true,
    isPrivate: true
  },
  {
    path: '/profile',
    page: Profile,
    isShowHeader: true,
    isPrivate: true
  },
  {
    path: '/login',
    page: LogIn,
    isShowHeader: true
  },
  {
    path: '/signup',
    page: SignUp,
    isShowHeader: true
  },
  {
    path: '/edit-post/:postId',
    page: EditPost,
    isShowHeader: true,
    isPrivate: true
  },
  {
    path: '*',
    page: NotFound
  }
];
