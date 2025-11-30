// AuthPage.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectFlip } from 'swiper/modules';
import Login from "../components/Login";
import RegisterForm from "../components/RegisterForm";
import { useRef } from "react";

export default function LoginPage() {
    const swiperRef = useRef<any>(null);
    return (
        <div
            className="w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center"  // Añadido bg-cover y min-h-screen
            style={{
                backgroundImage:
                    "url('https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/03/Fondo-escultores-invitados.jpg')",
            }}
        >
            <div className="w-full flex justify-center p-7">
                <Swiper
                    effect={'flip'}
                    grabCursor={true}
                    loop={true}
                    modules={[EffectFlip]}
                    className="w-full max-w-md"
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                >
                    <SwiperSlide className="flex items-center justify-center">
                        <Login onSwitchToRegister={() => swiperRef.current?.slideTo(1)} />
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center">
                        <RegisterForm onSwitchToLogin={() => swiperRef.current?.slideTo(0)} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}
