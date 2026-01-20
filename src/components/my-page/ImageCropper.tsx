import Cropper, { type Area } from "react-easy-crop";
import { useCallback, useState } from "react";
import getCroppedImg from "./CropImage"; // 아래에서 따로 구현

export const ImageCropper = ({
    image,
    onCompleteCrop,
    onCancel
}: {
    image: string;
    onCompleteCrop: (croppedImage: string) => void;
    onCancel: () => void;
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
        setCroppedAreaPixels(areaPixels);
    }, []);
    const handleCropDone = async () => {
        if (croppedAreaPixels) {
            const croppedImg = await getCroppedImg(image, croppedAreaPixels);
            onCompleteCrop(croppedImg);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
            <div className="relative w-[300px] h-[300px] bg-black">
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />
            </div>
            <div className="mt-4 ml-4 flex gap-5">
                <button
                    onClick={handleCropDone}
                    className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                    자르기 완료
                </button>
                <button onClick={onCancel} className="text-white">
                    취소
                </button>
            </div>
        </div>
    );
};
