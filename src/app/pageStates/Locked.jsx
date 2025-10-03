
import RotatePhone from "@/components/RotatePhone"
import { Card,CardContent } from "@/components/ui/card"
import PianoUI from "@/components/ui/piano"
import WaveText from "@/components/WaveText"

export default function Locked() {
    return(
        <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh]">
            <WaveText className="mb-16 text-4xl space-x-4" text={"G A B C#"}/>
            <div className="flex sm:hidden">
                <RotatePhone/>
            </div>
            <Card className={"hidden sm:block w-fit h-fit"}>
                <CardContent className={"w-fit h-fit"}>
                    <p className="flex [@media(min-width:700px)]:hidden">This is where the piano would go</p>

                    <div className="hidden [@media(min-width:700px)]:block">
                    <PianoUI/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}