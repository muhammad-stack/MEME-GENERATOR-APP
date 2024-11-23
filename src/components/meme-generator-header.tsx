import Link from "next/link";
import { Laugh, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { redirect } from "next/navigation";

export function MemeGeneratorHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center flex-1">
          <Link className="flex items-center space-x-2 mr-4" href="/">
            <Laugh className="h-6 w-6" />
            <span className="font-bold text-lg">MemeGen</span>
          </Link>
          <form
            action={async (formData : FormData) => {
              "use server";
              const search = formData.get("search");
              if (search) {
                redirect(`/meme?q=${search}`);
              }
            }}
            className="hidden sm:flex items-center w-full max-w-sm space-x-2"
          >
            <Input
              type="search"
              placeholder="Search memes..."
              name="search"
              className="w-full"
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/create"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Create
          </Link>
          <Link
            href="/memes"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Memes
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          {/* <ModeToggle /> */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col space-y-4 mt-4">
                <Link
                  href="/create"
                  className="text-lg font-medium hover:underline"
                >
                  Create
                </Link>
                <Link
                  href="/gallery"
                  className="text-lg font-medium hover:underline"
                >
                  Gallery
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-medium hover:underline"
                >
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
