import { Metadata } from "next"

async function getData(id: string) {
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
		next: {
			revalidate: 60
		}
	})
	return response.json()
}

type Props = {
	params: {
		id: string
	}
}
export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
	const post = await getData(id)
	return {
		title: post.title,
	}
}

const Post = async ({ params: { id } }: Props) => {
	const post = await getData(id)
	return (
		<div>
			<h1 className="font-bold text-2xl text-center">{post.title}</h1>
			<p>{post.body}</p>
		</div>
	)
}

export default Post
