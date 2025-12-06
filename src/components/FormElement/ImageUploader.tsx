import React, { useState } from "react";
import { useAxiosPost } from "hooks/useAxios";

export type ImageUploadProps = {
    endpoint?: string;            // API Endpoint
    fieldName?: string;           // FormData field
    previewSize?: number;         // width/height of image preview
    autoUpload?: boolean;         // should upload immediately?
    onUpload: (fileUrl: string) => void; // callback with file URL
    children?: React.ReactNode;   // custom UI for upload button
};

const ImageUpload: React.FC<ImageUploadProps> = ({
    endpoint = "/upload/image",
    fieldName = "image",
    previewSize = 120,
    autoUpload = false,
    onUpload,
    children,
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [uploadImage, { isLoading }] = useAxiosPost();

    const handleSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] ?? null;
        setFile(selected);

        if (selected) {
            setPreview(URL.createObjectURL(selected));

            // Auto upload
            if (autoUpload) {
                await uploadFile(selected);
            }
        }
    };

    const uploadFile = async (selectedFile: File) => {
        const form = new FormData();
        form.append(fieldName, selectedFile);

        const res = await uploadImage(endpoint, form);

        if (res?.data?.success) {
            onUpload(process.env.VITE_API_BASE_URL + res.data.fileUrl);
        } else {
            alert(res?.data?.message || "Upload failed");
        }
    };

    const handleManualUpload = async () => {
        if (!file) return alert("Please select an image first!");
        await uploadFile(file);
    };

    return (
        <div className="space-y-3">
            {preview && (
                <img
                    src={preview}
                    width={previewSize}
                    height={previewSize}
                    className="rounded-full object-cover border shadow-sm"
                    alt="preview"
                />
            )}

            <input
                type="file"
                accept="image/*"
                className="block w-full cursor-pointer"
                onChange={handleSelect}
            />

            {!autoUpload && (
                <button
                    type="button"
                    className="px-4 py-2 mt-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400"
                    disabled={isLoading}
                    onClick={handleManualUpload}
                >
                    {isLoading ? "Uploading..." : "Upload Image"}
                </button>
            )}

            {children}
        </div>
    );
};

export default ImageUpload;
