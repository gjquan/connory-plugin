'use strict';

const FEED_URL = 'https://www.instagram.com/explore/tags/connoryeverafter/';
const POST_DISPLAY_TIME = 5000;

function addLoadCallback(callback) {
  if (document.readyState === 'complete') {
    callback();
  } else {
    window.addEventListener('load', callback);
  }
}

function startFeed() {
	const PAGE_POST_SELECTOR = '.v1Nh3.kIKUG._bz0w a';

	let post = document.querySelector(PAGE_POST_SELECTOR);
	post.click();
	_playCurrentPostVideo();

	let interval = setInterval(_advanceFeed, POST_DISPLAY_TIME);
}

function _advanceFeed() {
	const POST_NEXT_SELECTOR = 'button._6CZji';
	const PAGINATION_NEXT_SELECTOR = '.coreSpriteRightPaginationArrow';

	let nextPost;
	let nextImage;
	let mediaPlay;

	nextImage = document.querySelector(POST_NEXT_SELECTOR);
	if (nextImage) {
		nextImage.click();
		_playCurrentPostVideo();
		return;
	}

	nextPost = document.querySelector(PAGINATION_NEXT_SELECTOR);
	if (nextPost) {
		nextPost.click();
		_playCurrentPostVideo();
		return;
	}

	// no next post; back to the beginning
	// disabled during testing
	// window.location.href = FEED_URL;
	return;
}

function _playCurrentPostVideo() {
	const VIDEO_PLAY_SELECTOR = 'a.QvAa1';

	let currentPost = _currentPost();
	if (_postHasStoppedVideo(currentPost)) {
		currentPost.querySelector(VIDEO_PLAY_SELECTOR).click();
	}
}

function _currentPost() {
	const POPUP_POST_SELECTOR = '.M9sTE .OAXCp';
	const CAROUSEL_CONTAINER_SELECTOR = '.MreMs';

	let posts = document.querySelectorAll(POPUP_POST_SELECTOR);
	if (!posts) {
		return;
	}

	if (posts.length === 1) {
		return posts[0];
	}
}

function _postHasStoppedVideo(post) {
	const VIDEO_PLAY_GLYPH_VISIBLE_SELECTOR = '.videoSpritePlayButton.PTIMp';

	return post.querySelector(VIDEO_PLAY_GLYPH_VISIBLE_SELECTOR);
}

addLoadCallback(startFeed);
