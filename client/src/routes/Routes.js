import { Routes as RouterRoutes, Route, useLocation } from "react-router-dom";
import { Home } from "../components/Home/Home";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export const Routes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <AnimatePresence initial={false} mode="wait">
      <RouterRoutes>
        {/* Private routes */}
        {/* <Route element={<PrivateRoutes />}>
          <Route path="/add-article" element={<AddArticle />} />
          <Route path="/edit-article/:id" element={<EditArticle />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/user/:id/following" element={<Follow />} />
          <Route path="/user/:id/followers" element={<Follow />} />
          <Route path="/user/edit-profile" element={<EditProfile />}>
            <Route index path="*" element={<ProfileSettings />} />
            <Route path="account" element={<AccountSettings />} />
          </Route>
          <Route path="/reading-list" element={<ReadingList />} />
        </Route> */}

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/articles/:id/:slug" element={<Article />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/tag/:tagName" element={<Tag />} />
        <Route path="/search" element={<Search />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </RouterRoutes>
    </AnimatePresence>
  );
};
