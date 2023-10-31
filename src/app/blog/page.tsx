import { Metadata } from 'next'
import Link from 'next/link'

async function getData() {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
		next: {
			revalidate: 60
		}
	})
	if (!response.ok) throw new Error("Unable to fetch posts!")

	return response.json()
}


export const metadata: Metadata = {
	title: "Blog | Next App"
}

const Blog = async () => {
	const posts = await getData()
	return (
		<>
			<h1 className='text-3xl font-bold text-center'>Blog page</h1>
			<ul className='list-disc'>
				{posts.map((post: any) => (
					<li className='hover:underline' key={post.id}>
						<Link href={`/blog/${post.id}`}>{post.title}</Link>
					</li>
				))}
			</ul>
		</>
	)
}

export default Blog
