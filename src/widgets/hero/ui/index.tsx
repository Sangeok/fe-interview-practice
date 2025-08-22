import Button from "@/src/shared/ui/atoms/button/ui/Button";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-white text-4xl font-bold animate-fade-up-1">Practice Frontend Interview</h1>
        <p className="text-zinc-400 text-lg animate-fade-up-2">Practice Frontend Interview with AI.</p>
      </div>

      <div className="flex items-center animate-fade-up-2">
        <Button variant="light">
          <Link href="/projects">Try now</Link>
        </Button>
      </div>
    </>
  );
}
