import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import About from "./components/About";
import ChartOfAccount from "./components/ChartOfAccount";
import TransactionJournal from "./components/TransactionJournal";
import Body from "./components/Body";
import Navbar from "./components/Navbar";

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "chart-of-account",
        element: <ChartOfAccount />,
      },
      {
        path: "transaction-journal",
        element: <TransactionJournal />,
      },
    ],
  }
]);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<RouterProvider router={appRouter} />);