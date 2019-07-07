'use strict';

const POST_SELECTOR = '.v1Nh3.kIKUG._bz0w a';

window.addEventListener('onload', () => {
	let post = document.querySelector(POST_SELECTOR);
	console.log(post);
	post.click();
});
