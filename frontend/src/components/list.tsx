import { UserList } from "./user-list";

export async function List() {
	const allLinks = await fetch(`${process.env.API_URL ?? ""}/links`).then((res) => res.json());
	return <UserList allLinks={allLinks} />;
}
