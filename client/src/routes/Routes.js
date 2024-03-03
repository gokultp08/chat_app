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
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index path="*" element={<TopPosts />} />
            <Route path="posts" element={<PostShell />}>
              <Route index path=":postType?" element={<PostList />} />
            </Route>
          </Route>
        </Route>
      </RouterRoutes>
    </AnimatePresence>
  );
};
