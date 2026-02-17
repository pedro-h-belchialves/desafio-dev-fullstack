import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex  border-b border-border md:px-8 py-4 w-full items-center justify-center">
      <Link href="/" className="text-foreground flex  float-left">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/logo_one.png"
            alt="Next.js Logo"
            width={40}
            height={20}
            priority
          />

          <span className="text-2xl font-bold">UC LIVRE</span>
        </div>
      </Link>
    </header>
  );
};
