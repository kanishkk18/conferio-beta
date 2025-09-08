import Image from "next/image";
import { Button } from "./button";

export default function Component() {
  return (
    <div className="flex -space-x-3">
      <Image
        className="rounded-full ring-2 ring-background"
        src="https://c.saavncdn.com/757/Bandish-Bandits-Season-2-Original-Series-Soundtrack-Hindi-2024-20241121181020-500x500.jpg"
        width={40}
        height={20}
        alt="Avatar 01"
      />
      <Image
        className="rounded-full ring-2 ring-background"
        src="https://c.saavncdn.com/757/Bandish-Bandits-Season-2-Original-Series-Soundtrack-Hindi-2024-20241121181020-500x500.jpg"
        width={40}
        height={20}
        alt="Avatar 02"
      />
      <Image
        className="rounded-full ring-2 ring-background"
        src="https://c.saavncdn.com/757/Bandish-Bandits-Season-2-Original-Series-Soundtrack-Hindi-2024-20241121181020-500x500.jpg"
        width={40}
        height={20}
        alt="Avatar 03"
      />
      <Image
        className="rounded-full ring-2 ring-background"
        src="https://c.saavncdn.com/757/Bandish-Bandits-Season-2-Original-Series-Soundtrack-Hindi-2024-20241121181020-500x500.jpg"
        width={40}
        height={20}
        alt="Avatar 04"
      />
      <Button
        variant="secondary"
        className="flex size-10 items-center justify-center rounded-full bg-secondary text-xs text-muted-foreground ring-2 ring-background hover:bg-secondary hover:text-foreground"
        size="icon"
      >
        +3
      </Button>
    </div>
  );
}
