import blog from "https://raw.githubusercontent.com/abschill/deno_blog/main/blog.tsx";

blog({
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
	rssDomain: 'https://blog.abschill.com'
});
