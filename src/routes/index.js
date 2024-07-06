import Homepage from "../pages/Homepage/Homepage";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import SignUp from "../pages/SignUp/SignUp";
import LogIn from "../pages/LogIn/LogIn";
import PostDetail from "../pages/PostDetail/PostDetail";
import OtherUser from "../pages/OtherUser/OtherUser";
import EditProfile from "../pages/EditProfile/EditProfile";

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
    path: '/post-detail/:postId',
    page: PostDetail,
    isShowHeader: true,
    isPrivate: true
  },
  {
    path: '/other/:id',
    page: OtherUser,
    isShowHeader: true,
    isPrivate: true
  },
  {
    path: '/edit-profile',
    page: EditProfile,
    isShowHeader: true,
    isPrivate: true
  },
  {
    path: '*',
    page: NotFound
  }
];
