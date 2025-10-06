import { Card,CardTitle,CardContent } from "@/components/ui/card"

export default function EntertainerCard() {
    return(
        <Card className={"w-[45%] cursor-default"}>
            <CardTitle>
            <p className="text-4xl text-center">🎹</p><h2 className="text-center">An oldie, but a goodie!</h2>
            </CardTitle>
            <CardContent>
            <p className="text-center">Probably not the best version of "The Entertainer" out there, but I hope you enjoyed!</p>
            </CardContent>
        </Card>
    )
}