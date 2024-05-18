import { Insert } from "~/components/insert";
import { List } from "~/components/list";

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">
				Lambdly
			</h1>
			<div className="flex flex-col gap-8">
				<Insert />
				<List />
			</div>
		</main>
	);
}
