import { Session } from "next-auth";
import { Logo } from "./HeroHeader";
import ProfileAvatarWithDropdownMenu from "./ProfileAvatarWithDropdownMenu";

const Navbar = ({ session }: { session: Session }) => {
  return (
    <div className="flex w-full px-10 py-4 justify-between items-center">
      <Logo />
      <ProfileAvatarWithDropdownMenu session={session} />
    </div>
  );
};

export default Navbar;
