import { Card,CardTitle,CardContent } from "@/components/ui/card"

export default function WallaceCard() {
    return(
        <Card className={"w-[90%] md:w-[45%] cursor-default"}>
            <CardTitle>
            <p className="text-4xl text-center">🧀</p><h2 className="text-center text-2x1">Cheese Gromit!</h2>
            </CardTitle>
            <CardContent>
            <p className="text-center">Wallace and Gromit is one of my favorite shows, and the lightbulb photo above was inspired by their movie Curse of the Were-Rabbit!</p>
            </CardContent>
        </Card>
    )
}