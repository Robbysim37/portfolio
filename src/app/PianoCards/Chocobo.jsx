import { Card,CardTitle,CardContent } from "@/components/ui/card"

export default function ChocoboCard() {
    return(
        <Card className={"w-[45%] cursor-default"}>
            <CardTitle>
            <p className="text-4xl text-center">🐤</p><h2 className="text-center text-2x1">Go Chocobo, Go!</h2>
            </CardTitle>
            <CardContent>
            <p className="text-center">This was stretching the limit on "recognizable tunes", but I couldn't resist!</p>
            </CardContent>
        </Card>
    )
}