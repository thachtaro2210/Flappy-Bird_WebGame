import { useEffect, useRef, useState } from "react";

export const useAssets = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const birdSprites = useRef<HTMLImageElement[]>([]);
  const backgroundImage = useRef<HTMLImageElement | null>(null);
  const numberSprites = useRef<HTMLImageElement[]>([]);
  const gameOverImage = useRef<HTMLImageElement | null>(null);
  const messageImage = useRef<HTMLImageElement | null>(null);
  const pipeImage = useRef<HTMLImageElement | null>(null);
  const shieldImage = useRef<HTMLImageElement | null>(null);
  const boostImage = useRef<HTMLImageElement | null>(null);
  const pointSound = useRef<HTMLAudioElement | null>(null);
  const hitSound = useRef<HTMLAudioElement | null>(null);
  const wingSound = useRef<HTMLAudioElement | null>(null);
  const itemSound = useRef<HTMLAudioElement | null>(null);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const birdUrls = [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yellowbird-downflap-ZExrg9YxRxwFfLXDu6JijpJUQgByX6.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yellowbird-midflap-8mBrx070GYsw2As4Ue9BfQJ5XNMUg3.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yellowbird-upflap-hMo7jE66Ar0TzdbAMTzTMWaEGpTNx2.png",
    ];
    const numberUrls = [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0-n6uJmiEzXXFf0NDHejRxdna8JdqZ9P.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-2s71zdNWUSfnqIUbOABB2QJzzbG7fR.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-QNpaMYRZvP9MgObyqVbxo7wu0MyjYE.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-6yXb5a7IxZyl8kdXXBatpxq48enb2d.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-9beOrHBy4QSBLifUwqaLXqbNWfK4Hr.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-pgAY4wiTYa2Ppho9w3YXtLx3UHryJI.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-5v6snji9HWY7UpBuqDkKDtck2zED4B.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-zTxqP8uIOG4OYFtl8x6Dby0mqKfNYo.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-gkhiN6iBVr2DY7SqrTZIEP7Q3doyo9.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-PxwOSLzHQAiMeneqctp2q5mzWAv0Kv.png",
    ];
    const backgroundUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-day-rvpnF7CJRMdBNqqBc8Zfzz3QpIfkBG.png";
    const gameOverUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gameover-NwA13AFRtIFat9QoA12T3lpjK76Qza.png";
    const messageUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/message-g1ru4NKF3KrKoFmiVpzR8fwdeLhwNa.png";
    const pipeUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pipe-green-zrz2zTtoVXaLn6xDqgrNVF9luzjW1B.png";
    const shieldUrl =
      "https://icons.iconarchive.com/icons/pictogrammers/material-light/128/shield-icon.png";
    const boostUrl =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIyMS41IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMTAuOSAzMC41Yy0uMi0uNS0uNC0uOS0uNi0xLjQiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtZGFzaGFycmF5PSIyLjk5IDIuOTkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTkuNSAyNi4zQTE0LjYyIDE0LjYyIDAgMSAxIDM4IDI4IiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMzcuNiAyOS40Yy0uMi41LS40LjktLjYgMS40TTI1LjkgMjRMMjQgMTIuMkwyMi4yIDI0YTEuOCAxLjggMCAwIDAgLjkgMS42YTIuMTIgMi4xMiAwIDAgMCAxLjkgMGExLjg5IDEuODkgMCAwIDAgLjktMS42bS03LjcgOS45aC42di42aC0uNnptMy43IDBoLjZ2LjZoLS42em0zLjYgMGguNnYuNmgtLjZ6bTMuNyAwaC42di42aC0uNnoiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==";

    const loadImage = (url: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });

    const loadAudio = (url: string) =>
      new Promise<HTMLAudioElement>((resolve, reject) => {
        const audio = new Audio();
        audio.oncanplaythrough = () => resolve(audio);
        audio.onerror = reject;
        audio.src = url;
      });

    Promise.all([
      ...birdUrls.map(loadImage),
      ...numberUrls.map(loadImage),
      loadImage(backgroundUrl),
      loadImage(gameOverUrl),
      loadImage(messageUrl),
      loadImage(pipeUrl),
      loadImage(shieldUrl),
      loadImage(boostUrl),
      loadAudio(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/point-SdTORahWMlxujnLCoDbujDLHI6KFeC.wav"
      ),
      loadAudio(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hit-YVMFYQJEgZASG6O3xPWiyiqPtOLygb.wav"
      ),
      loadAudio(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wing-oOSsspXpVMDc0enrWj4WWLaHVqs6Hk.wav"
      ),
    ])
      .then((loadedAssets) => {
        birdSprites.current = loadedAssets.slice(0, 3) as HTMLImageElement[];
        numberSprites.current = loadedAssets.slice(3, 13) as HTMLImageElement[];
        backgroundImage.current = loadedAssets[13] as HTMLImageElement;
        gameOverImage.current = loadedAssets[14] as HTMLImageElement;
        messageImage.current = loadedAssets[15] as HTMLImageElement;
        pipeImage.current = loadedAssets[16] as HTMLImageElement;
        shieldImage.current = loadedAssets[17] as HTMLImageElement;
        boostImage.current = loadedAssets[18] as HTMLImageElement;
        pointSound.current = loadedAssets[19] as HTMLAudioElement;
        hitSound.current = loadedAssets[20] as HTMLAudioElement;
        wingSound.current = loadedAssets[21] as HTMLAudioElement;
        setAssetsLoaded(true);
      })
      .catch(() => {
        setAssetsLoaded(true);
      });
  }, []);

  return {
    canvasRef,
    birdSprites,
    backgroundImage,
    numberSprites,
    gameOverImage,
    messageImage,
    pipeImage,
    shieldImage,
    boostImage,
    pointSound,
    hitSound,
    wingSound,
    itemSound,
    assetsLoaded,
  };
};