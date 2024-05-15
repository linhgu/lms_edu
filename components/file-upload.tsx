'use client';

import toast from 'react-hot-toast';

import { UploadDropzone } from '@/lib/uploadthing';
import { ourFileRouter } from '@/app/api/uploadthing/core';

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  value?: string;
}

export const FileUpload = ({ onChange, endpoint, value }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
        console.log(error);
      }}
      onBeforeUploadBegin={(files) => {
        // Preprocess files before uploading (e.g. rename them)
        return files.map((f) => new File([f], f.name, { type: f.type }));
      }}
    />
  );
};
