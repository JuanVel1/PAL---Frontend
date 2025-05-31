import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Exam from "./pages/Exam.tsx";
import Login from "./pages/Login.tsx";
import Users from "./pages/Users.tsx";
import Signup from "./pages/Signup.tsx";
import User from "./Components/User.tsx";
import Courses from "./pages/Courses.tsx";
import Category from "./pages/Category.tsx";
import Categories from "./pages/Categories.tsx";
import ExamResult from "./pages/ExamResult.tsx";
import SubmitExam from "./pages/SubmitExam.tsx";
import NotFound from "./Components/NotFound.tsx";

const router = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/courses", element: <Courses /> },
  { path: "/categories", element: <Categories /> },
  { path: "/api/users/all", element: <Users /> },
  { path: "/api/users/:userId", element: <User /> },
  { path: "/categories/:categoryId", element: <Category /> },
  { path: "/exams/:examId", element: <Exam /> },
  { path: "/exams/results/:examId", element: <ExamResult /> },
  { path: "/exams/submit/:examId", element: <SubmitExam /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
