import { FcRotateToLandscape } from "react-icons/fc";

 export default function RotatePhone() {
    return(
        <div className="flex flex-col justify-center items-center">
            <p className="mb-8 text-center">Rotate your device to Landscape Mode and make sure your sound is on!</p>
            <FcRotateToLandscape size={64}/>
        </div>
    )
}