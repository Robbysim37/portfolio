
import RotatePhone from "@/components/RotatePhone"
import { Card,CardContent } from "@/components/ui/card"
import PianoUI from "@/components/ui/piano"
import WaveText from "@/components/WaveText"

export default function Locked() {
    return(
        <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] mt-16">
            <WaveText className="mb-16 text-4xl space-x-4" text={"G A B C#"}/>
            
            <Card className={"h-fit"}>
                <CardContent className={"w-fit h-fit"}>
                    <div className="flex sm:hidden">
                        <RotatePhone/>
                    </div>

                    <div className="hidden [@media(min-width:700px)]:block">
                    <PianoUI/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}