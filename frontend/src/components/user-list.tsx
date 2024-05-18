"use client";

import { useEffect, useState } from "react";

import { Item } from "./item";
import { Link } from "~/types";
import { Switch } from "./ui/switch";
import { useUser } from "@clerk/nextjs";
import { Label } from "@radix-ui/react-label";

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
			<div className="flex items-center space-x-2">
				<Switch id="only-my-links-switch" checked={onlyMyLinks} onCheckedChange={(checked) => setOnlyMyLinks(checked)} />
				<Label htmlFor="only-my-links-switch">Only my links</Label>
			</div>
			<div className="flex flex-col gap-3">
				{links.map((link: Link, i: number) => (
					<Item key={`item-${i}`} url={link.url} hash={link.PK} />
				))}
			</div>
		</>
	)
}
