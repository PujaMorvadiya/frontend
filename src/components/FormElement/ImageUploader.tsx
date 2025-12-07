import React, { useState } from "react";

export type ImageUploadProps = {
    previewSize?: number;
    onUpload: (file: File | null) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
    previewSize = 120,
    onUpload,
}) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const inputId = "image_upload_input";

    // ---------------------------
    // Handle File Selection
    // ---------------------------
    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] ?? null;
        if (!selected) return;

        setPreview(URL.createObjectURL(selected));
        onUpload(selected);
    };

    // ---------------------------
    // Drag & Drop
    // ---------------------------
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setPreview(URL.createObjectURL(file));
            onUpload(file);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(e.type === "dragover");
    };

    // ---------------------------
    // Trigger file input
    // ---------------------------
    const triggerInput = () => {
        const input = document.getElementById(inputId) as HTMLInputElement;
        input?.click();
    };

    // ---------------------------
    // Remove image
    // ---------------------------
    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the file input
        setPreview(null);
        onUpload(null);

        // Reset input value so user can re-select the same file
        const input = document.getElementById(inputId) as HTMLInputElement;
        if (input) input.value = "";
    };

    return (
        <div className="flex justify-center mb-8">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800">Upload your photo</h2>

                <div
                    onDrop={handleDrop}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onClick={triggerInput}
                    className={`mt-5 relative flex flex-col items-center justify-center
              border-2 border-dashed rounded-xl transition h-40 cursor-pointer
              ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50"}
          `}
                >
                    {preview ? (
                        <div className="relative">
                            <img
                                src={preview}
                                alt="preview"
                                style={{ width: previewSize, height: previewSize }}
                                className="object-cover rounded-lg shadow-sm"
                            />
                            {/* Cancel button */}
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute top-1 right-1 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                            >
                                &times;
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-500 text-sm">Drag & drop image</p>
                            <p className="text-gray-400 text-xs mt-1">or click to upload</p>
                        </>
                    )}

                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id={inputId}
                        onChange={handleSelect}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
