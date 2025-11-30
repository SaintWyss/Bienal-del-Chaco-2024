import React, { useEffect, useRef } from "react";

const BackgroundVideo: React.FC = () => {
    // Referencia al elemento video para manipularlo directamente
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Se ejecuta una vez que el componente se monta
        if (videoRef.current) {
            // Adelanta el video al segundo 2 y comienza a reproducir
            videoRef.current.currentTime = 2; // Establece el tiempo inicial en 2 segundos
            videoRef.current
                .play() // Intenta reproducir el video
                .catch((error) => {
                    // En caso de error al intentar reproducir, lo muestra en consola
                    console.error("Error al reproducir el video:", error);
                });
        }
    }, []); // El array vacío asegura que esto solo se ejecute al montar el componente

    return (
        // Contenedor absoluto que cubre toda la pantalla y coloca el video en el fondo
        <div className="absolute inset-0 overflow-hidden -z-10">
            <video
                ref={videoRef} // Se refiere al video para controlarlo
                src="https://videos.pexels.com/video-files/1943483/1943483-uhd_2560_1440_25fps.mp4"
                muted // Mutea el video
                playsInline // Asegura que el video se reproduzca en línea en dispositivos móviles
                className="w-full h-full object-cover filter invert" // Clases Tailwind para cubrir toda la pantalla y aplicar filtros
            />
        </div>
    );
};

export default BackgroundVideo;