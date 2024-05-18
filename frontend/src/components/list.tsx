import { Item } from "./item";

export async function List() {
	const allLinks = await fetch(`${process.env.API_URL ?? ""}/links`).then((res) => res.json());
	return (
		<div className="flex flex-col gap-3">
			{allLinks.map((link: { url: string; PK: string }) => (
				<Item url={link.url} hash={link.PK} />
			))}
		</div>
	)
}
