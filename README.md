# Music Player — tema Nirvana / Nevermind

Player de música com visual inspirado no álbum *Nevermind*, do Nirvana, e o player oficial do Spotify incorporado.

## Funcionalidades

- 4 faixas do álbum, cada uma com arte e player do Spotify
- Emblema giratório com o nome da faixa
- Navegação por botões, pelas setas ← → do teclado ou arrastando para o lado no celular
- Setas somem automaticamente no começo e no fim da lista
- Animação de transição entre faixas (desligada para quem ativou "reduzir movimento")

## Adicionando músicas

Edite o array `albums` em `Music-Player-App-Spotify/script.js`:

```js
{
  album: "Nevermind",
  track: "Nome da música",
  emblem: "Texto que gira no emblema",
  "bg-color": ["#079ade", "#00467e"],
  "accent-color": "#40f2fe",
  url: "link-da-imagem.jpg",
  spotify: "https://open.spotify.com/embed/track/ID_DA_FAIXA"
}
```

## Rodando

Abra `Music-Player-App-Spotify/index.html` no navegador.
