'use strict';

const FEED_URL = 'https://www.instagram.com/explore/tags/connoryeverafter/';
const POST_SELECTOR = '.v1Nh3.kIKUG._bz0w a';
const POST_DISPLAY_TIME = 30000;
const POST_NEXT_SELECTOR = 'button._6CZji';
const VIDEO_PLAY_SELECTOR = 'a.QvAa1';
const PAGINATION_NEXT_SELECTOR = '.coreSpriteRightPaginationArrow';

function addLoadCallback(callback) {
  if (document.readyState === 'complete') {
    callback();
  } else {
    window.addEventListener('load', callback);
  }
}

function advanceFeed() {
	let nextPost;
	let nextImage;
	let mediaPlay;

	nextImage = document.querySelector(POST_NEXT_SELECTOR);
	if (nextImage) {
		nextImage.click();
		// TODO: check and play media
	}
	else {
		next = document.querySelector(PAGINATION_NEXT_SELECTOR);
	}

	if (next) {
		next.click();
		// TODO: check and play media
	}
	else {
		window.location.href = FEED_URL;
	}
}

function startFeed() {
	let post = document.querySelector(POST_SELECTOR);
	post.click();

	let interval = setInterval(advanceFeed, POST_DISPLAY_TIME);
}

addLoadCallback(startFeed);
