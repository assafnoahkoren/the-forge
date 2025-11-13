import { Button } from "@repo/ui/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@repo/ui/components/ui/card"

function App() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to The Forge</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>shadcn/ui Components</CardTitle>
            <CardDescription>Beautifully designed components built with Radix UI and Tailwind CSS</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is a demo of our shared UI package with shadcn/ui components.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Learn More</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shared Package</CardTitle>
            <CardDescription>Reusable across all apps in the monorepo</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Import components from @repo/ui and use them anywhere.
            </p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Type Safe</CardTitle>
            <CardDescription>Full TypeScript support out of the box</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All components are fully typed with TypeScript.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="destructive">Delete</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default App
