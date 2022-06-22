import blog, { ga } from "https://raw.githubusercontent.com/abschill/deno_blog/ga/blog.tsx";

blog({
	avatar: 'https://avatars.githubusercontent.com/u/56945687?s=400&u=8cd0939e45a4df312e55bb83307b8ab3f4bc7407&v=4',
	avatarClass: 'full',
	title: "abschill's blog",
	description: 'welcome',
	author: 'abschill',
	background: "#f9f9f9",
	links: [
		{
			title: 'Github',
			url: 'https://github.com/abschill'
		}
	],
	rssDomain: 'https://blog.abschill.com',
	middlewares: [
		ga('G-SW3B5Q8GL1')
	]
});
