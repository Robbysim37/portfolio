import { Card, CardContent } from "@/components/ui/card";
import PianoUI from "@/components/ui/piano";

export default function Unlocked() {
return (<div className="flex-col justify-center">

      <section id="home" className="min-h-screen">
        
      </section>
      <section id="piano" className="w-full h-[100vh] flex justify-center">
        <Card className={"h-fit"}>
          <CardContent className={"w-fit h-fit"}>
            <p className="flex [@media(min-width:700px)]:hidden">This is where the piano would go</p>

            <div className="hidden [@media(min-width:700px)]:block">
              <PianoUI/>
            </div>
          </CardContent>
        </Card>
      </section>
      <section id="skills" className="w-full h-[100vh]"></section>
      <section id="contact" className="w-full h-[100vh]"></section>
    </div>
    )}