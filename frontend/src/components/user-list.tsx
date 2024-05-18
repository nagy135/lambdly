"use client";

import { useEffect, useState } from "react";

import { Item } from "./item";
import { Link } from "~/types";
import { Switch } from "./ui/switch";
import { useUser } from "@clerk/nextjs";

type UserListProps = {
	allLinks: Link[];
};

export function UserList({ allLinks }: UserListProps) {
	const user = useUser();
	const [links, setLinks] = useState<Link[]>(allLinks);
	const [onlyMyLinks, setOnlyMyLinks] = useState<boolean>(false);

	useEffect(() => {
		const userId = user?.user?.id;
		if (!userId) return; // never happens we are behind clerk provider

		if (onlyMyLinks) {
			fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ""}/links?userId=${userId}`)
				.then((res) => res.json())
				.then((links) => setLinks(links));
		} else {
			setLinks(allLinks);
		}

	}, [onlyMyLinks]);

	return (
		<>
			<Switch checked={onlyMyLinks} onCheckedChange={(checked) => setOnlyMyLinks(checked)} />
			<div className="flex flex-col gap-3">
				{links.map((link: Link, i: number) => (
					<Item key={`item-${i}`} url={link.url} hash={link.PK} />
				))}
			</div>
		</>
	)
}
