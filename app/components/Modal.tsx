import { useEffect, useRef } from "react";
import { ImageItem } from "@/app/types/image";
import Image from "next/image";
import { X } from "lucide-react";

interface ModalProps {
  image: ImageItem | null;
  onClose: () => void;
}

export const Modal = ({ image, onClose }: ModalProps) => {
  // modalRef는 모달 컨테이너 div 요소에 대한 참조를 저장하는 ref입니다
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 외부 클릭을 감지하는 useEffect 훅입니다
  useEffect(() => {
    // 클릭 이벤트 핸들러 함수
    const handleOutsideClick = (event: MouseEvent) => {
      // modalRef.current가 존재하고(모달이 마운트된 상태)
      // 클릭된 요소(event.target)가 모달 내부에 없는 경우
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        // 모달을 닫습니다
        onClose();
      }
    };

    // 마운트 시 document에 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleOutsideClick);

    // 언마운트 시 이벤트 리스너 제거를 위한 클린업 함수
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]); // onClose 함수가 변경될 때마다 useEffect 재실행

  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="bg-card bg-slate-100 rounded-lg max-w-5xl w-full overflow-hidden shadow-xl"
      >
        <div className="relative h-[600px]">
          <Image
            src={image.imageUrl}
            alt={image.title}
            fill
            className="object-contain p-6"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>
        <div className="pt-4 px-6 pb-6">
          <h2 className="text-2xl font-bold mb-4 text-card-foreground">
            {image.title}
          </h2>
          <p className="text-muted-foreground">{image.description}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary-foreground bg-primary/50 rounded-full p-2 hover:bg-primary/75 transition-colors duration-200"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
