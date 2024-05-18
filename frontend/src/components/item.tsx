"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

type ItemProps = {
	url: string;
	hash: string;
};
export function Item({ url, hash }: ItemProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<a href={url}>{url}</a>
				</CardTitle>
				<CardDescription>{hash}</CardDescription>
			</CardHeader>
		</Card>
	)
}
