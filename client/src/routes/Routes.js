import { Routes as RouterRoutes, Route, useLocation } from "react-router-dom";
import { Home } from "../components/Home/Home";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { TopPosts } from "../components/TopPosts/TopPosts";
import { PostList } from "../components/PostList/PostList";

import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import PrivateRoutes from "./PrivateRoutes";
import { PostShell } from "../components/PostShell/PostShell";

export const Routes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <AnimatePresence initial={false} mode="wait">
      <RouterRoutes>
        {/* Private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index path="*" element={<TopPosts />} />
            <Route path="posts" element={<PostShell />}>
              <Route index path=":id?" element={<PostList />} />
            </Route>
          </Route>
        </Route>

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/articles/:id/:slug" element={<Article />} />
        // <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/tag/:tagName" element={<Tag />} />
        <Route path="/search" element={<Search />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </RouterRoutes>
    </AnimatePresence>
  );
};
