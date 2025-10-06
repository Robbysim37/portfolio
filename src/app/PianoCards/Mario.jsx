import { Card,CardTitle,CardContent } from "@/components/ui/card"

export default function MarioCard() {
    return(
        <Card className={"w-[45%] cursor-default"}>
            <CardTitle>
            <p className="text-4xl text-center">🍄</p><h2 className="text-center text-2x1">Your Princess is in another Castle...</h2>
            </CardTitle>
            <CardContent>
            <p className="text-center">But your next software developer is right here! Have you found all the jingles yet?</p>
            </CardContent>
        </Card>
    )
}