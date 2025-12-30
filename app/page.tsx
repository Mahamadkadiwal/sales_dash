import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/auth/signIn');
  return (
    <div className="flex min-h-screen items-center justify-center ">
      
    </div>
  );
}
