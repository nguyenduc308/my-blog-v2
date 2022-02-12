import EditorJs from 'react-editor-js';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import Table from '@editorjs/table';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Code from '@editorjs/code';
// @ts-ignore
import LinkTool from '@editorjs/link';
// @ts-ignore
import Image from '@editorjs/image';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import Delimiter from '@editorjs/delimiter';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
import axios from '@/helpers/axios';
import { API, BlockAPI, OutputData } from '@editorjs/editorjs';

interface CustomEditorProps {
  data: OutputData;
  onChange(api: API, block?: OutputData | BlockAPI): void;
}

const CustomEditor: React.FC<CustomEditorProps> = ({ data, onChange }) => {
  const TOOLS = {
    embed: Embed,
    table: Table,
    list: List,
    code: Code,
    linkTool: LinkTool,
    image: {
      class: Image,
      config: {
        uploader: {
          uploadByFile(file: File) {
            const formData = new FormData();
            formData.append('file', file);
            return axios.post('/upload/images', formData);
          },
        },
      },
    },
    header: Header,
    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: "Quote's author",
      },
      shortcut: 'CMD+SHIFT+Q',
    },
    delimiter: Delimiter,
    inlineCode: InlineCode,
  };

  return (
    <EditorJs
      tools={TOOLS}
      placeholder="Nội dung bài viết"
      data={data}
      onChange={onChange}
    />
  );
};

export default CustomEditor;
