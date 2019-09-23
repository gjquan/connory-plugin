'use strict';

const BANNER_ID = 'connory-banner';
const FEED_URL = 'https://www.instagram.com/explore/tags/connoryeverafter/';
const STATIC_POST_DISPLAY_TIME = 7500;

function addLoadCallback(callback) {
  if (document.readyState === 'complete') {
    callback();
  } else {
    window.addEventListener('load', callback);
  }
}

function start() {
	_appendHashtagBanner();
	_startFeed();
}

function _appendHashtagBanner() {
	if(!document.getElementById(BANNER_ID)) {
		var banner = document.createElement('div');
		var header = document.createElement('h1');

		header.textContent = "Be a part of our story using #ConnoryEverAfter";
		header.style.height = '8vh';
		header.style.textAlign = 'center';
		header.style.padding = '4vh 0 10px';

		banner.id = BANNER_ID;
		banner.style.fontFamily = 'Amatic';
		banner.style.fontWeight = 700;
		banner.style.fontSize = '10vh';
		banner.style.color = '#68826b'; /* green */
		banner.style.position = 'fixed';
		banner.style.bottom = 0;
		banner.style.display = 'block';
		banner.style.width = '100%';
		banner.style.background = 'rgba(255,255,255,0.9)';
		banner.style.zIndex = '9999999';

		banner.appendChild(header);
		document.body.appendChild(banner);
	}
}

function _startFeed() {
	const PAGE_POST_SELECTOR = '.v1Nh3.kIKUG._bz0w a';

	let post = document.querySelector(PAGE_POST_SELECTOR);
	post.click();
	_playCurrentPost().then(function() {
		_advanceFeed();
	});
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
		_playCurrentPost().then(function() {
			setTimeout(_advanceFeed, 0);
		});
	} else {
		nextPost = document.querySelector(PAGINATION_NEXT_SELECTOR);
		if (nextPost) {
			nextPost.click();
			_playCurrentPost().then(function() {
				setTimeout(_advanceFeed, 0);
			});
		} else {
			// no next post; back to the beginning
			window.location.href = FEED_URL;
			return;
		}
	}
}

function _playCurrentPost() {
	let currentPost = _currentPost();
	let returnPromise = new Promise(function(resolve, reject) {
		if (_postHasStoppedVideo(currentPost)) {
			let currentVideoElement = currentPost.querySelector('video');
			if (currentVideoElement) {
				let playedOnce = false; // keep track of whether the video has looped at least once
				currentVideoElement.muted = true; // can only autplay muted video
				currentVideoElement.addEventListener('timeupdate', function() {
					if (currentVideoElement.currentTime > currentVideoElement.duration / 2) {
						playedOnce = true;
					} else if (playedOnce) {
						resolve(true);
					}
				});
				_playPostVideo(currentPost);
			} else {
				setTimeout(function() { resolve(null); }, STATIC_POST_DISPLAY_TIME);
			}
		} else {
			setTimeout(function() { resolve(null); }, STATIC_POST_DISPLAY_TIME);
		}
	});

	return returnPromise;
}

function _currentPost() {
	const POPUP_SELECTOR = '.M9sTE';
	const POPUP_POST_SELECTOR = POPUP_SELECTOR + ' .OAXCp';
	const CAROUSEL_CONTAINER_SELECTOR = POPUP_SELECTOR + ' .MreMs';

	let posts = document.querySelectorAll(POPUP_POST_SELECTOR);
	if (!posts) {
		return;
	}

	if (posts.length === 1) {
		return posts[0];
	}

	let carouselContainer = document.querySelector(CAROUSEL_CONTAINER_SELECTOR);
	if (carouselContainer) {
		let carouselContainerStyle = carouselContainer.style ? carouselContainer.style.transform : '';
		let carouselContainerWidth = carouselContainer.getBoundingClientRect().width;
		let match = /translateX\(([-0-9]+)px/.exec(carouselContainerStyle);
		if (match) {
			let translateX = parseInt(match[1], 10);
			if (translateX < 0) { translateX *= -1; }

			let currentPostIndex = translateX / carouselContainerWidth;
			if (posts.length > currentPostIndex) {
				return posts[currentPostIndex];
			}
		}
	}
}

function _postHasStoppedVideo(post) {
	const VIDEO_PLAY_GLYPH_VISIBLE_SELECTOR = '.videoSpritePlayButton.PTIMp';

	return post ? post.querySelector(VIDEO_PLAY_GLYPH_VISIBLE_SELECTOR) : false;
}

function _playPostVideo(post) {
	const VIDEO_PLAY_SELECTOR = 'a.QvAa1';

	if (_postHasStoppedVideo(post)) {
		let playButton = post.querySelector(VIDEO_PLAY_SELECTOR);
		if (playButton) {
			playButton.click();
		}
	}
}

addLoadCallback(start);
