"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SignedIn } from "@clerk/nextjs";

const formSchema = z.object({
	url: z.string().url(),
})

export function Insert() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			url: ""
		}
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		console.log(data);
	}

	return (
		<SignedIn>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="url"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Url</FormLabel>
								<FormControl>
									<Input placeholder="https://google.com" {...field} />
								</FormControl>
								<FormDescription>
									Url you want to make minified version from
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</SignedIn>
	)
}
