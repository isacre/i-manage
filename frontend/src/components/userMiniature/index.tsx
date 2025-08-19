import { UserType } from "@/stores/user-store"
import Image from "next/image"
import defaultAvatar from "@/assets/defaultAvatar.jpg"
import { useRouter } from "next/navigation"
interface Props {
  user: UserType | null
  imageSize?: number
  showNumber?: boolean
}
export default function UserMiniatureComponent({ user, imageSize = 32, showNumber = false }: Props) {
  const router = useRouter()
  return (
    <div className="flex cursor-pointer items-center gap-2" onClick={() => router.push(`/profile`)}>
      <Image
        src={defaultAvatar}
        alt={user?.name || "avatar"}
        width={imageSize}
        height={imageSize}
        className="rounded-full"
      />
      <p>{user?.name}</p>
      {showNumber && <small className="text-xs text-gray-500">{user?.phone}</small>}
    </div>
  )
}
