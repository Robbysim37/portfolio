import { Card,CardTitle,CardContent } from "@/components/ui/card"

export default function LockedCard(props) {
    return(
        <Card className={"w-[90%] md:w-[45%] cursor-default"}>
            <CardTitle>
            <p className="text-4xl text-center">🔒</p><h2 className="text-2x1 text-center">Song not yet played...</h2>
            </CardTitle>
            <CardContent>
            <p className="text-center">{props.clue}</p>
            </CardContent>
        </Card>
    )
}