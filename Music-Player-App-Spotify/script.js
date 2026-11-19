const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const trackTitle = document.querySelector(".track-title");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [
	{
		album: "Nevermind",
		track: "Smells Like Teen Spirit",
		emblem: "Nirvana Nevermind Smells Like Teen Spirit",
		"bg-color": ["#079ade", "#00467e"],
		"accent-color": "#40f2fe",
		url: "https://wallpapercave.com/wp/wp2611259.jpg",
		spotify:
		"https://open.spotify.com/embed/track/4CeeEOM32jQcH3eN9Q2dGj?utm_source=generator"
	},
    {
		album: "Nevermind",
		track: "Come As You Are",
		emblem: "Nirvana Nevermind Come As You Are",
		"bg-color": ["#079ade", "#00467e"],
		"accent-color": "#40f2fe",
		url: "https://i.pinimg.com/originals/82/ae/80/82ae80d920d9c4669b594f6b5f578a3e.jpg",
		spotify:
		"https://open.spotify.com/embed/track/2RsAajgo0g7bMCHxwH3Sk0?utm_source=generator"
	},
	{
		album: "Nevermind",
		track: "Lithium",
		emblem: "Nirvana Nevermind Lithium",
		"bg-color": ["#079ade", "#00467e"],
		"accent-color": "#40f2fe",
		url: "https://wallpapercave.com/wp/wp2611259.jpg",
		spotify:
		"https://open.spotify.com/embed/track/5vHLwhxxlGzmClMcxRRFPr?utm_source=generator"
	},
	{
		album: "Nevermind",
		track: "Something In The Way",
		emblem: "Nirvana Nevermind Something In The Way",
		"bg-color": ["#079ade", "#00467e"],
		"accent-color": "#40f2fe",
		url: "https://i.pinimg.com/originals/82/ae/80/82ae80d920d9c4669b594f6b5f578a3e.jpg",
		spotify:
		"https://open.spotify.com/embed/track/4gHnSNHs8RyVukKoWdS99f?utm_source=generator"
	},
];

scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));
heroDiv.addEventListener("animationend", () => {
	heroDiv.classList.remove("album-transition");
	document.addEventListener("keydown", handleKeyScroll);
	scrollLeft.disabled = false;
	scrollRight.disabled = false;
	scrollLeft.classList.remove("key-press-hover-left");
	scrollRight.classList.remove("key-press-hover-right");

	for (const text of texts) text.classList.add("show-texts");
});

const handleClickScroll = (val) => {
	if (index + val >= 0 && index + val < albums.length) {
		updateDisplay((index += val));
	}
};

const handleKeyScroll = (e) => {
	if (e.key == "ArrowLeft") {
		scrollLeft.classList.add("key-press-hover-left");
		handleClickScroll(-1);
	}
	if (e.key == "ArrowRight") {
		scrollRight.classList.add("key-press-hover-right");
		handleClickScroll(1);
	}
};
let index = 0;
const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Arrastar para o lado no celular troca de música
let toqueInicioX = null;
sectionContainer.addEventListener("touchstart", (e) => {
	toqueInicioX = e.touches[0].clientX;
}, { passive: true });
sectionContainer.addEventListener("touchend", (e) => {
	if (toqueInicioX === null || scrollLeft.disabled) return;
	const distancia = e.changedTouches[0].clientX - toqueInicioX;
	if (Math.abs(distancia) > 50) handleClickScroll(distancia < 0 ? 1 : -1);
	toqueInicioX = null;
});

const updateDisplay = (index) => {
	let DELIMITER = "";

	const album = albums[index];

	for (const text of texts) text.classList.remove("show-texts");
	emblemDiv.innerHTML = "";
	scrollLeft.disabled = true;
	scrollRight.disabled = true;
	document.removeEventListener("keydown", handleKeyScroll);

	sectionContainer.id = `hero-${album.album.toLowerCase().replaceAll(" ", "-")}`;
	bodyContainer.style.background = `linear-gradient(120deg, ${album["bg-color"][0]} , ${album["bg-color"][1]} )`;
	heroDiv.style.backgroundImage = `url(${album.url})`;
	albumTitleSpan.textContent = album.album;
	spotifyWidget.src = album.spotify;

	const number = index + 1;
	albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
	albumNum.style.color = album["accent-color"];

	// Esconde as setas nas pontas da lista (antes o "3" estava fixo no código)
	scrollLeft.classList.toggle("hide-arrow", index === 0);
	scrollRight.classList.toggle("hide-arrow", index === albums.length - 1);
	trackTitle.textContent = album.track;
	spotifyWidget.title = `Player do Spotify: ${album.track}`;

	createEmblem(album.emblem, DELIMITER[0] || undefined).forEach((node) =>
		emblemDiv.append(node)
	);

	heroDiv.classList.add("album-transition");

	// Se a animação estiver desligada (reduzir movimento), libera os controles na hora
	if (reduzirMovimento) heroDiv.dispatchEvent(new Event("animationend"));
};

const createEmblem = (string, delimiter = "•") => {
	const spans = [];

	string = string.trim().replaceAll(" ", delimiter) + delimiter;
	const numChars = string.length;
	const degVal = 90 / (numChars / 4);

	string.split("").forEach((char, idx) => {
		const span = document.createElement("span");
		span.textContent = char;
		span.style.transform = `rotate(${180 - degVal * idx}deg)`;
		if (char === delimiter) span.style.color = albums[index]["accent-color"];
		spans.push(span);
	});

	return spans;
};

updateDisplay(index);
