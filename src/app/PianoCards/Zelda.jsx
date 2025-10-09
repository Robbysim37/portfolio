import { Card,CardTitle,CardContent } from "@/components/ui/card"

export default function ZeldaCard() {
    return(
        <Card className={"w-[90%] md:w-[45%] md:mx-32 cursor-default"}>
            <CardTitle>
            <p className="text-4xl text-center">🔑</p><h2 className="text-2x1 text-center">You've unlocked the website!</h2>
            </CardTitle>
            <CardContent>
            <p className="text-center">Now it's time to go explore and see what else you can find!</p>
            </CardContent>
        </Card>
    )
}