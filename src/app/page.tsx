import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Image

src="/logo.jpeg" alt="ScopeIQ Logo" width={200} height={200}

/>

<h1 className="text-4xl font-bold mt-4">Welcome to ScopeIQ</h1>
<p>ScopeIQ will soon be live.</p>
    </div>
  );
}
