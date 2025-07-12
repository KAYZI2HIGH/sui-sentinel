import { Session } from 'next-auth'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'
import LogOutBtn from './LogOutBtn'
import { ModeToggle } from './ModeToggle'
import ProfileAvatar from './ProfileAvatar'

const ProfileAvatarWithDropdownMenu = ({session}: {session: Session}) => {
  return (
   <Popover>
             <PopoverTrigger>
               <ProfileAvatar
                 image={session?.user.image || ""}
                 name={session?.user.name || ""}
                 className="size-12 border border-blue-400/60 cursor-pointer"
               />
             </PopoverTrigger>
             <PopoverContent
               className="w-48"
               alignOffset={10}
             >
               <div className="flex flex-col gap-1 justify-center items-center">
                 <ProfileAvatar
                   image={session?.user.image || ""}
                   name={session?.user.name || ""}
                   className="size-24 rounded-full border "
                 />
                 <div className="space-y-1 text-center mt-1">
                   <h1 className="font-medium ">{session?.user.name}</h1>
                   <p className="text-sm max-w-36 truncate">
                     {session?.user.email}
                   </p>
                 </div>
                 <Separator className="mt-2" />
                 <div className="w-full mt-2">
                   <ModeToggle />
                 </div>
                 <Separator className="mt-2" />
                 <div className="mt-1">
                   <LogOutBtn className=" text-red-500 hover:text-red-500 transition-all duration-300 hover:bg-white/0! cursor-pointer " />
                 </div>
               </div>
             </PopoverContent>
           </Popover>
  )
}

export default ProfileAvatarWithDropdownMenu