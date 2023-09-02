import { b as createComponent, s as spreadAttributes, r as renderTemplate, u as unescapeHTML } from './astro_c89a7039.mjs';
import '@astrojs/internal-helpers/path';
import './pages/_slug__73b7ba41.mjs';
import 'clsx';
import 'html-escaper';
/* empty css                         *//* empty css                           *//* empty css                          */
const images = {
					
				};

				function updateImageReferences(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="([^"]+)"/gm,
						(full, imagePath) => spreadAttributes({src: images[imagePath].src, ...images[imagePath].attributes})
					);
				}

				const html = updateImageReferences("<p>Hola Amigos! 🎉 I’m Alejandro Bocchicchio, and if you’re reading this, congrats! You’ve stumbled upon the maiden voyage of my blog—a blog that promises to be as twisty, turny, and unpredictable as my life has been. So buckle up, because if there’s one thing I’ve learned, it’s that life never throws softballs; only curveballs. 🎢</p>\n<h3 id=\"why-curveballs-are-cool\">Why Curveballs are Cool 😎</h3>\n<p>Here’s the thing: if life were a straight road, we’d all be yawning by now. Trust me, straight roads are only good for one thing—falling asleep at the wheel. So why not embrace life’s twists and turns? I know, I know, sometimes life doesn’t just throw curveballs; it’s like you’re in a batting cage set to ‘Expert Level.’ But hey, isn’t that what makes life interesting?</p>\n<p>To illustrate my point, let’s talk about Frodo. Yes, that tiny guy with weirdly hairy feet from ‘The Lord of the Rings.’ If his journey were a straight line, he’d just FedEx the ring to Mordor and call it a day. But it’s the Balrogs, the Gollums, and the Orcs that make his journey epic. So here I am, embracing my inner Frodo, and I invite you to do the same.</p>\n<h3 id=\"spain-or-bust\">Spain or Bust 💃</h3>\n<p>My own epic saga recently took me from the tango-filled streets of Argentina to the sun-kissed terrains of Spain, all in a quest to find the dream job. “Land in Spain, find a cool company, make awesome projects with hilarious folks,” I told myself. Sounds easy, right?</p>\n<p>Ah, my young padawan, how wrong you are! The reality? Hundreds of job applications and exactly zero calls back. But you know what? Each rejection was just another snowball in my avalanche of determination. The more “Nos” I heard, the more I found myself asking, “How can I stand out?”</p>\n<h3 id=\"being-different-not-just-better\">Being Different, Not Just Better 🌈</h3>\n<p>Back to the drawing board I went. Asking questions like, “Who would want to hire me?” and “What unique skills do I bring to the table?” The answers to those soul-searching questions? This blog. I want to stand out, but not by being better—by being different. We live in a world splashed with all shades of characters; let’s not blend into a muddy black by trying to be like each other.</p>\n<h3 id=\"the-road-ahead-️\">The Road Ahead 🛣️</h3>\n<p>So here it is, the launch of my blog—my very own personal Twitter (RIP Twitter by the way). And just like me, this blog is a work in progress. I’ll be showcasing my adventures, my skills, and my ever-growing expertise right here.</p>\n<p>Hasta la vista! 🚀</p>");

				const frontmatter = {"title":"The Journey Begins, From Argentina to Spain, One Curveball at a Time","slug":"the-journey-begins-argentina-to-spain","excerpt":"Ever felt like life's constantly throwing curveballs your way? Me too. Hop in, and let's navigate this rollercoaster called life. From job hunting in Spain to finding my voice, this is my adventure—and it's only just begun.","date":"2023-08-24T00:00:00.000Z","author":"Alejandro Bocchicchio"};
				const file = "C:/ZZMisc/Astro/astro-blog/src/posts/2023-08-24.md";
				const url = undefined;
				function rawContent() {
					return "\r\nHola Amigos! 🎉 I'm Alejandro Bocchicchio, and if you're reading this, congrats! You've stumbled upon the maiden voyage of my blog—a blog that promises to be as twisty, turny, and unpredictable as my life has been. So buckle up, because if there's one thing I've learned, it's that life never throws softballs; only curveballs. 🎢\r\n\r\n### Why Curveballs are Cool 😎\r\n\r\nHere's the thing: if life were a straight road, we'd all be yawning by now. Trust me, straight roads are only good for one thing—falling asleep at the wheel. So why not embrace life's twists and turns? I know, I know, sometimes life doesn't just throw curveballs; it's like you're in a batting cage set to 'Expert Level.' But hey, isn't that what makes life interesting?\r\n\r\nTo illustrate my point, let's talk about Frodo. Yes, that tiny guy with weirdly hairy feet from 'The Lord of the Rings.' If his journey were a straight line, he'd just FedEx the ring to Mordor and call it a day. But it's the Balrogs, the Gollums, and the Orcs that make his journey epic. So here I am, embracing my inner Frodo, and I invite you to do the same.\r\n\r\n### Spain or Bust 💃\r\n\r\nMy own epic saga recently took me from the tango-filled streets of Argentina to the sun-kissed terrains of Spain, all in a quest to find the dream job. \"Land in Spain, find a cool company, make awesome projects with hilarious folks,\" I told myself. Sounds easy, right?\r\n\r\nAh, my young padawan, how wrong you are! The reality? Hundreds of job applications and exactly zero calls back. But you know what? Each rejection was just another snowball in my avalanche of determination. The more \"Nos\" I heard, the more I found myself asking, \"How can I stand out?\"\r\n\r\n### Being Different, Not Just Better 🌈\r\n\r\nBack to the drawing board I went. Asking questions like, \"Who would want to hire me?\" and \"What unique skills do I bring to the table?\" The answers to those soul-searching questions? This blog. I want to stand out, but not by being better—by being different. We live in a world splashed with all shades of characters; let's not blend into a muddy black by trying to be like each other.\r\n\r\n### The Road Ahead 🛣️\r\n\r\nSo here it is, the launch of my blog—my very own personal Twitter (RIP Twitter by the way). And just like me, this blog is a work in progress. I'll be showcasing my adventures, my skills, and my ever-growing expertise right here.\r\n\r\nHasta la vista! 🚀\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":3,"slug":"why-curveballs-are-cool","text":"Why Curveballs are Cool 😎"},{"depth":3,"slug":"spain-or-bust","text":"Spain or Bust 💃"},{"depth":3,"slug":"being-different-not-just-better","text":"Being Different, Not Just Better 🌈"},{"depth":3,"slug":"the-road-ahead-️","text":"The Road Ahead 🛣️"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${unescapeHTML(html)}`;
				});
				Content[Symbol.for('astro.needsHeadRendering')] = true;

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, images, rawContent, url };
