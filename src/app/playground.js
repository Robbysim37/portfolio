import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { useModal } from "@/components/ModalProvider"
import PianoUI from "@/components/ui/piano"

export default function Playground() {
  const { openModal } = useModal()

  return (
    <main className="p-10 space-y-8 w-full max-w-screen overflow-x-hidden">
      {/* Headings */}
      <section>
        <h1 className="text-4xl font-bold">Heading 1</h1>
        <h2 className="text-3xl font-semibold">Heading 2</h2>
        <h3 className="text-2xl font-medium">Heading 3</h3>
        <p className="mt-2 text-muted-foreground">
          This is a paragraph of text. It uses your Tailwind theme colors.
        </p>
      </section>

      {/* Buttons */}
      <section className="space-x-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button disabled>Disabled</Button>
      </section>

      {/* Card */}
      <section>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is some example card content.</p>
          </CardContent>
          <CardFooter>
            <Button>Action</Button>
          </CardFooter>
        </Card>
      </section>

      {/* Modal button */}
      <section>
        <Button
          onClick={() =>
            openModal(
              <div>
                <PianoUI />
              </div>
            )
          }
        >
          Open Modal
        </Button>
      </section>
    </main>
  )
}
