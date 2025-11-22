import CommentFileInput from './components/CommentFileInput';
import FileInput from './components/FileInput';
import FileInputXLS from './components/FileInputXLS';
import LinkFileInput from './components/LinkFileInput';
import { fileInputEnum } from './enum';
import { fileInputProps } from './types';

const FileUploadVariants = (variant: string, props: fileInputProps) => {
  switch (variant) {
    case fileInputEnum.FileInput:
      return <FileInput {...props} />;
    case fileInputEnum.LinkFileInput:
      return <LinkFileInput {...props} />;
    case fileInputEnum.LinkFileInputBlack:
      return <LinkFileInput {...props} isBlack />;
    case fileInputEnum.FileInputXLS:
      return <FileInputXLS {...props} />;
    case fileInputEnum.CommentFileInput:
      return <CommentFileInput {...props} />;
    default:
      return null;
  }
};

export default FileUploadVariants;
