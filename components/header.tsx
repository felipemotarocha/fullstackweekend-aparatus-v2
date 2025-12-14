import Image from "next/image";
import MenuSheet from "./menu-sheet";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-background flex items-center justify-between px-5 py-6">
      <Link href="/">
        <Image src="/logo.svg" alt="Aparatus" width={91} height={24} />
      </Link>
      <MenuSheet />
    </header>
  );
};

export default Header;
