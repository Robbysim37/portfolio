import { FcRotateToLandscape } from "react-icons/fc";

 export default function RotatePhone() {
    return(
        <div className="flex flex-col justify-center items-center">
            <p className="mb-8">Rotate your device to Landscape Mode</p>
            <FcRotateToLandscape size={64}/>
        </div>
    )
}