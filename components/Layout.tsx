import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="bg-gray-100 p-10 h-full pt-20 grid place-content-center">
        <div className="container mx-auto h-full">{children}</div>
      </div>
      <ToastContainer />
    </div>
  );
}
